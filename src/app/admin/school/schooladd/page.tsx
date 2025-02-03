"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import { useRouter } from "next/navigation";
import { getProvinceData } from "@/app/services/province.service";
import { ICreateSchool } from "@/app/interfaces/school.interface";
import { IProvince } from "@/app/interfaces/province.interface"
import { Label } from "@/app/components/Input/Label";
import { Dropdown } from "@/app/components/Input/Dropdown";
import { TextField } from "@/app/components/Input/TextField";
import { CheckBox } from "@/app/components/Input/CheckBox";
import { TextArea } from "@/app/components/Input/TextArea";
import { ZipCode } from "@/app/components/Input/ZipCode";
import { UploadFile } from "@/app/components/Input/UploadFile";
import { createSchool } from "@/app/services/school.service";
import Swal from 'sweetalert2'

export default function Schooladd() {
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [provinceData, setProvinceData] = useState<IProvince[] | undefined>([])
  const [isSubmited, setIsSubmited] = useState<boolean>(false)
  const [provinceFilterData, setProvinceFilterData] = useState<{
    provinces: string[],
    districts: string[]
    subDistricts: string[]
  }>({
    provinces: [],
    districts: [],
    subDistricts: []
  })
  const [isOpenDropDown, setIsOpenDropdown] = useState<{
    package: boolean,
    province: boolean,
    district: boolean,
    subDistrict: boolean
  }>({
    package: false,
    province: false,
    district: false,
    subDistrict: false
  })
  const [createForm, setCreateForm] = useState<ICreateSchool>({
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
      setCreateForm((prev) => {
        if(!prev) return prev
        return{
          ...prev,
          picture: file
        }
      })
  };

  const handleDropDownChange = (value: string, name: string) => {
    if (name) {
      setCreateForm((prev) => {
        return {
          ...prev,
          [name]: value
        } as ICreateSchool;
      })

      if (name === "package") {
        if (value === "Standard") {
          setCreateForm((prev) => {
            return {
              ...prev,
              maxCreateCoursePerTeacher: 1,
              maxCreateStudent: 50,
              maxCreateTeacher: 3
            }
          })
        } else if (value === "Premium") {
          setCreateForm((prev) => {
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
        if (createForm?.district) {
          setCreateForm((prev) => {
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
            subDistricts: [...new Set(provinceData?.filter((item) => item.province === createForm?.province && item.district === value).map(item => item.subDistrict))]
          }
        })
        if (createForm?.subDistrict) {
          setCreateForm((prev) => {
            if (!prev) return prev
            return {
              ...prev,
              subDistrict: "",
              postCode: ""
            }
          })
        }
      } else if (name === "subDistrict") {
        setCreateForm((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            postCode: provinceData?.filter((item) => item.province === createForm?.province && item.district === createForm.district && item.subDistrict === value)[0].zipCode || ""
          }
        })
        setIsDropdownSelect(true)
      }
    }
  }

  const handleOpenChange = (name: string) => {
    setIsOpenDropdown((prev) => ({
      package: name === "package" ? !prev.package : false,
      province: name === "province" ? !prev.province : false,
      district: name === "district" ? !prev.district : false,
      subDistrict: name === "subDistrict" ? !prev.subDistrict : false,
    }));
  }

  const handleZipCodeChange = (value: string) => {
    if (value.length === 5 && !isDropdownSelect) {
      const data = provinceData?.filter((item) => item.zipCode === value)
      const provinces = [...new Set(data?.map(item => item.province))]
      const distrcts = [...new Set(data?.map(item => item.district))]
      const subDistricts = [...new Set(data?.map(item => item.subDistrict))]

      setCreateForm((prev) => {
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
    setCreateForm((prev) => !prev ? prev : { ...prev, [name]: value })
  }

  const handleSubmit = async () => {
    setIsSubmited(true)
    if(!createForm.schoolName || 
      !createForm.province || 
      !createForm.district || 
      !createForm.subDistrict || 
      !createForm.postCode || 
      !createForm.address ||
      !createForm.package ||
      createForm.maxCreateCoursePerTeacher && createForm.maxCreateCoursePerTeacher < 1 ||
      createForm.maxCreateTeacher && createForm.maxCreateTeacher < 1 || 
      createForm.maxCreateStudent && createForm.maxCreateStudent < 1
    ){
      return
    }
    Swal.isLoading()
    await createSchool(createForm)
    Swal.hideLoading()
    router.push('/admin/school')
  }

  useEffect(() => {
    const fetchProvinceData = async () => {
      const response = await getProvinceData()
      setProvinceData(response)

      setProvinceFilterData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          provinces: [...new Set(response?.map(item => item.province))]
        }
      })
    }
    fetchProvinceData()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown({
          package: false,
          province: false,
          district: false,
          subDistrict: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen">
        <div className="flex justify-between items-center self-stretch">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
          </div>
          <span className="flex w-full p-[10px] text-3xl text-zinc-50">เพิ่มโรงเรียน</span>
        </div>

        {/* container Search and Button */}
        <div className="flex w- py-[32px] flex-col items-center gap-[149px]">
          <div className="flex w-[840px] flex-col items-center gap-[32px]" ref={dropdownRef}>
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex flex-col justify-end items-end gap-[51px] self-stretch">
                <div className="flex flex-col items-start gap-[32px] self-stretch">
                  <UploadFile onInput={handleFileInput}/>

                  {/* รวม */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    {/* แพ็กเกจการใช้งาน */}
                    <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                      <Label text="แพ็กเกจการใช้งาน" isRequired={true} />
                      <Dropdown isOpen={isOpenDropDown.package} value={createForm?.package} name="package" options={['Standard', 'Premium']} onChange={handleDropDownChange} onOpenCahnge={handleOpenChange} validateText="กรุณาเลือกแพ็กเกจ" isSubmited={isSubmited} className="w-full"/>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <Label text="จำกัดจำนวนคอร์ส" isRequired={true} />
                      <TextField name="maxCreateCoursePerTeacher" value={createForm.maxCreateCoursePerTeacher?.toString()} onChange={handleTextFieldChange} isNumberic={true} numberDigit={3} validateText="จำนวนคอร์สต้องมากกว่า 0" isSubmited={isSubmited}/>
                    </div>
                  </div>

                  {/* รวม */}
                  <div className="flex items-start gap-[35px] self-stretch w-full">
                    {/* จำกัดจำนวนผู้สอน*/}
                    <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                      <Label text="จำกัดจำนวนผู้สอน" isRequired={true} />
                      <TextField name="maxCreateTeacher" value={createForm.maxCreateTeacher?.toString()} onChange={handleTextFieldChange} isNumberic={true} numberDigit={4} validateText="จำนวนผู้สอนต้องมากกว่า 0" isSubmited={isSubmited}/>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <Label text="จำกัดจำนวนผู้เรียน" isRequired={true} />
                      <TextField name="maxCreateStudent" value={createForm.maxCreateStudent?.toString()} onChange={handleTextFieldChange} isNumberic={true} numberDigit={4} validateText="จำนวนผู้เรียนต้องมากกว่า 0" isSubmited={isSubmited}/>
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
                        <CheckBox isChecked={createForm.canCreateUser} onChange={(value) => setCreateForm((prev) => !prev ? prev : { ...prev, canCreateUser: value })} label="สร้างผู้ใช้งาน" />
                        <CheckBox isChecked={createForm.canUpdateUser} onChange={(value) => setCreateForm((prev) => !prev ? prev : { ...prev, canUpdateUser: value })} label="แก้ไขข้อมูลผู้ใช้งาน" />
                        <CheckBox isChecked={createForm.canDeleteUser} onChange={(value) => setCreateForm((prev) => !prev ? prev : { ...prev, canDeleteUser: value })} label="ลบผู้ใช้งาน" />
                      </div>
                    </div>
                  </div>

                  {/* โรงเรียน */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <Label text="ชื่อโรงเรียน / สถาบัน" isRequired={true} />
                      <TextField name="schoolName" value={createForm.schoolName} onChange={handleTextFieldChange} isNumberic={false} validateText="กรุณากรอกชื่อโรงเรียน" isSubmited={isSubmited}/>
                    </div>
                  </div>

                  {/* ที่อยู่ */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <Label text="ที่อยู่" isRequired={true} />
                      <TextArea name="address" value={createForm.address} onChange={handleTextFieldChange} validateText="กรุณากรอกที่อยู่" isSubmited={isSubmited}/>
                    </div>
                  </div>

                  {/* ตำบล อำเภอ */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <Label text="แขวง / ตำบล" isRequired={true} />
                      <Dropdown  isOpen={isOpenDropDown.subDistrict} name="subDistrict" value={createForm?.subDistrict} options={provinceFilterData.subDistricts} className="z-10 w-full" onChange={handleDropDownChange} onOpenCahnge={handleOpenChange} validateText="กรุณาเลือกแขวง/ตำบล" isSubmited={isSubmited}/>
                    </div>

                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <Label text="เขต / อำเภอ" isRequired={true} />
                      <Dropdown isOpen={isOpenDropDown.district} name="district" value={createForm?.district} options={provinceFilterData.districts} className="z-0 w-full" onChange={handleDropDownChange} onOpenCahnge={handleOpenChange} validateText="กรุณาเลือกเขต/อำเภอ" isSubmited={isSubmited}/>
                    </div>
                  </div>

                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    {/* จังหวัด / รหัสไปรษณีย์ */}
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <Label text="จังหวัด" isRequired={true} />
                      <Dropdown className="w-full" isOpen={isOpenDropDown.province} name="province" value={createForm?.province} options={provinceFilterData?.provinces} onChange={handleDropDownChange} onOpenCahnge={handleOpenChange} validateText="กรุณาเลือกจังหวัด" isSubmited={isSubmited}/>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <Label text="รหัสไปรษณีย์" isRequired={true} />
                      <ZipCode value={createForm?.postCode} onChange={handleZipCodeChange} />
                    </div>
                  </div>
                </div>
                <div className="flex align-center gap-4">
                  <button onClick={() => router.back()} className="flex w-[160px] h-[54px] justify-center items-center py-3 px-4 rounded-[6px] border border-[#2A3A50] text-zinc-50" >ยกเลิก</button>
                  <button onClick={() => handleSubmit()} className="flex w-[160px] h-[54px] justify-center items-center py-3 px-4 rounded-[6px] border bg-[#5572FA] border-[#5572FA] text-zinc-50 hover:bg-blue-300" >เพิ่ม</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}