"use client"

import React, { forwardRef } from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


const ExpenseDrawer = forwardRef(({ expensedata }, ref) => {
    // const [goal, setGoal] = React.useState(350)

    // function onClick(adjustment) {
    //     setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    // }

    console.log('data', expensedata)

    return (
        <Drawer>
            <DrawerTrigger asChild className="hidden" ref={ref}>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent >
                <div className="mx-auto h-full w-full max-w-sm overflow-y-auto ">
                    <DrawerHeader>
                        <DrawerTitle>Expense Receipt</DrawerTitle>
                        <DrawerDescription>Created by {expensedata?.user_id}</DrawerDescription>
                    </DrawerHeader>

                    <div className="mt-3 h-[120px] ">
                        <ResponsiveContainer width="100%" height="100%">
                            <div className="expense-container">
                                <h2>Expense Details</h2>
                                <div>
                                    <span>Expense ID:</span> {expensedata?.expense_id}
                                </div>
                                <div>
                                    <span>User ID:</span> {expensedata?.user_id}
                                </div>
                                <div>
                                    <span>Expense Type:</span> {expensedata?.expense_type}
                                </div>
                                <div>
                                    <span>Reason:</span> {expensedata?.reason}
                                </div>
                                <div>
                                    <span>Expense Date:</span> {expensedata?.expense_date}
                                </div>
                                <div>
                                    <span>Amount:</span> {expensedata?.amount}
                                </div>
                                <div>
                                    <span>Platform Used:</span> {expensedata?.platform_used}
                                </div>
                                <div>
                                    <span>Payment Reference ID:</span> {expensedata?.payment_reference_id}
                                </div>
                                <div>
                                    <span>Entered By:</span> {expensedata?.entered_by}
                                </div>
                                <div>
                                    <span>Updated By:</span> {expensedata?.updated_by}
                                </div>
                                <div>
                                    <span>Entered Date:</span> {expensedata?.entered_date}
                                </div>
                                <div>
                                    <span>Updated Date:</span> {expensedata?.updated_date}
                                </div>
                                <div>
                                    <span>Is Deleted:</span> {expensedata?.is_deleted ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </ResponsiveContainer>
                    </div>
                </div>
                <DrawerFooter>
                    {/* <Button>Submit</Button> */}
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
})

ExpenseDrawer.displayName = "ExpenseDrawer"

export { ExpenseDrawer }
