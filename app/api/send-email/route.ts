import { NextResponse } from 'next/server';
import WelcomeTemplate from '../../components/emails/WelcomeTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST() {
    const data = await resend.emails.send({
        from: 'support@localhost:3000',
        to: 'john@doe.com',
        subject: 'Welcome to my website!',
        react: WelcomeTemplate({ name: 'John' }),
    });

    return NextResponse.json(data, { status: 200 });
}
