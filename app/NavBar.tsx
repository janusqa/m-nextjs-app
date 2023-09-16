import Link from 'next/link';
import React from 'react';

const NavBar = () => {
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
        </nav>
    );
};

export default NavBar;
