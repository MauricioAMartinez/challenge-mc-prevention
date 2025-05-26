// src/app/api/submit-step/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateFormData } from "@/app/validators";

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("⚠️ No RECAPTCHA_SECRET_KEY configured.");
    return true; 
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token
      })
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // reCAPTCHA v3 usa score
  } catch (e) {
    console.error("❌ Error verifying captcha:", e);
    return false;
  }
}

async function saveUserData(data: any) {
  await new Promise((res) => setTimeout(res, 500));
  console.log("✅ Datos simulados guardados:", data);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  let formData: any = {};
  let referrer = "/";
  let token = "";

  const isJson = contentType?.includes("application/json");

  if (isJson) {
    const body = await req.json();
    formData = body;
    referrer = body.referrer || "/";
    token = body.captchaToken || "";
  } else {
    const form = await req.formData();
    formData = Object.fromEntries(form.entries());
    referrer = formData.referrer || "/";
    token = formData.captchaToken || "";
  }

  const captchaConsent = formData.captchaConsent;

  const cookieLocale = req.cookies.get('next-locale')?.value as 'es' | 'pt' | 'en' || 'es';

  const validation = validateFormData({ ...formData, captchaToken: token, referrer }, cookieLocale);

  if (!validation.success) {
    const msg = validation.message || "Formulario inválido";

    if (isJson) {
      return NextResponse.json({ message: msg }, { status: 400 });
    }

    const html = `
      <!DOCTYPE html>
      <html lang="${cookieLocale}">
        <head>
          <meta charset="UTF-8" />
          <title>Error</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto; }
            .error { color: red; font-size: 1.1rem; margin-bottom: 1.5rem; }
            a.back { text-decoration: none; font-weight: bold; color: #0070f3; }
          </style>
        </head>
        <body>
          <p class="error">❌ ${msg}</p>
          <a class="back" href="${referrer}">← Volver al formulario</a>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Captcha
  const captchaValid = token !== ""
    ? await verifyRecaptchaToken(token)
    : captchaConsent === "on";

  if (!captchaValid) {
    const msg = "Captcha inválido.";
    if (isJson) {
      return NextResponse.json({ message: msg }, { status: 403 });
    }
    return new Response(`<p>${msg}</p>`, { status: 403 });
  }

  try {
    await saveUserData(formData);
  } catch (err) {
    return NextResponse.json({ message: "Error saving user data." }, { status: 500 });
  }

  const redirectUrl = `/confirmation?referrer=${encodeURIComponent(referrer)}&token=${encodeURIComponent(token || "no_token")}`;

  return isJson
    ? NextResponse.json({ redirectUrl }, { status: 200 })
    : NextResponse.redirect(new URL(redirectUrl, req.url), 302);
}

