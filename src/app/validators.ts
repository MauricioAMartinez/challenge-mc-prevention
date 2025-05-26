// validators.ts
import { translations } from './i18n';

export interface FormData {
  fullName: string;
  address: string;
  country: string;
  phoneNumber: string;
  cpf?: string;
  captchaToken: string;
  referrer?: string;
}

interface ValidationResult {
  success: boolean;
  message?: string;
}

export function validateFormData(
  data: FormData,
  locale: 'es' | 'pt' | 'en' = 'es'
): ValidationResult {
  const fallbackLocale: 'es' = 'es';
  const t = translations[locale] ? translations[locale].errors : translations[fallbackLocale].errors;

  if (!data.fullName || data.fullName.trim().length < 2) {
    return { success: false, message: t.fullName };
  }

  if (!data.address || data.address.trim() === '') {
    return { success: false, message: t.address };
  }

  if (!data.phoneNumber || !/^\d{7,}$/.test(data.phoneNumber)) {
    return { success: false, message: t.phoneNumber };
  }

  if (!data.country || data.country.trim() === '') {
    return { success: false, message: t.country };
  }

  if (data.country === 'br') {
    if (!data.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf)) {
      return { success: false, message: t.cpf };
    }
  }

  if (!data.captchaToken || data.captchaToken === 'initial_token_from_query_string_or_empty') {
    return { success: false, message: t.captcha };
  }

  return { success: true };
}
