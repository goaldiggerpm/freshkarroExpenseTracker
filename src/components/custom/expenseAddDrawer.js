"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { toast } from 'sonner'


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
import { Input } from "../ui/input";


const ExpenseAddDrawer = forwardRef((props, ref) => {
    const [enteredData, setEnteredData] = useState({
        expense_id: 'any',
        user_id: props.username,
        expense_type: '',
        reason: '',
        expense_date: '',
        amount: '',
        platform_used: '',
        payment_reference_id: '',
        entered_by: '',
        updated_by: '',
        entered_date: '',
        updated_date: '',
        is_deleted: false
    });
    const router = useRouter();

    function handleChange(e) {
        const { name, value } = e.target;
        setEnteredData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setEnteredData(prevState => ({
            ...prevState,
            user_id: props.username,
            entered_by: props.username,
            updated_by: props.username,
            entered_date: currentDate,
            updated_date: currentDate
        }));
    }, []);

    function isFormValid() {
        for (let key in enteredData) {
            if (enteredData[key] === '' || enteredData[key] === null || enteredData[key] === undefined) {
                return false;
            }
        }
        return true;
    }

    async function addExpense(e) {
        e.preventDefault()
        if (isFormValid()) {
            try {
                const response = await fetch('/api/data/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(enteredData),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', response.status, errorText);
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result) {
                    toast.success("Expense added successfully");
                    setTimeout(() => {
                        router.refresh();
                    }, 3000);
                }
            } catch (error) {
                console.error('Error adding expense:', error);
            }
        }
    }

    function handleDrawerClose() {
        const currentDate = new Date().toISOString().split('T')[0];
        setEnteredData({
            expense_id: 'any',
            user_id: props.username,
            expense_type: '',
            reason: '',
            expense_date: '',
            amount: '',
            platform_used: '',
            payment_reference_id: '',
            entered_by: props.username,
            updated_by: props.username,
            entered_date: currentDate,
            updated_date: currentDate,
            is_deleted: false
        });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild className="hidden" ref={ref}>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto h-full w-full max-w-sm overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle className="text-lg">Expense Receipt</DrawerTitle>
                        <DrawerDescription className="text-lg">New Form</DrawerDescription>
                    </DrawerHeader>

                    <div className="mt-3">
                        <div className="expense-container">
                            <div className="text-red-400 text-lg">Adding</div>
                            <form id="expense-form" onSubmit={addExpense} className="space-y-4">
                                {/* <div className="text-lg flex flex-col m-2">
                                    <span>Expense ID:</span>
                                    <Input name="expense_id" value={enteredData.expense_id} onChange={handleChange} />
                                </div> */}
                                <div className="text-lg flex flex-col m-2">
                                    <span>User ID:</span>
                                    <Input name="user_id" value={enteredData.user_id} onChange={handleChange} readOnly />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Expense Type:</span>
                                    <Input name="expense_type" value={enteredData.expense_type} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Reason:</span>
                                    <Input name="reason" value={enteredData.reason} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Expense Date:</span>
                                    <Input name="expense_date" type="date" value={enteredData.expense_date} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Amount:</span>
                                    <Input name="amount" value={enteredData.amount} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Platform Used:</span>
                                    <Input name="platform_used" value={enteredData.platform_used} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span>Payment Reference ID:</span>
                                    <Input name="payment_reference_id" value={enteredData.payment_reference_id} onChange={handleChange} />
                                </div>
                                {/* <div className="text-lg flex flex-col">
                                    <span>Entered By:</span>
                                    <input name="entered_by" value={enteredData.entered_by} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col">
                                    <span>Updated By:</span>
                                    <input name="updated_by" value={enteredData.updated_by} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col">
                                    <span>Entered Date:</span>
                                    <input name="entered_date" value={enteredData.entered_date} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col">
                                    <span>Updated Date:</span>
                                    <input name="updated_date" value={enteredData.updated_date} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col">
                                    <span>Is Deleted:</span>
                                    <input name="is_deleted" value={enteredData.is_deleted} placeholder="Type yes or no" onChange={handleChange} />
                                </div> */}
                                <Button className="mt-4 hidden" type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="expense-form">Save</Button>
                    <DrawerClose asChild onClick={handleDrawerClose}>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
})

ExpenseAddDrawer.displayName = "ExpenseAddDrawer"

export { ExpenseAddDrawer }
