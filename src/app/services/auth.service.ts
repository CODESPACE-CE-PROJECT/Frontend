import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const login = async (username: string, password: string) => {
     try {
       const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
         username,
         password,
       });
   
       if (response.status === 201) {
         const accessToken: string | null = response.data.accessToken;
         const refreshToken: string | null = response.data.refreshToken;
   
         if (accessToken && refreshToken) {
           const accessTokenExpiration = 60 * 24 * 60; // 15 minutes (ในวินาที)
           const refreshTokenExpiration = 7 * 24 * 60 * 60; // 7 days (ในวินาที)
   
           Cookies.set('accessToken', accessToken, { expires: accessTokenExpiration / (24 * 60 * 60) }); // Convert to days
           Cookies.set('refreshToken', refreshToken, { expires: refreshTokenExpiration / (24 * 60 * 60) }); // Convert to days
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
