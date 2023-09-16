import { NextRequest, NextResponse } from 'next/server';

import { UserSchema } from './schema';

export function GET(request: NextRequest) {
    // fetch data
    return NextResponse.json([
        { id: 1, name: 'James' },
        { id: 2, name: 'John' },
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    // validate request
    const user = UserSchema.safeParse(body);

    // if invalid return 400
    if (!user.success)
        return NextResponse.json(user.error.errors, { status: 400 });

    // else return data
    return NextResponse.json({ id: 3, name: user.data.name }, { status: 201 });
}
