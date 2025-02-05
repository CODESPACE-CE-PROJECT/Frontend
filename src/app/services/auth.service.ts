import axios from 'axios';
import { IAuth, IResponseAuth } from '../interfaces/auth.interface';
import Cookies from 'js-cookie';

export const login = async (formData: IAuth) => {
     return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, formData).then(
          (res) => {
               if (res.status === 201) {
                    const token: IResponseAuth = res.data
                    if (token.accessToken && token.refreshToken) {
                         Cookies.set('accessToken', token.accessToken, { expires: 1 })
                         Cookies.set('refreshToken', token.refreshToken, { expires: 7 })
                    }
               }
          }
     );
};

export const logout = async () => {
     return await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
          {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }
     ).then(() => {
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
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
