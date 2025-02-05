import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'


export async function GET() {
    try {
        // Simulate session check logic
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');
        const username = sessionCookie ? JSON.parse(sessionCookie.value).username : null;

        if (!sessionCookie) {
            return NextResponse.json({ session: false }, { status: 401 });
        }

        if (!username) {
            return NextResponse.json({ session: false }, { status: 401 });
        }

        if (username) {
            return NextResponse.json({ session: true });
        }

        return NextResponse.json({ session: true });
    } catch (error) {
        console.error('Error checking session:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
