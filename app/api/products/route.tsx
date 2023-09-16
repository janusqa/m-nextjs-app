import { NextRequest, NextResponse } from 'next/server';

import { ProductSchema } from './schema';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
    // fetch data

    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const product = ProductSchema.safeParse(body);

    if (!product.success)
        return NextResponse.json(
            { error: product.error.errors },
            { status: 400 }
        );

    const newProduct = await prisma.product.create({ data: product.data });

    if (product.success) return NextResponse.json(newProduct, { status: 201 });
}
