
import { NextResponse } from 'next/server';

const mockUserData = {
  fullName: "Juan Pérez",
  address: "Steet 09281",
  country: "mx",
  phoneNumber: "990011",
  gender: "male",
  // cpf: "123.456.789-00", //
};


export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

 
    return NextResponse.json(mockUserData, { status: 200 });
  } catch (error) {
    console.error('Error en /api/user-data:', error);
    return NextResponse.json(
      { message: 'Error al obtener datos del usuario', error: (error as Error).message },
      { status: 500 }
    );
  }
}
