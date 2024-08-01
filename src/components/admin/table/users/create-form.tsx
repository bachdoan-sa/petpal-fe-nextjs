'use client'
import Link from 'next/link';
import { Button } from '@/src/components/admin/button';
import { CreateUser } from '@/src/lib/actions/admin/usersTable/actions'
import { useState } from 'react';
import { toast } from 'sonner';

interface ErrorState {
    [key: string]: any;
}

export default function FormCreate() {
    const [errors, setErrors] = useState<ErrorState | undefined>();

    const handleSubmit = async (formData) => {
        const result = await CreateUser(formData);
        console.log(result)
        if (result != undefined) {
            if (result?.success) {
                toast.success("Tạo tài khoản thành công");
            } else {
                setErrors(result?.errors || {});
            }
        }
        console.log(errors)
    };
    return (
        <div>
            <form action={handleSubmit}>
                <div className="rounded bg-gray-100 p-4">
                    {/* User Name */}
                    <div className="mb-4">
                        <label htmlFor="username" className="mb-2 d-block text-sm font-medium">
                            User Name
                        </label> 
                        <div className="relative">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter user name"
                                className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="mb-2 d-block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    placeholder="Enter password"
                                    className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* fullName */}
                    <div className="mb-4">
                        <label htmlFor="fullname" className="mb-2 d-block text-sm font-medium">
                            Full name
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    placeholder="Enter Full Name"
                                    className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* address */}
                    <div className="mb-4">
                        <label htmlFor="address" className="mb-2 d-block text-sm font-medium">
                            Address
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Enter address..."
                                    className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* phone Number */}
                    <div className="mb-4">
                        <label htmlFor="phonenumber" className="mb-2 d-block text-sm font-medium">
                            Phone number
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="phonenumber"
                                    name="phonenumber"
                                    type="number"
                                    placeholder="Enter phone number"
                                    className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                />
                            </div>
                        </div>
                    </div>
                    {/* email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 d-block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    className="d-block w-100 rounded border border-gray-600 py-2 ps-3 text-sm outline-2 placeholder-text-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 d-flex justify-content-end gap-4">
                    <Link
                        href="/admin/users"
                        className="d-flex h-10 align-items-center rounded-pill bg-gray-300 hover-for-bg-gray px-4 text-gray-600"
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Create User</Button>
                </div>
            </form>
        </div>
    );
}

