"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { ResponsiveContainer } from "recharts"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/hooks/use-toast"
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


const ExpenseDrawer = forwardRef(({ expensedata }, ref) => {
    // const [goal, setGoal] = React.useState(350)
    const [edit, setedit] = useState(false)
    const [selectedData, setselectedData] = useState({})
    const [editedData, setEditedData] = useState(expensedata);
    const router = useRouter();

    useEffect(() => {
        setselectedData(expensedata);
        setEditedData(expensedata);
    }, [expensedata]);

    const { toast } = useToast()

    function handleEdit() {
        setedit(!edit)
        // setEditedData(selectedData)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        if (editedData === selectedData) {
            return;
        }
        setselectedData(editedData);
        // if (!edit) {
        //     editExpense();
        // }
    }, [edit]);

    async function editExpense(e) {
        e.preventDefault()
        try {
            const response = await fetch('/api/data/expenses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result) {
                router.refresh();
            }
            toast({
                description: "Expense updated successfully"
            });
            // handleReload();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    }

    function handleDrawerClose() {
        setedit(false);
        setselectedData({});
        setEditedData({
            expense_id: '',
            user_id: '',
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
    }

    return (
        <Drawer >
            <DrawerTrigger asChild className="hidden" ref={ref} >
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent >
                <div className="mx-auto h-full w-full max-w-sm overflow-y-auto ">
                    <DrawerHeader>
                        <DrawerTitle>Expense Receipt</DrawerTitle>
                        <DrawerDescription>Created by {expensedata?.user_id}</DrawerDescription>
                    </DrawerHeader>

                    <div className="mt-3 h-[120px] ">
                        <div className="expense-container">
                            {edit ? (
                                <>
                                    <div className="text-red-400" >Editing</div>
                                    <form id="expense-form" onSubmit={editExpense}>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Expense ID:</span>
                                            <Input name="expense_id" value={editedData.expense_id} onChange={handleChange} readOnly />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>User ID:</span>
                                            <Input name="user_id" value={editedData.user_id} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Expense Type:</span>
                                            <Input name="expense_type" value={editedData.expense_type} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Reason:</span>
                                            <Input name="reason" value={editedData.reason} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Expense Date:</span>
                                            <Input name="expense_date" value={editedData.expense_date} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Amount:</span>
                                            <Input name="amount" value={editedData.amount} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Platform Used:</span>
                                            <Input name="platform_used" value={editedData.platform_used} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Payment Reference ID:</span>
                                            <Input name="payment_reference_id" value={editedData.payment_reference_id} onChange={handleChange} />
                                        </div>
                                        {/* <div className="text-lg flex flex-col m-2">
                                            <span>Entered By:</span> <input name="entered_by" value={editedData.entered_by} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Updated By:</span> <input name="updated_by" value={editedData.updated_by} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Entered Date:</span> <input name="entered_date" value={editedData.entered_date} onChange={handleChange} />
                                        </div>
                                        <div className="text-lg flex flex-col m-2">
                                            <span>Updated Date:</span> <input name="updated_date" value={editedData.updated_date} onChange={handleChange} />
                                        </div> */}
                                        {/* <div className="text-lg flex flex-col m-2">
                                            <span>Is Deleted:</span> <input name="is_deleted" placeholder="Type yes or no" value={editedData.is_deleted ? "Yes" : "No"} onChange={handleChange} tooltip="Say yes or no" />
                                        </div> */}
                                        <Button className="mt-4 hidden" type="submit">Submit</Button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Expense ID:</span> {selectedData?.expense_id}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>User ID:</span> {selectedData?.user_id}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Expense Type:</span> {selectedData?.expense_type}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Reason:</span> {selectedData?.reason}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Expense Date:</span> {selectedData?.expense_date}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Amount:</span> {selectedData?.amount}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Platform Used:</span> {selectedData?.platform_used}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Payment Reference ID:</span> {selectedData?.payment_reference_id}
                                    </div>
                                    {/* <div className="text-lg flex flex-col m-2" >
                                        <span>Entered By:</span> {selectedData?.entered_by}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Updated By:</span> {selectedData?.updated_by}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Entered Date:</span> {selectedData?.entered_date}
                                    </div>
                                    <div className="text-lg flex flex-col m-2" >
                                        <span>Updated Date:</span> {selectedData?.updated_date}
                                    </div> */}
                                    {/* <div className="text-lg flex flex-col m-2" >
                                        <span>Is Deleted:</span> {selectedData?.is_deleted ? 'Yes' : 'No'}
                                    </div> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    {!edit && <Button onClick={handleEdit} >Edit</Button>}
                    {edit && <Button type="submit" form="expense-form">Save</Button>}
                    <DrawerClose asChild onClick={handleDrawerClose} >
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
})

ExpenseDrawer.displayName = "ExpenseDrawer"

export { ExpenseDrawer }
