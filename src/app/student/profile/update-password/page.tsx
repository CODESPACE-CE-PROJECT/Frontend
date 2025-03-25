"use client";

import { useEffect, useState } from "react";
import { TextFieldPassword } from "@/components/Input/TextField/TextFieldPassword";
import { Label } from "@/components/Input/Label";
import { getProfile, updatePassword } from "@/actions/user";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import { useRouter } from "next/navigation";
import { IProfile, IUpdatePassword } from "@/types/user";
import { TopNav } from "@/components/Navbar/TopNav";
import { Loading } from "@/components/Loading/Loading";

export default function Page() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [profile, setProfile] = useState<IProfile>()
    const [formData, setFormData] = useState<IUpdatePassword>({
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (value: string | number, name: string) => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSubmit = async () => {
        const id = notify(NotifyType.LOADING, "กำลังเปลี่ยนรหัสผ่าน");
        const { status } = await updatePassword(formData);
        if (id) {
            if (status === 201) {
                updateNotify(id, NotifyType.SUCCESS, "แก้ไขรหัสผ่านสำเร็จ");
                router.back()
            } else {
                updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการแก้ไขรหัสผ่าน");
            }
        }
    };

    const handleCancel = () => {
        router.back()
    };

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile()
            setProfile(profile)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const isDisabled = formData.password !== formData.confirmPassword || !formData.password || !formData.confirmPassword;

    return isLoading ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <Loading className="size-20" />
        </div>
    ) : (
        <div className="p-10 w-full h-[calc(100%-10px)]">
            <TopNav
                disableNotification={false}
                imageUrl={profile?.pictureUrl}
                role={profile?.role}
            >
                <p>โปรไฟล์</p>
            </TopNav>
            <div className="flex flex-row justify-center w-full h-full">
                <div className="flex flex-col justify-center w-[540px]">
                    <p className="text-4xl font-semibold text-center">เปลี่ยนรหัสผ่าน</p>
                    <div className="flex flex-col items-start gap-y-3">
                        <Label text="รหัสผ่าน" isRequired={true} />
                        <TextFieldPassword name="password" onChange={handleInputChange} />
                    </div>


                    <div className="flex flex-col items-start w-full gap-y-3 mt-4">
                        <Label text="ยืนยันรหัสผ่าน" isRequired={true} />
                        <TextFieldPassword name="confirmPassword" onChange={handleInputChange} />
                    </div>


                    <div className="mt-6 w-full">
                        <ConfirmButton className="w-full" disabled={isDisabled} onClick={handleSubmit}>
                            ยืนยัน
                        </ConfirmButton>
                    </div>
                    <div className="mt-6 w-full">
                        <CancelButton className="w-full hover:bg-gray-600 py-3" onClick={handleCancel}>
                            ยกเลิก
                        </CancelButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
