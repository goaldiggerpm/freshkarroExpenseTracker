import createClient from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { username, password } = await request.json()
        const supabase = await createClient()

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            )
        }

        const { data: user, error } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .eq('password', password)
            .single()

        if (error || !user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Set session cookie
        const cookieStore = await cookies()
        cookieStore.set('session', JSON.stringify({ username, password }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 // 1 hour
        })

        return NextResponse.json({
            success: true,
            redirectTo: '/view'
        })

    } catch (error) {
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}