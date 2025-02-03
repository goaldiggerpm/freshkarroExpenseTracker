import createClient from '@/utils/supabase/server'
import { NextResponse } from 'next/server'


// export async function GET(req, res) {
//     try {
//         const supabase = await createClient()

//         const { data, error } = await supabase.from('expenses').select('*')
//         console.log(error)
//         if (error) {
//             throw error
//         }

//         return NextResponse.json(data, { success: true, status: 200 })
//     }
//     catch (error) {
//         console.error('Error fetching expenses:', error)
//         return NextResponse.json(
//             { error: 'Server error' },
//             { status: 500 }
//         )
//     }
// }
export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    try {
        const supabase = await createClient();

        const { data, error, count } = await supabase
            .from('expenses')
            .select('*', { count: 'exact' })
            .range(start, end);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { data, page, totalPages: Math.ceil(count / limit) },
            { success: true, status: 200 }
        );
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
    console.log('updates here api', updates)

    try {
        const supabase = await createClient();

        const username = req.cookies.get('username');
        updates.updated_by = username;
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