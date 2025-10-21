import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { User } from '@/lib/models';

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { email, updates } = await req.json();

  if (!email || !updates) {
    return NextResponse.json({ error: 'Datos insuficientes' }, { status: 400 });
  }

  const user = await User.findOneAndUpdate({ email }, updates, { new: true });
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    type: user.type,
    membership: user.membership || null,
  });
}
