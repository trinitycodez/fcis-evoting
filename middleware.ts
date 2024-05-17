"server-only"

// export const runtime = 'experimental-edge';

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const cookie = req.cookies.has('session')
    const path = req.nextUrl.pathname;
    
    if (cookie === true) {
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
                break;
        }        
    }
    
    console.log(path)
    const headers = new Headers(req.headers);
    headers.set('X_path', path)     
    
    console.log('middleware code... ')
    return NextResponse.next({headers});
}

export const config = {
    matcher: [ '/((?!api|assets|auth|_next/static|_next/image|favicon.ico).*)' ]
}