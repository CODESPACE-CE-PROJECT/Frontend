"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../app/assets/Login/logo.svg";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="shadow-md rounded-lg px-8 py-6 max-w-md w-full">
          <div className="flex justify-center mb-6"></div>
          <h1 className="text-2xl font-bold text-center text-white">
            Enter your email to reset
          </h1>
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            password
          </h1>
          <form action="#">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm rounded-md w-full px-3 py-2  border-[#BCBEC0] border-2  focus:outline-none "
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                console.log("Password reset");
              }}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                email
                  ? "bg-[#1367C8] hover:bg-[#EEF3ED] hover:text-black"
                  : "bg-[#141414] cursor-not-allowed"
              }`}
              disabled={!email}
            >
              Reset Password
            </button>

            <div className="flex justify-center mt-4">
              <Link
                href="/login"
                className="py-2 px-4 text-sm font-medium text-[#EAF0FF] "
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
