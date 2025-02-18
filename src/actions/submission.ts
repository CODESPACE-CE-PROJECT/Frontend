'use server'

import { getToken } from "@/lib/session";
import { ISubmitCode } from "@/types/submission";
import axios, { AxiosError } from "axios";

export const submissionCode = async (submitForm: ISubmitCode) => {
     const token = await getToken()
     return await axios.post(`${process.env.NEXT_PUBLIC_COMPILER_URL}/submission`, submitForm, {
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