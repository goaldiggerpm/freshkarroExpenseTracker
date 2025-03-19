"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import ExpenseTable from '@/components/custom/expenseTable'
import "../../app/globals.css";
import { useRouter } from 'next/router';
import { ExpenseAddDrawer } from '@/components/custom/expenseAddDrawer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { CircleLoader } from '@/components/custom/circleLoader';
import debounce from '@/utils/debounce';

export default function View(props) {
    const router = useRouter()
    const [expenses, setExpenses] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [username, setUserName] = useState('')
    const drawerTriggerRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const hasRun = useRef(false);

    const fetchExpenses = useCallback(async (page) => {
        try {
            const response = await fetch(`/api/data/expenses?page=${page}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            setLoading(true)
            if (!response.ok) {
                throw new Error('Failed to fetch expenses')
            }

            const data = await response.json()
            setLoading(false)
            return data
        } catch (error) {
            console.error('Error fetching expenses:', error)
            return { data: [], page: 1, totalPages: 1, username }
        }
    }, [])

    useEffect(() => {
        const getExpenses = async () => {
            const result = await fetchExpenses(page)
            if (result) {
                const { data, page: currentPage, totalPages: total, username } = result
                setUserName(username)
                setExpenses(data)
                if (page !== currentPage) {
                    setPage(currentPage)
                }
                setTotalPages(total)
                if (!username) {
                    // await handleLogout('login')
                }
            }
        }

        getExpenses()
    }, [page])

    const checkSession = async () => {
        try {
            const response = await fetch('/api/auth/check-session', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                toast.error('Session expired, please login again')
            }

            const result = await response.json()

            if (!result.session) {
                toast.error('Session expired, please login again')
                router.push('/')
            }
        } catch (error) {
            console.error('Error checking session:', error)
            toast.error('Error checking session, please login again')
            router.push('/')
        }
    }

    if (!hasRun.current) {
        checkSession()
        hasRun.current = true;
    }


    // useEffect(() => {
    //     const checkSession = async () => {
    //         try {
    //             const response = await fetch('/api/auth/check-session', {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' }
    //             })

    //             if (!response.ok) {
    //                 toast.error('Session expired, please login again')
    //             }

    //             const result = await response.json()

    //             if (!result.session) {
    //                 toast.error('Session expired, please login again')
    //                 router.push('/')
    //             }
    //         } catch (error) {
    //             console.error('Error checking session:', error)
    //             toast.error('Error checking session, please login again')
    //             router.push('/')
    //         }
    //     }

    //     checkSession()
    // },)

    // async function fetchExpenses(page) {
    //     try {
    //         const response = await fetch(`/api/data/expenses?page=${page}`, {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //         setLoading(true)
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch expenses')
    //         }

    //         const data = await response.json()
    //         // setTimeout(() => {
    //         setLoading(false)
    //         // }, 100);
    //         return data
    //     } catch (error) {
    //         console.error('Error fetching expenses:', error)
    //         return { data: [], page: 1, totalPages: 1, username }
    //     }
    // }

    const handleLogout = useCallback(async (val) => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error('Logout failed')
            }

            const result = await response.json()

            if (val === 'login') {
                toast.error('Please login to view expenses')
                router.push(result.redirectTo)
                return
            }

            // Redirect to home page after logout
            router.push(result.redirectTo)
        } catch (error) {
            console.error('Logout error:', error)
            // Handle error (show toast, error message, etc)
        }
    },)

    const handlePageChange = debounce((newPage) => {
        console.log('newPage:', newPage)
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage)
        }
    }, 300)

    const handleRowClick = () => {
        if (drawerTriggerRef.current) {
            drawerTriggerRef.current.click()
        }
    }

    return (
        <React.Fragment>
            {
                loading ?
                    <CircleLoader />
                    :
                    <div className='flex justify-center items-center h-full'>
                        {
                            !loading && <div className='w-auto p-4 font-[family-name:var(--font-geist-sans)] text-lg'>
                                <div className='flex justify-end items-center gap-2 p-2'>
                                    <Button className="rounded-full" variant='add' onClick={handleRowClick} >Add </Button>
                                    <Button className="rounded-full" variant='secondary' onClick={handleLogout}>Logout</Button>
                                </div>
                                <ExpenseTable loading={loading} expenses={expenses} page={page} />
                                <div className="flex justify-center items-center mt-4">
                                    <Button
                                        className="rounded-full"
                                        variant="outline"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page <= 1}
                                    >
                                        <ChevronLeft />
                                    </Button>
                                    <span className="mx-4">Page {page} of {totalPages}</span>
                                    <Button
                                        className="rounded-full"
                                        variant="outline"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page >= totalPages}
                                    >
                                        <ChevronRight />
                                    </Button>
                                </div>
                                <ExpenseAddDrawer ref={drawerTriggerRef} show={false} username={username} />
                            </div>
                        }
                    </div>
            }
        </ React.Fragment>
    )
}