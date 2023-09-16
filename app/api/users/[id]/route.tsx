import { NextRequest, NextResponse } from 'next/server';

import { UserSchema } from '../schema';
import prisma from '@/prisma/client';

interface Props {
    params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
    // fetch data
    // if data not found return 404
    // else return data
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!!!user)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
    const body = await request.json();
    // validate request body
    // if invalid return 400

    const user = UserSchema.safeParse(body);
    if (!user.success)
        return NextResponse.json(user.error.errors, { status: 400 });

    // otherwise fetch user with given id
    // if no user return 404
    const existUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });

    // check for user existance
    // if no user return 404
    if (!!!existUser)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: user.data,
    });

    // else update and return user
    return NextResponse.json(updatedUser, { status: 201 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    // fetch user with given id
    // if no user return 404
    const existUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    if (!!!existUser)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
    });

    // else update and return user
    return NextResponse.json(deletedUser, { status: 200 });
}
