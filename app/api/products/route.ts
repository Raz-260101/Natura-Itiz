import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Product } from '@/lib/models';

// GET: Obtener todos los productos
export async function GET() {
  await dbConnect();
  const products = await Product.find({}).sort({ _id: -1 });
  return NextResponse.json(products);
}

// POST: Crear un nuevo producto
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const {
    name,
    description,
    price,
    originalPrice,
    category,
    imageUrl,
    isOrganic
  } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const product = await Product.create({
    name,
    description,
    price,
    originalPrice,
    category,
    imageUrl,
    isOrganic: !!isOrganic
  });

  return NextResponse.json(product, { status: 201 });
}
