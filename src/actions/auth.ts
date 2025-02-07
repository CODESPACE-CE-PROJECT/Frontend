'use server'

import axios from 'axios';
import { IAuth, IResponseAuth } from '@/types/auth';
import {createSession, deleteSession, getToken} from '@/lib/session'
import { redirect } from 'next/navigation';

export const login = async (formData: IAuth) => {
     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, formData).then(
          async (res) => {
               if (res.status === 201) {
                    const token: IResponseAuth = res.data
                    if (token.accessToken && token.refreshToken) {
                         await createSession(token.accessToken, token.refreshToken)
                    }
               }
          }
     );
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
     ).then(() => {
          deleteSession()
          redirect('/login')
     });
};

export const forgotPassword = async (email: string) => {
     return await await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
          {
              email: email 
          }
     )
}
