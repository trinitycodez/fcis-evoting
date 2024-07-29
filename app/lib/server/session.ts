'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { cache } from 'react'
 
const secretKey = process.env.AUTH_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: {}) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session');
        return null
    }
}

export async function createOTPSession(userMatric: string): Promise<string> {
    const expiresAt = new Date( Date.now() + 60 * 60 * 1000 )
    const session = await encrypt({ userMatric, expiresAt })

    const res = JSON.stringify({data:[session]})
    return res;
}
export async function createSession(userMatric: string): Promise<string> {
    const expiresAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 )
    const session = await encrypt({ userMatric, expiresAt })

    const res = JSON.stringify({data:[session]})
    return res;
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);
    
    if (session && payload) {
        const expires = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000)
            cookies().set('session', session, {
                httpOnly: true,
                secure: true,
                expires: expires,
                sameSite: 'strict',
                path: '/'
            }
        );
    }

}

export const verifySession = cache(
    async () => {        
        const session = cookies().get('session')?.value;
        const payload = await decrypt(session);
        if (!session || !payload) {
            NextResponse.redirect(new URL('http://localhost:3000/auth/sign-up')); 
            return null;
        };
        const data = payload as { userMatric: string }
        return {
            isAuth: true,
            userMatric: data.userMatric
        }
    
    }
)

export function deleteSession() {
    cookies().delete('session');
    console.log("done__Session");
}