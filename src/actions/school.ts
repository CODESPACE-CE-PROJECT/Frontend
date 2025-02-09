"use server"

import axios, { AxiosError } from "axios"
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
     }).then((res) => res.data.data)
}

export const createSchool = async (createForm: ICreateSchool) => {
     const token = await getToken()

     const formData = new FormData();
     Object.entries(createForm).forEach(([key, value]) => {
          if (key === "package") formData.append(key, value?.toString() === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD)
          else if (value !== undefined && value !== null && key !== "picture") formData.append(key, value.toString());
     });

     if (createForm.picture) {
          formData.append("picture", createForm.picture as File);
     }

     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, formData, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((e: AxiosError) => {
          return {
               status: e.status,
               data: e.response?.data
          }
     })
}

export const updateSchoolById = async (updateForm: IUpdateSchool, schoolId: string) => {
     const token = await getToken()

     if (updateForm.picture) {
          const formData = new FormData()
          formData.append('picture', updateForm.picture as File)
          await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, formData, {
               headers: {
                    Authorization: `Bearer ${token}`,
               }
          })
     }

     return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, {
          ...updateForm,
          package: updateForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
     }, {
          headers: {
               Authorization: `Bearer ${token}`,
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((e: AxiosError) => {
          console.log(e)
          return {
               status: e.status,
               data: e.response?.data
          }
     })
}