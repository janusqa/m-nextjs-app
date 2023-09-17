import { NextRequest, NextResponse } from 'next/server';
import middleware from 'next-auth/middleware';

// in matcher we can specify parameters like :<param>
// if it ends in a * that means the param is optional
// and if none is presented only the main path will be used
// eg. the below will match /users OR /users/<something>
//
// If a + sign is used, it means at least one param must be present
// for matcher to match
//
// if a ? is used that means 0 or 1 param expected
// export const config = { matcher: ['/users/:id*'] };

// //This is just a sample middleware function.
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/new-page', request.url));
// }

export const config = {
    matcher: ['/users/:id*', '/admin/:id*', '/upload/:id*'],
};

export default middleware;
