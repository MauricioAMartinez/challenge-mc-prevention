import { useEffect, useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { translations } from '@/app/i18n';

declare global {
  interface Window {
    grecaptcha: {
      execute(siteKey: string, options: { action: string }): Promise<string>;
      ready(cb: () => void): void;
    };
  }
}

interface CaptchaLogicProps<T extends Record<string, any>> {
  initialToken: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  locale: 'es' | 'pt' | 'en';
}

export function useCaptchaLogic<T extends Record<string, any>>({
 initialToken,
  register,
  errors,
  locale
}: CaptchaLogicProps<T>) {
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [captchaError, setCaptchaError] = useState('');
  const t = translations[locale];

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === 'undefined') return;

    const scriptId = 'recaptcha-v3-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.id = scriptId;

      script.onload = () => {
        setCaptchaReady(true);
        setCaptchaLoading(false);
        console.log('✅ reCAPTCHA v3 cargado');
      };

      script.onerror = () => {
        setCaptchaLoading(false);
        setCaptchaError('No se pudo cargar el captcha.');
      };

      document.body.appendChild(script);
    } else {
      setCaptchaReady(true);
      setCaptchaLoading(false);
    }
  }, []);

  const captchaRegisterProps = register('captchaToken' as keyof T, {
    validate: (value) =>
      value !== initialToken ||  t.errors.captcha
  });

  const executeCaptcha = async (): Promise<string | null> => {
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      console.log('Ejecutando reCAPTCHA v3...', siteKey);
      if (!captchaReady || !window.grecaptcha || !siteKey) return null;

      const token = await window.grecaptcha.execute(siteKey, { action: 'submit' });
      return token;
    } catch (e) {
      setCaptchaError('No se pudo ejecutar el captcha.');
      return null;
    }
  };

  const captchaErrorMessage = errors.captchaToken?.message || captchaError;

  return {
    captchaLoading,
    captchaReady,
    captchaRegisterProps,
    captchaErrorMessage,
    setCaptchaError,
    executeCaptcha
  };
}
