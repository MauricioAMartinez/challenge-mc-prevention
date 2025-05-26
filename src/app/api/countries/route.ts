
import { NextResponse } from 'next/server';


const mockCountries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "br", label: "Brazil" },
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
];

export async function GET() {
  try {

    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(mockCountries, { status: 200 });
  } catch (error) {
    console.error('Error en /api/countries:', error);
    return NextResponse.json(
      { message: 'Error al obtener países', error: (error as Error).message },
      { status: 500 }
    );
  }
}
