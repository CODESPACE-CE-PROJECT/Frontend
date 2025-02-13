import 'server-only'
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";
import { Role } from '@/enum/enum';
import axios, { AxiosResponse } from 'axios';

interface IJwt {
     username: string;
     role: Role;
     schoolId: string;
     iat: number;
     exp: number;
}

export const getAccessToken = async (refreshToken: string | undefined) => {
     try {
          if (refreshToken) {
               const cookieStore = await cookies()
               const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {}, {
                    headers: {
                         Authorization: `Bearer ${refreshToken}`
                    }
               })
               if (response.status === 201) {
                    const accessToken: string | null = response.data.accessToken;
                    const refreshToken: string | null = response.data.refreshToken;

                    if (accessToken && refreshToken) {
                         const accessTokenExpiration = 60 * 60;
                         const refreshTokenExpiration = 7 * 24 * 60 * 60;

                         cookieStore.set('accessToken', accessToken, { maxAge: accessTokenExpiration });
                         cookieStore.set('refreshToken', refreshToken, { maxAge: refreshTokenExpiration });
                    }
               }
          }
     } catch (error) {
          console.log('error')
     }
};

export async function decrypt(token: string | undefined = '') {
     try {
          const payload = await jwtDecode<IJwt>(token)
          return payload
     } catch (error) {
          console.log('Failed to verify session')
     }
}

export async function createSession(accessToken: string, refreshToken: string) {
     const cookieStore = await cookies()

     cookieStore.set('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60
     })

     cookieStore.set('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 7 * 24 * 60 * 60
     })
}

export async function updateSession() {
     const cookieStore = await cookies()

     const refreshToken = cookieStore.get('refreshToken')?.value  
     const payload = decrypt(refreshToken)

     if(!payload && !refreshToken){
          return null
     }else{
          await getAccessToken(refreshToken)
     }
}

export async function deleteSession() {
     const cookieStore = await cookies()
     cookieStore.delete('accessToken')
     cookieStore.delete('refreshToken')
}

export async function getToken() {
     const cookieStore = await cookies()
     return cookieStore.get('accessToken')?.value
}