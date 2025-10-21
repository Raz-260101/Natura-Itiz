import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { User } from '@/lib/models';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  // Depuración: log de entrada
  console.log('Login intento:', { email, password });

  // Buscar usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    console.log('Usuario no encontrado');
    return NextResponse.json({ error: 'Correo no registrado' }, { status: 401 });
  }

  // Validar contraseña
  if (user.password !== password) {
    console.log('Contraseña incorrecta');
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  // Depuración: usuario encontrado
  console.log('Usuario encontrado:', user);

  return NextResponse.json({
    name: user.name,
    email: user.email,
    type: user.type,
  });
}
