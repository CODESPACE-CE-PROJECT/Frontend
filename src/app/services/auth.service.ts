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
                    const accessTokenExpiration = 60 * 60; // seconds
                    const refreshTokenExpiration = 7 * 24 * 60 * 60; // seconds

                    Cookies.set('accessToken', accessToken, { expires: accessTokenExpiration / (24 * 60 * 60) });
                    Cookies.set('refreshToken', refreshToken, { expires: refreshTokenExpiration / (24 * 60 * 60) });
               }
          }
          console.log(response)
          return response;
     } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
               return { status: 401, message: "ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง" };
          }
          console.log(error)
          throw error;
     }
};



export const logout = async () => {
     try {
          const token = Cookies.get('accessToken')
          const response: AxiosResponse = await axios.get(
               `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
               {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               }
          );

          if (response.status === 200) {
               Cookies.remove('accessToken')
               Cookies.remove('refreshToken')
          }
          return response;
     } catch (error) {
          console.log(error)
     }
};
