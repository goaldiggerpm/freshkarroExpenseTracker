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
                <div className="flex flex-col items-center mx-auto h-full w-full overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle className="text-lg">Expense Receipt</DrawerTitle>
                        <DrawerDescription className="text-lg">New Form</DrawerDescription>
                    </DrawerHeader>

                    <div className="mt-3 w-[100%] max-w-[360px] md:max-w-[600px] lg:w-[900px]">
                        <div className="expense-container">
                            <div className="text-red-400 text-lg">Adding</div>
                            <form id="expense-form" onSubmit={addExpense} className="space-y-4">
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >User ID:</span>
                                    <Input name="user_id" value={enteredData.user_id} onChange={handleChange} readOnly />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Expense Type:</span>
                                    <Input name="expense_type" value={enteredData.expense_type} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Reason:</span>
                                    <Input name="reason" value={enteredData.reason} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Expense Date:</span>
                                    <Input name="expense_date" type="date" value={enteredData.expense_date} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Amount:</span>
                                    <Input name="amount" type="number" value={enteredData.amount} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Platform Used:</span>
                                    <Input name="platform_used" value={enteredData.platform_used} onChange={handleChange} />
                                </div>
                                <div className="text-lg flex flex-col m-2">
                                    <span className="text-sm text-gray-700" >Payment Reference ID:</span>
                                    <Input name="payment_reference_id" value={enteredData.payment_reference_id} onChange={handleChange} />
                                </div>
                                <Button className="mt-4 hidden" type="submit">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="expense-form" className="w-[360px] m-auto">Save</Button>
                    <DrawerClose asChild onClick={handleDrawerClose}>
                        <Button variant="outline" className="w-[360px] m-auto">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
})

ExpenseAddDrawer.displayName = "ExpenseAddDrawer"

export { ExpenseAddDrawer }
