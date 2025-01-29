import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    // Clear session cookie
    const cookieStore = cookies();
    cookieStore.delete('username');
    cookieStore.delete('password');

    // Redirect to home page
    return NextResponse.json({ success: true, redirectTo: '/' })
}