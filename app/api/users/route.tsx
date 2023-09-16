import { NextRequest, NextResponse } from 'next/server';

import { UserSchema } from './schema';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
    // fetch data
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    // validate request
    const user = UserSchema.safeParse(body);

    // if invalid return 400
    if (!user.success)
        return NextResponse.json(user.error.errors, { status: 400 });

    // if valic, check if user exist
    const existUser = await prisma.user.findUnique({
        where: { email: user.data.email },
    });

    if (!!existUser)
        return NextResponse.json(
            { error: 'User already exist' },
            { status: 400 }
        );

    // save data
    const newUser = await prisma.user.create({ data: user.data });

    // else return data
    return NextResponse.json({ newUser }, { status: 201 });
}
