"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../app/assets/Login/logo.svg";
import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleUserName = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handlelogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    axios
      .post("https://your-backend-endpoint", { email, password })
      .then((response) => {
        setLoading(false); // Set loading to false after response
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        setLoading(false); // Set loading to false if there's an error
        console.log(err.response);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center mb-6 dark:text-gray-200 whitespace-nowrap">
            SIGN IN TO CODE SPACE
          </h1>
        </div>
        <form className="flex flex-col" action="#">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-[#BCBEC0] text-[#BCBEC0] focus:outline-none bg-[#2A3A50]"
              placeholder="Username"
              required
              onChange={handleUserName}
            />
          </div>

          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-[#BCBEC0] text-[#BCBEC0] focus:outline-none bg-[#2A3A50]"
              placeholder="Password"
              required
              onChange={handlePassword}
            />

            <h1
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} className="text-[#BCBEC0]" />
              ) : (
                <AiFillEye size={24} className="text-[#BCBEC0]" />
              )}
            </h1>
          </div>
          <div className="pt-0.5"></div>
          <Link
            href="/login/resetpassword"
            className="my-3 flex justify-end text-xs text-white hover:text-indigo-500"
          >
            <p>Reset password</p>
          </Link>

          <button
            onClick={handlelogin}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#0053A6] hover:bg-indigo-700"
          >
            Sign in
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 border-white"
        >
          <Image
            src={"https://logopng.com.br/logos/google-37.svg"}
            alt="Google Icon"
            width={24}
            height={24}
          />
          <span className="ml-2 text-white">Or sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
