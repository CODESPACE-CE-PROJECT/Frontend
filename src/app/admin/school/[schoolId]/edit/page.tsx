"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useRouter } from "next/navigation";
import { getProvinceData } from "@/actions/province";
import { getSchoolById } from "@/actions/school";
import { ISchool, IUpdateSchool } from "@/types/school";
import { IProvince } from "@/types/province"
import { Label } from "@/components/Input/Label";
import { Dropdown } from "@/components/Input/Dropdown";
import { TextField } from "@/components/Input/TextField/TextField";
import { CheckBox } from "@/components/Input/CheckBox";
import { TextArea } from "@/components/Input/TextArea";
import { ZipCode } from "@/components/Input/ZipCode";
import { UploadFile } from "@/components/Input/UploadFile";
import { useParams } from "next/navigation";
import { textPackage } from "@/utils/text.util";
import { updateSchoolById } from "@/actions/school";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import { CancelButton } from "@/components/Button/CancelButton";
import { ConfirmButton } from "@/components/Button/ConfirmButton";

export default function SchoolEdit() {
     const router = useRouter()
     const dropdownRef = useRef<HTMLDivElement>(null);
     const [provinceData, setProvinceData] = useState<IProvince[] | undefined>([])
     const [isSubmited, setIsSubmited] = useState<boolean>(false)
     const param = useParams<{ schoolId: string }>()
     const [imageUrl, setImageUrl] = useState<string>()
     const [profile, setProfile] = useState<IProfile>()
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [provinceFilterData, setProvinceFilterData] = useState<{
          provinces: string[],
          districts: string[]
          subDistricts: string[]
     }>({
          provinces: [],
          districts: [],
          subDistricts: []
     })
     const [updateForm, setUpdateForm] = useState<IUpdateSchool>({
          province: "",
          district: "",
          subDistrict: "",
          postCode: "",
          address: "",
          canCreateUser: false,
          canDeleteUser: false,
          canUpdateUser: false,
          schoolName: ""
     })

     const [isDropdownSelect, setIsDropdownSelect] = useState(false)

     const handleFileInput = (file: File) => {
          setUpdateForm((prev) => {
               if (!prev) return prev
               return {
                    ...prev,
                    picture: file
               }
          })
     };

     const handleDropDownChange = (value: string, name: string) => {
          if (name) {
               setUpdateForm((prev) => {
                    return {
                         ...prev,
                         [name]: value
                    };
               })

               if (name === "package") {
                    if (value === "Standard") {
                         setUpdateForm((prev) => {
                              return {
                                   ...prev,
                                   maxCreateCoursePerTeacher: 1,
                                   maxCreateStudent: 50,
                                   maxCreateTeacher: 3
                              }
                         })
                    } else if (value === "Premium") {
                         setUpdateForm((prev) => {
                              return {
                                   ...prev,
                                   maxCreateCoursePerTeacher: 3,
                                   maxCreateStudent: 100,
                                   maxCreateTeacher: 10
                              }
                         })
                    }
               }

               if (name === "province") {
                    setProvinceFilterData((prev) => {
                         if (!prev) return prev
                         return {
                              ...prev,
                              districts: [...new Set(provinceData?.filter((item) => item.province === value).map(item => item.district))],
                         }
                    })
                    if (updateForm?.district) {
                         setUpdateForm((prev) => {
                              if (!prev) return prev
                              return {
                                   ...prev,
                                   district: "",
                                   subDistrict: "",
                                   postCode: ""
                              }
                         })
                    }
               } else if (name === 'district') {
                    setProvinceFilterData((prev) => {
                         if (!prev) return prev
                         return {
                              ...prev,
                              subDistricts: [...new Set(provinceData?.filter((item) => item.province === updateForm?.province && item.district === value).map(item => item.subDistrict))]
                         }
                    })
                    if (updateForm?.subDistrict) {
                         setUpdateForm((prev) => {
                              if (!prev) return prev
                              return {
                                   ...prev,
                                   subDistrict: "",
                                   postCode: ""
                              }
                         })
                    }
               } else if (name === "subDistrict") {
                    setUpdateForm((prev) => {
                         if (!prev) return prev
                         return {
                              ...prev,
                              postCode: provinceData?.filter((item) => item.province === updateForm?.province && item.district === updateForm.district && item.subDistrict === value)[0].zipCode || ""
                         }
                    })
                    setIsDropdownSelect(true)
               }
          }
     }

     const handleZipCodeChange = (value: string) => {
          if (value.length === 5 && !isDropdownSelect) {
               const data = provinceData?.filter((item) => item.zipCode === value)
               const provinces = [...new Set(data?.map(item => item.province))]
               const distrcts = [...new Set(data?.map(item => item.district))]
               const subDistricts = [...new Set(data?.map(item => item.subDistrict))]

               setUpdateForm((prev) => {
                    if (!prev) return prev
                    return {
                         ...prev,
                         postCode: value,
                         province: provinces.length === 1 ? provinces[0] : "",
                         district: distrcts.length === 1 ? distrcts[0] : "",
                         subDistrict: subDistricts.length === 1 ? subDistricts[0] : ""
                    }
               })

               setProvinceFilterData({
                    provinces: provinces,
                    districts: distrcts,
                    subDistricts: subDistricts
               })
          } else {
               setIsDropdownSelect(false)
               setProvinceFilterData((prev) => {
                    if (!prev) return prev
                    return {
                         ...prev,
                         provinces: [...new Set(provinceData?.map(item => item.province))]
                    }
               })
          }
     }

     const handleTextFieldChange = (value: string | number, name: string) => {
          setUpdateForm((prev) => !prev ? prev : { ...prev, [name]: value })
     }

     const handleSubmit = async () => {
          setIsSubmited(true)
          if (!updateForm.schoolName ||
               !updateForm.province ||
               !updateForm.district ||
               !updateForm.subDistrict ||
               !updateForm.postCode ||
               !updateForm.address ||
               !updateForm.package ||
               updateForm.maxCreateCoursePerTeacher && updateForm.maxCreateCoursePerTeacher < 1 ||
               updateForm.maxCreateTeacher && updateForm.maxCreateTeacher < 1 ||
               updateForm.maxCreateStudent && updateForm.maxCreateStudent < 1
          ) {
               return
          }

          const id = notify(NotifyType.LOADING, 'กำลังแก้ไขข้อมูลโรงเรียน')

          const { status } = await updateSchoolById(updateForm, param.schoolId)

          if (id) {
               if (status === 200) {
                    updateNotify(id, NotifyType.SUCCESS, 'แก้ไขโรงเรียนเสร็จสิ้น')
                    router.push(`/admin/school/${param.schoolId}`)
               } else if (status === 406) {
                    updateNotify(id, NotifyType.ERROR, 'มีชื่อโรงเรียนนี้แล้วอยู่ในระบบ')
               } else {
                    updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการแก้ไขโรงเรียน')
               }
          }

     }

     useEffect(() => {
          const fetchProvinceData = async () => {
               const response = await getProvinceData()
               const profile = await getProfile()
               setProfile(profile)
               setProvinceData(response)

               setProvinceFilterData((prev) => {
                    if (!prev) return prev
                    return {
                         ...prev,
                         provinces: [...new Set(response?.map(item => item.province))]
                    }
               })
               const { status, data } = await getSchoolById(param.schoolId)

               if (status === 200) {
                    const school: ISchool = data
                    setUpdateForm({
                         schoolName: school.schoolName,
                         address: school.address,
                         district: school.subDistrict,
                         postCode: school.postCode,
                         province: school.province,
                         subDistrict: school.subDistrict,
                         package: textPackage(school.package),
                         maxCreateCoursePerTeacher: school.permission.maxCreateCoursePerTeacher,
                         maxCreateStudent: school.permission.maxCreateStudent,
                         maxCreateTeacher: school.permission.maxCreateTeacher,
                         canCreateUser: school.permission.canCreateUser,
                         canUpdateUser: school.permission.canUpdateUser,
                         canDeleteUser: school.permission.canDeleteUser,
                    })
                    setImageUrl(school.pictureUrl)
               } else {

               }

               setIsLoading(false)
          }
          fetchProvinceData()
     }, [param.schoolId])

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
               <Loading className="size-20" />
          </div>
     ) : (
          <div className="flex flex-col items-center self-stretch w-full h-screen">
               <TopNav imageUrl={profile?.pictureUrl} disableNotification={true} role={profile?.role} gender={profile?.gender}>
                    <div className="cursor-pointer hover:text-primary" onClick={() => router.back()}>
                         <ArrowBackIosNewRoundedIcon />
                    </div>
                    <span className="flex w-full p-[10px] text-3xl text-zinc-50">แก้ไขโรงเรียน</span>
               </TopNav>

               {/* container Search and Button */}
               <div className="flex w- py-[32px] flex-col items-center gap-[149px]">
                    <div className="flex w-[840px] flex-col items-center gap-[32px]" ref={dropdownRef}>
                         <div className="flex flex-col items-start gap-[10px] self-stretch">
                              <div className="flex flex-col justify-end items-end gap-[51px] self-stretch">
                                   <div className="flex flex-col items-start gap-[32px] self-stretch">
                                        <UploadFile onInput={handleFileInput} imageUrl={imageUrl} className="w-full py-4 border-blackground-text" text="เลือกรูปภาพโปรไฟล์ของโรงเรียน"/>

                                        {/* รวม */}
                                        <div className="flex items-start gap-[32px] self-stretch w-full">
                                             {/* แพ็กเกจการใช้งาน */}
                                             <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                                                  <Label text="แพ็กเกจการใช้งาน" isRequired={true} />
                                                  <Dropdown key="package" className="w-full" value={updateForm?.package} name="package" options={['Standard', 'Premium']} onChange={handleDropDownChange} validateText="กรุณาเลือกแพ็กเกจ" isSubmited={isSubmited} />
                                             </div>

                                             {/* จำกัดจำนวนคอร์ส */}
                                             <div className="flex flex-col items-start gap-2.5 w-full">
                                                  <Label text="จำกัดจำนวนคอร์สต่อคุณครู 1 คน" isRequired={true} />
                                                  <TextField name="maxCreateCoursePerTeacher" value={updateForm.maxCreateCoursePerTeacher?.toString()} onChange={handleTextFieldChange} isNumberic={true} maxLength={3} validateText="จำนวนคอร์สต้องมากกว่า 0" isSubmited={isSubmited} />
                                             </div>
                                        </div>

                                        {/* รวม */}
                                        <div className="flex items-start gap-[35px] self-stretch w-full">
                                             {/* จำกัดจำนวนผู้สอน*/}
                                             <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                                                  <Label text="จำกัดจำนวนผู้สอน" isRequired={true} />
                                                  <TextField name="maxCreateTeacher" value={updateForm.maxCreateTeacher?.toString()} onChange={handleTextFieldChange} isNumberic={true} maxLength={4} validateText="จำนวนผู้สอนต้องมากกว่า 0" isSubmited={isSubmited} />
                                             </div>

                                             {/* จำกัดจำนวนคอร์ส */}
                                             <div className="flex flex-col items-start gap-2.5 w-full">
                                                  <Label text="จำกัดจำนวนผู้เรียน" isRequired={true} />
                                                  <TextField name="maxCreateStudent" value={updateForm.maxCreateStudent?.toString()} onChange={handleTextFieldChange} isNumberic={true} maxLength={4} validateText="จำนวนผู้เรียนต้องมากกว่า 0" isSubmited={isSubmited} />
                                             </div>
                                        </div>

                                        {/* รวมกำหนดสิทธิ์ */}
                                        <div className="flex items-start gap-[35px] self-stretch w-full">
                                             <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                                                  <div className="flex justify-center items-center gap-2.5">
                                                       <span className="text-zinc-50">กำหนดสิทธิ์</span>
                                                       <span className="text-[#EF4343]">*</span>
                                                  </div>

                                                  <div className="flex gap-5">
                                                       <CheckBox isChecked={updateForm.canCreateUser} onChange={(value) => setUpdateForm((prev) => !prev ? prev : { ...prev, canCreateUser: value })} label="สร้างผู้ใช้งาน" />
                                                       <CheckBox isChecked={updateForm.canUpdateUser} onChange={(value) => setUpdateForm((prev) => !prev ? prev : { ...prev, canUpdateUser: value })} label="แก้ไขข้อมูลผู้ใช้งาน" />
                                                       <CheckBox isChecked={updateForm.canDeleteUser} onChange={(value) => setUpdateForm((prev) => !prev ? prev : { ...prev, canDeleteUser: value })} label="ลบผู้ใช้งาน" />
                                                  </div>
                                             </div>
                                        </div>

                                        {/* โรงเรียน */}
                                        <div className="flex items-start gap-[32px] self-stretch w-full">
                                             <div className="flex flex-col items-start gap-2.5 w-full ">
                                                  <Label text="ชื่อโรงเรียน / สถาบัน" isRequired={true} />
                                                  <TextField name="schoolName" value={updateForm.schoolName} onChange={handleTextFieldChange} isNumberic={false} validateText="กรุณากรอกชื่อโรงเรียน" isSubmited={isSubmited} />
                                             </div>
                                        </div>

                                        {/* ที่อยู่ */}
                                        <div className="flex items-start gap-[32px] self-stretch w-full">
                                             <div className="flex flex-col items-start gap-2.5 w-full ">
                                                  <Label text="ที่อยู่" isRequired={true} />
                                                  <TextArea name="address" value={updateForm.address} onChange={handleTextFieldChange} validateText="กรุณากรอกที่อยู่" isSubmited={isSubmited} />
                                             </div>
                                        </div>

                                        {/* ตำบล อำเภอ */}
                                        <div className="flex items-start gap-[32px] self-stretch w-full">
                                             <div className="flex flex-col items-start gap-2.5 w-full ">
                                                  <Label text="แขวง / ตำบล" isRequired={true} />
                                                  <Dropdown key="subDistrict" name="subDistrict" value={updateForm.subDistrict} options={provinceFilterData.subDistricts} className="z-10 w-full" onChange={handleDropDownChange} validateText="กรุณาเลือกแขวง/ตำบล" isSubmited={isSubmited} />
                                             </div>

                                             <div className="flex flex-col items-start gap-2.5 w-full">
                                                  <Label text="เขต / อำเภอ" isRequired={true} />
                                                  <Dropdown key="district" name="district" value={updateForm?.district} options={provinceFilterData.districts} className="z-0 w-full" onChange={handleDropDownChange} validateText="กรุณาเลือกเขต/อำเภอ" isSubmited={isSubmited} />
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-[32px] self-stretch w-full">
                                             {/* จังหวัด / รหัสไปรษณีย์ */}
                                             <div className="flex flex-col items-start gap-2.5 w-full ">
                                                  <Label text="จังหวัด" isRequired={true} />
                                                  <Dropdown key="province" className="w-full" name="province" value={updateForm?.province} options={provinceFilterData?.provinces} onChange={handleDropDownChange} validateText="กรุณาเลือกจังหวัด" isSubmited={isSubmited} />
                                             </div>

                                             {/* จำกัดจำนวนคอร์ส */}
                                             <div className="flex flex-col items-start gap-2.5 w-full">
                                                  <Label text="รหัสไปรษณีย์" isRequired={true} />
                                                  <ZipCode value={updateForm?.postCode} onChange={handleZipCodeChange} />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="flex align-center gap-4">
                                        <CancelButton className="w-40" onClick={() => router.back()}>
                                             <p>ยกเลิก</p>
                                        </CancelButton>
                                        <ConfirmButton className="w-40" onClick={() => handleSubmit()}>
                                             <p>ตกลง</p>
                                        </ConfirmButton>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}