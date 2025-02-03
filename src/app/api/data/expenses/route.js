import createClient from '@/utils/supabase/server'
import { NextResponse } from 'next/server'


export async function GET(req, res) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase.from('expenses').select('*')
        console.log(error)
        if (error) {
            throw error
        }

        return NextResponse.json(data, { success: true, status: 200 })
    }
    catch (error) {
        console.error('Error fetching expenses:', error)
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}