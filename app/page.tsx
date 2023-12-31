import Image from 'next/image';
import Link from 'next/link';

import ProductCard from './components/ProductCard';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/authOptions';
import HeavyComponent from './components/HeavyComponent';

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <h1>
                Hello,{' '}
                {!!session?.user?.name ? (
                    <span>{session.user.name}</span>
                ) : (
                    <span>anonymous user</span>
                )}
            </h1>
            <Link href="/users">Users</Link>
            <ProductCard />
            <HeavyComponent />
        </main>
    );
}
