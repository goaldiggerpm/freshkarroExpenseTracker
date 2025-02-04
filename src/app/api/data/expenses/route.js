import createClient from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    const username = sessionCookie ? JSON.parse(sessionCookie.value).username : null;
    if (!username) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    try {
        const supabase = await createClient();

        const { data, error, count } = await supabase
            .from('expenses')
            .select('*', { count: 'exact' })
            .range(start, end);

        if (error) {
            throw error;
        }

        const response = NextResponse.json(
            { data, page, totalPages: Math.ceil(count / limit), username },
            { success: true, status: 200 }
        );

        return response;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

export async function PUT(req, res) {
    const { expense_id, ...updates } = await req.json();

    try {
        const supabase = await createClient();

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');
        const username = sessionCookie ? JSON.parse(sessionCookie.value).username : null;
        if (!username) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        updates.updated_by = username;
        const currentDate = new Date().toISOString().split('T')[0];
        updates.updated_date = currentDate;
        const { data, error } = await supabase
            .from('expenses')
            .update(updates)
            .eq('expense_id', expense_id);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { data, success: true, status: 200 }
        );
    } catch (error) {
        console.error('Error updating expense:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

export async function POST(req, res) {
    const newExpense = await req.json();
    newExpense.expense_id = uuidv4();
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('expenses')
            .insert([newExpense]);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { data, success: true, status: 201 }
        );
    } catch (error) {
        console.error('Error adding new expense:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}