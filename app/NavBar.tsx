'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    const { status, data: session } = useSession();

    return (
        <nav className="flex bg-slate-200 p-5">
            <Link className="mr-5" href="/">
                Next.js
            </Link>
            <Link className="mr-5" href="/users">
                Users
            </Link>
            <Link className="mr-5" href="/products">
                Products
            </Link>
            <Link className="mr-5" href="/admin">
                Admin
            </Link>
            <Link className="mr-5" href="/upload">
                Upload
            </Link>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'unauthenticated' && (
                <Link className="mr-5" href="/api/auth/signin">
                    Sign In
                </Link>
            )}
            {status === 'authenticated' && session.user && (
                <Link className="mr-5" href="/api/auth/signout">
                    {session.user.name}
                </Link>
            )}
        </nav>
    );
};

export default NavBar;
