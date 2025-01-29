import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'

export default function Home() {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('your_table')
                .select('*')

            if (error) console.log('Error:', error)
            else setData(data)
        }

        fetchData()
    }, [])

    return (
        <div>
            <Button>Click me</Button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}