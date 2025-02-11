"use client";

import { useState } from "react";
import { TextFieldPassword } from "@/components/Input/TextField/TextFieldPassword";
import { Label } from "@/components/Input/Label";
import { updatePassword } from "@/actions/user";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";

export default function Page() {
   
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (value: string | number, name: string) => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value as string
            } as { password: string, confirmPassword: string }
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        const id = notify(NotifyType.LOADING, "กำลังเปลี่ยนรหัสผ่าน");
        const result = await updatePassword(formData);
        if (id !== undefined) {
            if (result.status === 201) {
                updateNotify(id, NotifyType.SUCCESS, "ตอบกลับสำเร็จ");

            } else {
                updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการตอบกลับ");
            }
        }

    };

    const handleCancel = () => {
        setFormData({
            password: "",
            confirmPassword: "",
        });

    };

    const isDisabled = formData.password !== formData.confirmPassword || !formData.password || !formData.confirmPassword;

    return (
        <div>

            <div className="min-h-screen  flex items-start justify-center">
                <div className="p-8 rounded-lg shadow-lg w-full max-w-[540px]">
                    <p className="text-4xl mt-6 font-semibold text-center">เปลี่ยนรหัสผ่าน</p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">

                        <div className="flex flex-col items-start w-full gap-y-3">
                            <Label text="รหัสผ่าน" isRequired={true} />
                            <TextFieldPassword name="password" onChange={handleInputChange} />
                        </div>


                        <div className="flex flex-col items-start w-full gap-y-3 mt-4">
                            <Label text="ยืนยันรหัสผ่าน" isRequired={true} />
                            <TextFieldPassword name="confirmPassword" onChange={handleInputChange} />
                        </div>
                        

                        <div className="mt-6 w-full">
                            <ConfirmButton className="w-full" disabled={isDisabled}>
                                ยืนยัน
                            </ConfirmButton>
                        </div>
                        <div className="mt-6 w-full">
                            <CancelButton className="w-full" onClick={handleCancel}>
                                ยกเลิก
                            </CancelButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
