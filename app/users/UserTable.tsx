import Link from 'next/link';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
    // by default plain fetch will cache the data recieved
    // this means that this page is treated as a static page
    // that is, this page will be rendered statically at build time.
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: 'no-cache', // use when data changes frequently
        // next: { revalidate: 10 }, // cache data for 10 seconds before invalidating it
    });
    const users: User[] = await res.json();

    const sortedUsers = users.sort((a, b) => {
        if (sortOrder === 'email')
            return a.email && b.email
                ? a.email.localeCompare(b.email, 'en', {
                      ignorePunctuation: true,
                  })
                : 0;
        return a.name && b.name
            ? a.name.localeCompare(b.name, 'en', {
                  ignorePunctuation: true,
              })
            : 0;
    });

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>
                        <Link href="/users?sortOrder=name">Name</Link>
                    </th>
                    <th>
                        <Link href="/users?sortOrder=email">Email</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
