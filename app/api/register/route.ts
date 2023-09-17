import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});

export async function POST(req: NextRequest) {
    // get request body
    const body = await req.json();

    // validate request body
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    // check if user already exists and return error if so
    const user = await prisma.user.findUnique({
        where: { email: validation.data.email },
    });
    if (user)
        return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
        );

    // if user not exists then hash password and create new user in db
    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: validation.data.email,
            email: validation.data.email,
            hashedPassword,
        },
    });

    // return newly minted user details
    return NextResponse.json(
        { id: newUser.id, name: newUser.name, email: newUser.email },
        { status: 201 }
    );
}
