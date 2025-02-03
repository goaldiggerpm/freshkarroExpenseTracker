"use client"

import React, { forwardRef, useEffect, useState } from "react"
import { ResponsiveContainer } from "recharts"
// import { useRouter } from 'next/router';

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


const ExpenseDrawer = forwardRef(({ expensedata }, ref) => {
    // const [goal, setGoal] = React.useState(350)
    const [edit, setedit] = useState(false)
    const [selectedData, setselectedData] = useState({})
    const [editedData, setEditedData] = useState(expensedata);

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
        if (!edit) {
            editExpense();
        }
    }, [edit]);

    async function editExpense() {
        console.log('im called expense')
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
            console.log('Expense updated successfully:', result);
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
        setEditedData({});
    }

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
                                {edit ? (
                                    <>
                                        <div className="text-red-400" >Editing</div>
                                        <div>
                                            <span>Expense ID:</span> <input name="expense_id" value={editedData.expense_id} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>User ID:</span> <input name="user_id" value={editedData.user_id} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Expense Type:</span> <input name="expense_type" value={editedData.expense_type} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Reason:</span> <input name="reason" value={editedData.reason} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Expense Date:</span> <input name="expense_date" value={editedData.expense_date} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Amount:</span> <input name="amount" value={editedData.amount} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Platform Used:</span> <input name="platform_used" value={editedData.platform_used} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Payment Reference ID:</span> <input name="payment_reference_id" value={editedData.payment_reference_id} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Entered By:</span> <input name="entered_by" value={editedData.entered_by} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Updated By:</span> <input name="updated_by" value={editedData.updated_by} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Entered Date:</span> <input name="entered_date" value={editedData.entered_date} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Updated Date:</span> <input name="updated_date" value={editedData.updated_date} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <span>Is Deleted:</span> <input name="is_deleted" value={editedData.is_deleted ? 'Yes' : 'No'} onChange={handleChange} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span>Expense ID:</span> {selectedData?.expense_id}
                                        </div>
                                        <div>
                                            <span>User ID:</span> {selectedData?.user_id}
                                        </div>
                                        <div>
                                            <span>Expense Type:</span> {selectedData?.expense_type}
                                        </div>
                                        <div>
                                            <span>Reason:</span> {selectedData?.reason}
                                        </div>
                                        <div>
                                            <span>Expense Date:</span> {selectedData?.expense_date}
                                        </div>
                                        <div>
                                            <span>Amount:</span> {selectedData?.amount}
                                        </div>
                                        <div>
                                            <span>Platform Used:</span> {selectedData?.platform_used}
                                        </div>
                                        <div>
                                            <span>Payment Reference ID:</span> {selectedData?.payment_reference_id}
                                        </div>
                                        <div>
                                            <span>Entered By:</span> {selectedData?.entered_by}
                                        </div>
                                        <div>
                                            <span>Updated By:</span> {selectedData?.updated_by}
                                        </div>
                                        <div>
                                            <span>Entered Date:</span> {selectedData?.entered_date}
                                        </div>
                                        <div>
                                            <span>Updated Date:</span> {selectedData?.updated_date}
                                        </div>
                                        <div>
                                            <span>Is Deleted:</span> {selectedData?.is_deleted ? 'Yes' : 'No'}
                                        </div>
                                    </>
                                )}
                            </div>
                        </ResponsiveContainer>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={handleEdit}>{edit ? 'Save' : 'Edit'}</Button>
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
