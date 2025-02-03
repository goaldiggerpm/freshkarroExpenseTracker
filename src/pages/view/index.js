"use client"

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import ExpenseTable from '@/components/custom/expenseTable'

import "../../app/globals.css";
import { useRouter } from 'next/router';


export default function View(props) {
    const router = useRouter()
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
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const getExpenses = async () => {
            const { data, page: currentPage, totalPages: total } = await fetchExpenses(page)
            setExpenses(data)
            setPage(currentPage)
            setTotalPages(total)
        }
        getExpenses()
    }, [page])

    async function fetchExpenses() {
        try {
            const response = await fetch(`/api/data/expenses?page=${page}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch expenses')
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching expenses:', error)
            return { data: [], page: 1, totalPages: 1 }
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

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    return (
        <div className='w-auto p-4'>
            <div className='flex justify-end items-center gap-2 p-2'>
                <Button className="" variant='add' >Add</Button>
                <Button className=" rounded-full" variant='secondary' onClick={handleLogout}>Logout</Button>
            </div>
            <ExpenseTable expenses={expenses} />
            <div className="flex justify-center items-center mt-4">
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Previous
                </Button>
                <span className="mx-4">Page {page} of {totalPages}</span>
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}