"use client";

import Image from 'next/image';
import React from 'react';
import Logo from "../../app/assets/Login/logo.svg";

export default function ResetPassword() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <Image src={Logo} alt="Logo" width={100} height={100} />
                    </div>
                    <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">Reset Your Password</h1>
                    <form action="#">
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                            <input type="password" id="new-password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your new password" required />
                        </div>
                        <button onClick={() => { console.log("Password reset") }} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    );
}
