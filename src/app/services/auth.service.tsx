import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';

export const login = async (username: string, password: string) => {
     try {
       const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
         username: username,
         password: password,
       });
   
       if (response.status === 201) {
         const accesstoken: string | null = response.data.accessToken;
         const refreshtoken: string | null = response.data.refreshToken;
         if (accesstoken && refreshtoken) {
           Cookies.set('accessToken', accesstoken);
           Cookies.set('refreshToken', refreshtoken);
         }
       }
       return response;
     } catch (error) {
       
       if (axios.isAxiosError(error) && error.response?.status === 401) {
         return { status: 401, message: "ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง" };
       }
       throw error; 
     }
   };


export const logout = async () => {
     try {
          const response: AxiosResponse = await axios.get(
               `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
               {
                    headers: {
                         AuthorizationaccessToken: `Bearer ${Cookies.get('accessToken')}`
                         
                    }
               }
          );

          if (response.status === 200) {
               Cookies.remove('accessToken');
               Cookies.remove('refreshToken');
               
          }

          return response;
     } catch (error) {
          console.error('Logout failed:', error);
          throw new Error('Logout failed');
     }
};
