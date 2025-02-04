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
    // const { user_id, expense_date, amount, expense_type } = expenses

    const [expenseData, setExpenseData] = useState(expenses)
    const [selectedExpense, setselectedExpense] = useState({})

    const drawerTriggerRef = useRef(null)

    const handleRowClick = (expense) => {
        setselectedExpense(expense)
        if (drawerTriggerRef.current) {
            drawerTriggerRef.current.click()
        }
    }

    return (
        <div>
            <Table className="">
                {/* <TableCaption className="mt-4 text-sm text-muted-foreground" >A list of your recent invoices.</TableCaption> */}
                <TableHeader className="[&_tr]:border-b" >
                    <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <TableHead className="w-[100px]">User ID</TableHead>
                        <TableHead>Exp Date</TableHead>
                        <TableHead>Exp Type</TableHead>
                        <TableHead className="text-right">Amount ₹</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.expense_id} onClick={() => handleRowClick(expense)} >
                            <TableCell className="font-medium">{expense.user_id}</TableCell>
                            <TableCell>{expense.expense_date}</TableCell>
                            <TableCell>{expense.expense_type}</TableCell>
                            <TableCell className="text-right">{expense.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">₹2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
            <ExpenseDrawer ref={drawerTriggerRef} expensedata={selectedExpense} show={false} />
        </div>
    )
}

export default ExpenseTable