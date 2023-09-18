import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) return null;
                if (!user.hashedPassword) return null;
                const isSuccess = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                return isSuccess ? user : null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
};
