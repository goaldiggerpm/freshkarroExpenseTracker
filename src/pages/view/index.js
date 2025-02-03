"use client"

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import ExpenseTable from '@/components/custom/expenseTable'
import "../../app/globals.css";


export default function View(props) {
    const [expenses, setExpenses] = useState([{
        "expense_id": 123,
        "user_id": "Prince_M",
        "expense_type": "Food",
        "reason": "Travelling say bhuk lagi",
        "expense_date": "2025-01-30",
        "amount": 234,
        "platform_used": "Gpay",
        "payment_reference_id": "asdfqwe3345",
        "entered_by": "Prince_M",
        "updated_by": "Prince_M",
        "entered_date": "2025-01-29T21:16:55+00:00",
        "updated_date": "2025-01-29T21:16:59+00:00",
        "is_deleted": false
    }])

    useEffect(() => {
        fetchExpenses()
            .then(data => setExpenses(data))
            .catch(error => console.error('Error fetching expenses:', error))
    }, [])

    async function fetchExpenses() {
        try {
            const response = await fetch('/api/data/expenses', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch expenses')
            }

            const data = await response.json()
            console.log('from expense', data)
            return data
        } catch (error) {
            console.error('Error fetching expenses:', error)
            return []
        }
    }

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
        <div className='w-auto p-4'>
            <div className='flex flex-row gap-10 p-2'>
                <Button className="mr-auto" variant='add' >Add</Button>
                <Button className="mr-auto rounded-full" variant='secondary' onClick={handleLogout}>Logout</Button>
            </div>
            <ExpenseTable expenses={expenses} />
        </div>
    )
}