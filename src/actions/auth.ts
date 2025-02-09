'use server'

import axios, { AxiosError } from 'axios';
import { IAuth, IResponseAuth } from '@/types/auth';
import {createSession, deleteSession, getToken} from '@/lib/session'

export const login = async (formData: IAuth) => {
     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, formData).then(
          async (res) => {
               if (res.status === 201) {
                    const token: IResponseAuth = res.data
                    if (token.accessToken && token.refreshToken) {
                         await createSession(token.accessToken, token.refreshToken)
                    }
               }
               return {
                    status: res.status,
                    data: res.data.data,
               }
          }
     ).catch((e:AxiosError) => {
          return {
               status: e.status,
               data: e.response?.data
          }
     });
};

export const logout = async () => {
     const token = await getToken()
     return await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
          {
               headers: {
                    Authorization: `Bearer ${token}`
               }
          }
     ).then((res) => {
          deleteSession()
          return {
               status: res.status,
               data: res.data.data
          }
     }).catch((e:AxiosError) => {
          const err = e.response?.data as IErrorResponse
          return {
               status: e.status,   
               data: err
          }
     });
};

export const forgotPassword = async (email: string) => {
     return await await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
          {
              email: email 
          }
     ).then((res) => {
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
