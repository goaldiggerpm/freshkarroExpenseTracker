// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import createClient from '../supabase/server';

const PUBLIC_ROUTES = ['/', '/login', '/signup']

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = await createClient();


    // Get user credentials from request headers or cookies
    const username = req.headers.get('username') || req.cookies.get('username')?.value
    const password = req.headers.get('password') || req.cookies.get('password')?.value

    const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname)

    if (!isPublicRoute) {
        // Check if user exists in database
        const { data: user, error } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .eq('password', password)
            .single()

        if (error || !user) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}