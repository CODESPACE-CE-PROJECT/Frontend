"use client";

import Image from 'next/image';
import React from 'react';
import Logo from "../../app/assets/Login/logo.svg";
import Link from 'next/link'; 

export default function ResetPassword() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        {/* Add Logo here if needed */}
                    </div>
                    <h1 className="text-2xl font-bold text-center dark:text-gray-200">Enter your email to reset</h1>
                    <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">password</h1>
                    <form action="#">
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300 focus:outline-none " placeholder="text@gmail.com" required />
                        </div>

                        <button onClick={() => { console.log("Password reset") }} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0053A6] hover:bg-[#EEF3ED] ">Log in</button>
                        
                        <div className="flex justify-center mt-4">
                            <Link href="/login" className="py-2 px-4 text-sm font-medium text-white ">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
