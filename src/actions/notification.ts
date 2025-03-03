"use server"

import axios, { AxiosError } from "axios"
import { getToken } from "@/lib/session"

export const getNotification = async () => {
     const token = await getToken()
     
     return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification`,{
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((err:AxiosError) => {
          return {
               status: err.status,
               data: err.response?.data
          }
     })
}

export const createUserNotification = async (id: string) => {
     const token = await getToken()
     
     return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/${id}`,{},{
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => {
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((err:AxiosError) => {
          return {
               status: err.status,
               data: err.response?.data
          }
     })
}