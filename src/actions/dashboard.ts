'use server'
import axios from "axios"
import { getToken } from "@/lib/session"

export const getDashboardInfo = async () => {
     const token = await getToken()
     return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
          headers: {
               Authorization: `Bearer ${token}`
          }
     }).then((res) => res.data.data)
}    