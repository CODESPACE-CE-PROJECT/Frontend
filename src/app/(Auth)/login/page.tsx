'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { TextField } from "@/components/Input/TextField/TextField";
import { Label } from "@/components/Input/Label";
import { TextFieldPassword } from "@/components/Input/TextField/TextFieldPassword";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { GoogleButton } from "@/components/Button/GoogleButton";
import Cookies from "js-cookie";
import { IAuth } from "@/types/auth";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AxiosError } from "axios";
import { Loading } from "@/components/Loading/Loading";
import { notify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import { redirect } from "next/navigation";
import PlatfromLogo from '@/assets/Login/logo.svg'

export default function Page() {
  const router = useRouter();
  const [textError, setTextError] = useState<string>()
  const [formData, setFormData] = useState<IAuth>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = (value: string | number, name: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value as string
      } as IAuth
    })
  }

  const handleLogin = async () => {
    setIsLoading(true)
    if (!formData?.username && !formData?.password) {
      setTextError("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง")
      setIsLoading(false)
      return
    } else {
      setTextError('')
    }

    try {
      if (formData) {
        await login(formData);
        setIsLoading(false)
        notify(NotifyType.SUCCESS, 'เข้าสู่ระบบเสร็จสิ้น')
        router.push('/')
      }
    } catch (error: any) {
      setIsLoading(false)
      const err: AxiosError = error
      if (err.response?.status === 401) {
        setTextError("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง")
      }
    }
  };

  const handleGooleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${backendUrl}/auth/google`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken") || null;
    const refreshToken = urlParams.get("refreshToken") || null;
    const error = urlParams.get('error') || ""

    if (error !== "") {
      notify(NotifyType.ERROR, 'เข้าสู่ระบบไม่สมบูรณ์') 
    }

    if (accessToken && refreshToken && error === "") {
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      notify(NotifyType.SUCCESS, 'เข้าสู่ระบบเสร็จสิ้น')
      redirect('/')
    }
  }, [router]);

  return <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] p-10">
    <Image
      src={PlatfromLogo}
      alt='logo'
      width={100}
      height={100}
    />
    <p className="text-4xl mt-6 font-semibold">CODE SPACE</p>
    <div className="flex flex-col items-start w-full max-w-[540px] mt-14 gap-y-5">

      <div className="flex flex-col items-start w-full gap-y-3">
        <Label text="บัญชีผู้ใช้" isRequired={true} />
        <TextField name="username" onChange={handleInputChange} onKeyDown={handleLogin} />
      </div>

      <div className="flex flex-col items-start w-full gap-y-3">
        <Label text="รหัสผ่าน" isRequired={true} />
        <TextFieldPassword name="password" onChange={handleInputChange} onKeyDown={handleLogin}/>
      </div>

      <div onClick={() => router.push('/forgot-password')} className="text-xs self-end hover:text-primary cursor-pointer">ลืมรหัสผ่าน ?</div>

      {
        textError && <div className="flex flex-row items-center text-red-l gap-x-2">
          <ErrorOutlineIcon />
          <p>{textError}</p>
        </div>
      }

      <ConfirmButton className="w-full" onClick={handleLogin} disabled={isLoading}>
        {
          isLoading ? <div className="flex flex-row items-center justify-center gap-x-4">
            <Loading />
            <p>กำลังเข้าสู่ระบบ</p>
          </div> : 'เข้าสู่ระบบ'
        }
      </ConfirmButton>

      <div className="h-[1px] w-full bg-[#CED4DA] opacity-35"></div>
      <GoogleButton className="w-full" onClick={handleGooleLogin} />
    </div>
  </div>;
}
