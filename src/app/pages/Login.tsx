"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link'; 
import Logo from "../../app/assets/Login/logo.svg";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleUserName = (e) => {
        setEmail(e.target.value)
        
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handlelogin = () => {
        axios.post("https:",
            {
                email: email,
                password: password,

            })
            .then((response) => {
                console.log(response)
                alert(response)
            })
            
            .catch((err) => {
                console.log(err.response)
            })
                
            ;
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="  shadow-md rounded-lg px-8 py-6 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="Logo" width={100} height={100} />
                </div>
                <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">Sign in to Your Account</h1>
                <form action="#">
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300  dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300  dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />

                        <Link href="/resetpassword" className="pt-4 flex justify-end text-xs text-white  hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Reset password</Link> 

                    </div>
                    <button onClick={() => console.log("ok")} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0053A6] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>
    );
}
