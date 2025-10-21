import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/lib/models';

// PUT: Editar producto
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// DELETE: Eliminar producto
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
