'use client';

import { useForm } from 'react-hook-form';
import { useCaptchaLogic } from '@/app/hooks/useCaptchaLogic';
import { useFormPersistence } from '@/app/hooks/useFormPersistence';
import Input from '@/app/ui/Input/Input';
import Select from '@/app/ui/select/Select';
import Button from '@/app/ui/Button/Button';
import CaptchaComponent from '@/app/ui/captcha/CaptchaComponent';
import styles from './contactForm.module.css';
import { translations } from '@/app/i18n';
import { useEffect } from 'react';

interface Props {
  referrer: string;
  token: string;
  initialData: Partial<FormData>;
  countryOptions: { value: string; label: string }[];
  locale?: 'es' | 'pt' | 'en';
}

interface FormData {
  fullName: string;
  address: string;
  country: string;
  phoneNumber: string;
  gender: string;
  cpf?: string;
  captchaToken: string;
  captchaConsent?: string; 
}

export default function ContactForm({ referrer, token, initialData, countryOptions, locale = 'es' }: Props) {
  const t = translations[locale];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      address: '',
      country: '',
      phoneNumber: '',
      gender: '',
      cpf: '',
      captchaToken: token,
      ...initialData
    }
  });

  const country = watch('country');
  const { clearPersistedData } = useFormPersistence(watch, setValue, reset);

  const {
    captchaLoading,
    captchaReady,
    captchaRegisterProps,
    captchaErrorMessage,
    setCaptchaError,
    executeCaptcha
  } = useCaptchaLogic({ initialToken: token, register, errors , locale });

  const onSubmit = async (data: FormData) => {
    try {
      const captchaToken = await executeCaptcha();
      console.log('Captcha token:', captchaToken);
      if (!captchaToken) {
        setCaptchaError(t.errors.captcha);
        console.error('Captcha token is empty');
        return;
      }
      data.captchaToken = captchaToken;

      const res = await fetch('/api/submit-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, referrer })
      });

      if (res.ok) {
        clearPersistedData();
        window.location.href = `/confirmation?referrer=${encodeURIComponent(referrer)}&token=${encodeURIComponent(captchaToken)}`;
      } else {
        const error = await res.json();
        setCaptchaError(error.message || 'Error submitting');
      }
    } catch (e) {
      setCaptchaError('Error de red');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
      method="POST"
      action={`/api/submit-step?referrer=${encodeURIComponent(referrer)}&token=${encodeURIComponent(token)}`}
    >
      <Input
        label={t.fullName}
        id="fullName"
        name="fullName"
        type="text"
        placeholder={t.fullName}
        register={register('fullName', {
          required: t.errors.fullName,
          minLength: { value: 2, message: 'Must be at least 2 characters' }
        })}
        error={errors.fullName?.message}
      />
      <Input
        label={t.address}
        id="address"
        name="address"
        type="text"
        placeholder={t.address}
        register={register('address', {
          required: t.errors.address 
        })}
        error={errors.address?.message}
      />
      <Input
        label={t.phone}
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        placeholder={t.phone}
        register={register('phoneNumber', {
          required: t.errors.phoneNumber,
          pattern: {
            value: /^\d{7,}$/,
            message: 'Must be at least 7 digits'
          }
        })}
        error={errors.phoneNumber?.message}
      />
      <Select
        label={t.country}
        id="country"
        name="country"
        options={countryOptions}
        register={register('country', {
          required: t.errors.country
        })}
        error={errors.country?.message}
      />
      {country === 'br' && (
        <Input
          label={t.cpf}
          id="cpf"
          name="cpf"
          type="text"
          placeholder="000.000.000-00"
          register={register('cpf', {
            required: t.cpf,
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: 'Invalid CPF format'
            }
          })}
          error={errors.cpf?.message}
        />
      )}

      <CaptchaComponent
        isLoading={captchaLoading}
        isReady={captchaReady}
        {...captchaRegisterProps}
        messageCaptcha={t.youAreHuman}
        errorMessage={errors.captchaToken?.message}
      />

   

      <div className={styles.buttons}>
        <a href={referrer}><Button variant="secondary" type="button">{t.goBack}</Button></a>
        <Button variant="primary" type="submit">{t.next}</Button>
      </div>
    </form>
  );
}
