interface Props {
  searchParams: {
    referrer?: string;
    token?: string;
  };
}

export default function ConfirmationPage({ searchParams }: Props) {
  const referrer = searchParams.referrer || '/';
  const token = searchParams.token || '';

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ color: 'black' }}>✅ Datos actualizados con éxito</h1>
      <p style={{ color: 'grey' }}>Gracias por actualizar tu información. Tu pedido continuará normalmente.</p>

      <hr style={{ margin: '1rem 0' }} />

      {/* <h2>Información técnica (debug)</h2>
      <p><strong>Referrer:</strong> {referrer}</p>
      <p><strong>Captcha token:</strong> {token}</p> */}

      <a href={referrer} style={{ display: 'inline-block', marginTop: '1rem', color: 'blue', textDecoration: 'none' }}>
        ← Volver al paso anterior
      </a>
    </main>
  );
}
