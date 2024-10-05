"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../app/assets/Login/logo.svg";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(""); // Store error message for username and password
  const router = useRouter();

  const handleUserName = (e) => {
    setUsername(e.target.value);
    setUsernameError(false);
    setLoginError(""); // Reset combined error when user starts typing
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setLoginError(""); // Reset combined error when user starts typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlelogin = (e) => {
    e.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setLoginError("");

    // Check if both fields are empty
    if (!username && !password) {
      setLoginError("ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
      return;
    }

    // Check individual fields
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    // Stop if any error exists
    if (!username || !password) return;

    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        username,
        password,
      })
      .then((response) => {
        setLoading(false);
        router.push("/student/courses");
      })
      .catch((err) => {
        setLoading(false);
        setLoginError("ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง"); // Set error message
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <h1 className="text-4xl font-bold text-center mb-6 dark:text-gray-200">
          SIGN IN TO CODE SPACE
        </h1>

        <form className="flex flex-col" action="#">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="email"
              id="username"
              className={`shadow-sm rounded-md w-full px-3 py-2 border ${
                usernameError ? "border-red-500" : "border-[#BCBEC0]"
              } text-[#BCBEC0] focus:outline-none bg-[#2A3A50]`}
              placeholder="Username"
              required
              onChange={handleUserName}
            />
            {usernameError && (
              <p className="text-red-500 text-xs mt-2">ชื่อผู้ใช้ไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง</p>
            )}
          </div>

          <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`shadow-sm rounded-md w-full px-3 py-2 border ${
                passwordError ? "border-red-500" : "border-[#BCBEC0]"
              } text-[#BCBEC0] focus:outline-none bg-[#2A3A50]`}
              placeholder="Password"
              required
              onChange={handlePassword}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-2">รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง</p>
            )}

            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} className="text-[#BCBEC0]" />
              ) : (
                <AiFillEye size={24} className="text-[#BCBEC0]" />
              )}
            </span>
          </div>
          <div className="pt-0.5"></div>

          {/* Combined login error message */}
          {loginError && (
            <p className="text-red-500 text-sm mb-1 mt-3 text-start">{loginError}</p>
          )}

          <Link
            href="/login/resetpassword"
            className="my-3 flex justify-end text-xs text-white hover:text-indigo-500"
          >
            <p>Reset password</p>
          </Link>

          <button
            onClick={handlelogin}
            type="button"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0053A6] hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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
