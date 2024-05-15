'use server'
// export const runtime = 'experimental-edge';

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const cookie = req.cookies.has('session')
    const path = req.nextUrl.pathname;
    
    if (cookie) {
        console.log("middleware cookie ", cookie);
        const res: any = req.cookies.get('session');
        console.log('Value ', res);
        
        switch (path) {
            case '/':
                NextResponse.redirect(new URL('/', req.nextUrl))
                break;
            case '/messages':
                NextResponse.redirect(new URL('/messages', req.nextUrl))
                break;
            case '/past-elections':
                NextResponse.redirect(new URL('/past-elections', req.nextUrl))
                break;
            case '/about':
                NextResponse.redirect(new URL('/about', req.nextUrl))
                break;
            case '/students':
                NextResponse.redirect(new URL('/students', req.nextUrl))
                break;
                
            default:
                NextResponse.redirect(new URL('/auth/sign-up', req.nextUrl))
                break;
        }        
    }
    NextResponse.redirect(new URL('/auth/sign-up', req.nextUrl))
}

export const config = {
    matcher: [ '/((?!auth|api|_next/static|_next/image|favicon.ico).*)' ]
}