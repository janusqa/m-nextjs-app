import { NextRequest, NextResponse } from 'next/server';

import { ProductSchema } from './schema';

export function GET(request: NextRequest) {
    // fetch data
    return NextResponse.json([
        { id: 1, name: 'Milk', price: 2.5 },
        { id: 2, name: 'Bread', price: 3.5 },
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const product = ProductSchema.safeParse(body);

    if (!product.success)
        return NextResponse.json(
            { error: product.error.errors },
            { status: 400 }
        );

    if (product.success)
        return NextResponse.json({ id: 3, ...product.data }, { status: 201 });
}
