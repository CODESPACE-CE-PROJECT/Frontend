'use server'

import { getToken } from "@/lib/session";
import { ICompileCode } from "@/types/compile";
import axios, { AxiosError } from "axios";

export const compileCode = async (submitCode: ICompileCode) => {
     const token = await getToken()
     return await axios.post(`${process.env.NEXT_PUBLIC_COMPILER_URL}/compiler`, submitCode, {
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