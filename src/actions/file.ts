"use server"

import axios, { AxiosError } from "axios"
import { getToken } from "@/lib/session"

export const uploadImageFile = async (file:File) => {
     const token = await getToken()

     const formData = new FormData()
     formData.append('file', file)
     
     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/image`, formData,{
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data
          }
     }).catch((err:AxiosError) => {
          return {
               status: err.status,
               data: err.response?.data
          }
     })
}


export const uploadDocumentFile = async (file:File) => {
     const token = await getToken()
     
     const formData = new FormData()
     formData.append('file', file)

     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file`,formData, {
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data
          }
     }).catch((err:AxiosError) => {
          return {
               status: err.status,
               data: err.response?.data
          }
     })
}
