
export default async function Page() {

  const externalUrl = process.env.NEXT_PUBLIC_EXTERNAL_URL || 'http://localhost:3001/external';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }} >Welcome to the Previous Step Page</h1>
        <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#5a5a5a' }}>This is a placeholder for the previous step content.</p>
        <a style={{ marginTop: '1rem', color: '#0070f3' }} href={externalUrl}>Go to External Page</a>
      </div>
    </main>
  );
}
