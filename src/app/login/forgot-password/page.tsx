"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/app/components/Input/Label";
import { TextField } from "@/app/components/Input/TextField/TextField";
import { ConfirmButton } from "@/app/components/Input/Button/ConfirmButton";
import { CancelButton } from "@/app/components/Input/Button/CancelButton";
import { forgotPassword } from "@/app/services/auth.service";
import { Loading } from "@/app/components/Loading/Loading";
import { AxiosError } from "axios";
import { notify } from "@/app/utils/toast.util";
import { NotifyType } from "@/app/enum/enum";

export default function ResetPassword() {
  const router = useRouter()
  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const handleForgotPassword = async () => {
    if (!email) {
      setIsSubmit(true)
      return
    }

    setIsLoading(true)
    
    try {
        await forgotPassword(email)
        setIsLoading(false)
        notify(NotifyType.SUCCESS,'ส่งข้อมูลทางอีเมลเสร็จสิ้น')
        router.push('/login')

    } catch (error: any) {
      const err: AxiosError = error
      if (err.response?.status === 404) {
        setIsLoading(false)
        notify(NotifyType.ERROR, 'ไม่เจออีเมลล์ในระบบ')
      }
    }
  }

  return <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-y-6 p-10">
    <p className="text-4xl font-semibold">ลืมรหัสผ่าน</p>
    <div className="flex flex-col items-center w-full max-w-[540px] gap-y-10">
      <div className="flex flex-col items-start w-full gap-y-2">
        <Label text="อีเมล" isRequired={true} />
        <TextField onChange={(value) => setEmail(value as string)} validateText="กรุณาใส่อีเมลล์" isSubmited={isSubmit} onKeyDown={handleForgotPassword}/>
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <ConfirmButton className="w-full" onClick={handleForgotPassword}>
            {
              isLoading ? <div className="flex flex-row items-center justify-center gap-x-4">
                <Loading />
                <p>กำลังเข้าส่งข้อมูลไปทางอีเมลล์</p>
              </div> : 'ยืนยัน'
            }
        </ConfirmButton>
        <CancelButton className="w-full" onClick={() => router.push('/login')}>
          ยกเลิก
        </CancelButton>
      </div>
    </div>
  </div>;
}
