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
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((e:AxiosError) => {
          return {
               status: e.status,
               data: e.response?.data
          }
     })
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

     if (createForm.picture) {
          const formData = new FormData()
          formData.append('picture', createForm.picture as File)
          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, formData, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
     }

     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, {
          ...createForm,
          package: createForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
     }, {
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
          return {
               status: e.status,
               data: e.response?.data
          }
     })
}

export const setEnableSchoolById = async (schoolId: string, isEnable: boolean) => {
     const token = await getToken()
     return axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, {
          isEnable: isEnable
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
          return {
               status: e.status,
               data: e.response?.data
          }
     })
}

export const deleteSchoolById = async (schoolId:string) => {
     const token = await getToken()
     return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((e: AxiosError) => {
          console.log(e.response?.data)
          return {
               status: e.status,
               data: e.response?.data
          }
     })
}