"use client"

import React, { useRef, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ExpenseDrawer } from './expenseDrawer'

const ExpenseTable = ({ expenses }) => {
    const [selectedExpense, setselectedExpense] = useState({})

    const drawerTriggerRef = useRef(null)

    const handleRowClick = (expense) => {
        setselectedExpense(expense)
        setTimeout(() => {
            if (drawerTriggerRef.current) {
                drawerTriggerRef.current.click()
            }
        }, 0)
    }

    return (
        <div>
            <Table className="max-w-[400px] md:max-w-[500px] lg:w-[900px]">
                <TableHeader className="[&_tr]:border-b"></TableHeader>
                <TableHeader className="[&_tr]:border-b w-full">
                    <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <TableHead className="w-[25%] align-top">User ID</TableHead>
                        <TableHead className="w-[25%] align-top">Exp Date</TableHead>
                        <TableHead className="w-[25%] align-top">Exp Type</TableHead>
                        <TableHead className="w-[25%] text-right align-top">Amnt ₹</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow className="cursor-pointer" key={`row-${expense.expense_id}`} onClick={() => handleRowClick(expense)}>
                            <TableCell className="font-medium truncate">{expense.user_id}</TableCell>
                            <TableCell className="truncate">{expense.expense_date}</TableCell>
                            <TableCell className="truncate">{expense.expense_type}</TableCell>
                            <TableCell className="text-right truncate">{expense.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ExpenseDrawer ref={drawerTriggerRef} expensedata={selectedExpense} show={false} />
        </div>
    )
}

export default ExpenseTable