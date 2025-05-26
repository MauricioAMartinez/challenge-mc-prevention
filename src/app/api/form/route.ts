

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; 


export async function POST(request: NextRequest) {
  
  const contentType = request.headers.get('content-type');
  let formData: any;
  let referrer: string | null = null;
  let captchaToken: string | null = null;

  if (contentType?.includes('application/json')) {

    const body = await request.json();
    formData = body;
    referrer = body.referrer || null;
    captchaToken = body.token || null; 
  } else {

    const params = await request.formData();
    formData = Object.fromEntries(params.entries()); 
    referrer = request.nextUrl.searchParams.get('referrer') || null; 
    captchaToken = request.nextUrl.searchParams.get('token') || null;

  }

  if (!formData.fullName || formData.fullName.length < 2) {
    return NextResponse.json({ message: 'Full Name is required and must be at least 2 characters' }, { status: 400 });
  }
  if (!formData.address) {
    return NextResponse.json({ message: 'Address is required' }, { status: 400 });
  }
  if (!formData.phoneNumber || !/^\d{7,}$/.test(formData.phoneNumber)) {
    return NextResponse.json({ message: 'Phone Number is required and must be at least 7 digits' }, { status: 400 });
  }
  if (!formData.country) {
    return NextResponse.json({ message: 'Country is required' }, { status: 400 });
  }
  if (!formData.gender) {
    return NextResponse.json({ message: 'Gender is required' }, { status: 400 });
  }
  if (formData.country === 'br' && (!formData.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf))) {
    return NextResponse.json({ message: 'CPF is required and must be in 000.000.000-00 format for Brazil' }, { status: 400 });
  }


  if (!captchaToken || captchaToken === 'initial_token_from_query_string_or_empty') { 
    console.warn("Captcha token missing or invalid (simulated).");
  
  }


  try {

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula retraso de guardado

    console.log('Datos actualizados en meli-users (simulado):', formData);

  } catch (error) {
    console.error('Error al actualizar datos en meli-users:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al actualizar datos', error: (error as Error).message },
      { status: 500 }
    );
  }

  const confirmationPageUrl = `/confirmation?referrer=${encodeURIComponent(referrer || '/')}&token=${encodeURIComponent(captchaToken || 'no_token')}`;


  if (contentType?.includes('application/json')) {
    return NextResponse.json({ message: 'Formulario procesado con éxito', redirectUrl: confirmationPageUrl }, { status: 200 });
  } else {
    return NextResponse.redirect(new URL(confirmationPageUrl, request.url), 302);
  }
}
