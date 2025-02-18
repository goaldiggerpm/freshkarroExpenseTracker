"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8).max(50, {
        message: "Password must be between 8 and 50 characters.",
    })
})

export function LoginForm() {
    const router = useRouter()
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            // Form values are already processed by react-hook-form
            const formData = {
                username: values.username,
                password: values.password
            }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.status === 401) {
                console.log('Invalid credentials');
                toast.error("Invalid credentials");
                return;
            }

            if (!response.ok) {
                throw new Error('Login failed')
            }

            // Navigate on success
            router.push('/view')
        } catch (error) {

            console.error('Login error:', error)
            // Handle error (show toast, error message, etc)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-0">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username..." {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your Username.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password..." {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your password.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" >Submit</Button>
            </form>
        </Form>
    )
}
