import { NextRequest, NextResponse } from 'next/server';

import { UserSchema } from '../schema';

interface Props {
    params: { id: number };
}

export function GET(request: NextRequest, { params: { id } }: Props) {
    // fetch data
    // if data not found return 404
    // else return data
    if (id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ id: 1, name: 'John' }, { status: 200 });
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
    if (id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // else update and return user
    return NextResponse.json({ id, name: user.data.name }, { status: 201 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    // fetch user with given id
    // if no user return 404
    if (id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // else update and return user
    return NextResponse.json({ id, name: 'June' }, { status: 200 });
}
