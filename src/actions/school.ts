"use server"

import axios from "axios"
import { ICreateSchool, IUpdateSchool } from "../types/school"
import { PackageType } from "@/enum/enum"
import { getToken } from "@/lib/session"

export const getAllSchool = async () => {
     const token = await getToken()
     return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, {
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => res.data.data)
}

export const getSchoolById = async (id: string) => {
     const token = await getToken()
     return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${id}`, {
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => res.data.data)
}

export const getSchoolBinInfo = async () => {
     const token = await getToken()
     return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/bin`, {
          headers: {
               Authorization: `Bearer ${token}`,
          }
     }).then((res) => res.data.data).catch((err) => err)
}

export const createSchool = async (createForm: ICreateSchool) => {
     const token = await getToken()
     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, {
          ...createForm,
          package: createForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
          subdistrict: createForm.subDistrict
     }, {
          headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data"
          }
     }).then((res) => res.data.data)
}

export const updateSchoolById = async (updateForm: IUpdateSchool, schoolId: string) => {
     const token = await getToken()
     return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, {
          ...updateForm,
          package: updateForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
          subdistrict: updateForm.subDistrict,
          isEnable: true
     }, {
          headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data"
          }
     }).then((res) => res.data.data)
}