import ContactForm from '@/app/components/contactForm/ContactForm';
import { fetchUserData } from '@/app/services/fetchUser';
import { fetchCountries } from '@/app/services/fetchCountries';
import styles from './previous-step.module.css';
import { cookies } from 'next/headers';
import { translations } from '@/app/i18n';


export default async function Page({ searchParams }: { searchParams: { referrer?: string; token?: string } }) {
  const referrer = searchParams.referrer || '/';
  const token = searchParams.token || 'initial_token';

  const userData = await fetchUserData(token);
  const countries = await fetchCountries();

  const cookieStore = await cookies();
  const locale = (cookieStore.get('next-locale')?.value ?? 'pt') as 'es' | 'pt' | 'en';
  const t = translations[locale];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t.title}</h1>
        <h3 className={styles.subtitle}>{t.subtitle}</h3>
      </div>

      <noscript>
        <div className={styles.noJsWarning}>{t.noJs}</div>
      </noscript>

      <ContactForm
        referrer={referrer}
        token={token}
        initialData={userData}
        countryOptions={countries}
        locale={locale}
      />
    </main>
  );
}
