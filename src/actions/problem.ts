'use server'

import { getToken } from "@/lib/session";
import axios, { AxiosError } from "axios";

export const getProblemById = async (problemId: string) => {
  const token = await getToken()
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${problemId}`, {
    headers: {
      Authorization: `Bearer ${token}`
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
};