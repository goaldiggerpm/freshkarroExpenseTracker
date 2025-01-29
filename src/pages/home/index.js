import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [data, setData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        // Fetch data or perform client-side operations here
    }, [])

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Logout failed')
            }

            const result = await response.json()

            // Redirect to home page after logout
            router.push(result.redirectTo)
        } catch (error) {
            console.error('Logout error:', error)
            // Handle error (show toast, error message, etc)
        }
    }

    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}