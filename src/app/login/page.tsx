"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../app/assets/Login/logo.svg";
import { useRouter } from "next/navigation";
import { login } from "../services/auth.service";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible, AiOutlineExclamationCircle } from "react-icons/ai";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleUserName = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    if (!username && !password) {
      setUsernameError("ชื่อผู้ใช้ไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
      setPasswordError("รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
      return;
    }

    if (!username) {
      setUsernameError("ชื่อผู้ใช้ไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
    }

    if (!password) {
      setPasswordError("รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
    }

    if (!username || !password) return;

    setLoading(true);

    try {
      const response = await login(username, password);

      if (response.status === 201) {
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in!",
          showConfirmButton: false,
          icon: "success",
          timer: 2000,
        }).then(() => {
          router.push("/");
        });
      } else if (response.status === 401) {
        setLoading(false);
        const errorMessage = "message" in response ? response.message : "Unauthorized access";
        setUsernameError(
          errorMessage.includes("username") ? "ชื่อผู้ใช้ไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง" : ""
        );
        setPasswordError(
          errorMessage.includes("password") ? "รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง" : ""
        );
      }
    } catch (error) {
      setLoading(false);
      setUsernameError("เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handlegooglelogin = (e) => {
    e.preventDefault();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
          CODE SPACE
        </h1>

        <form className="flex flex-col" action="#">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-2"
            >
              บัญชีผู้ใช้ <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="username"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-[#2A3A50] text-[#BCBEC0] focus:outline-none bg-[#2A3A50]"
              placeholder="Username"
              required
              onChange={handleUserName}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              รหัสผ่าน <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-[#2A3A50] text-[#BCBEC0] focus:outline-none bg-[#2A3A50]"
                placeholder="Password"
                required
                onChange={handlePassword}
              />
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
          </div>

          <Link
            href="/login/resetpassword"
            className="flex justify-end text-xs text-[#5572FA] hover:text-indigo-500 mt-2"
          >
            <p>รีเซ็ตรหัสผ่าน</p>
          </Link>


          <button 
          {(usernameError || passwordError) && (
            <div className="text-xs text-[#FF8484] mt-2 flex items-center">
              <AiOutlineExclamationCircle size={16} className="mr-1" />
              <p>{usernameError || passwordError}</p>
            </div>
          )}

          <button
            onClick={handlelogin}
            type="button"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white mt-4 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5572FA] hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handlegooglelogin}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium border-white bg-[#FAFAFA]"
        >
          <Image
            src={"https://logopng.com.br/logos/google-37.svg"}
            alt="Google Icon"
            width={24}
            height={24}
          />
          <span className="ml-2 text-gray-800">หรือเข้าสู่ระบบด้วย Google</span>
        </button>
      </div>
    </div>
  );
}
