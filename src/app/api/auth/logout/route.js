import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies();

    // Clear session cookie
    cookieStore.delete('session');

    // Redirect to home page
    return NextResponse.json({ success: true, redirectTo: '/' })
}