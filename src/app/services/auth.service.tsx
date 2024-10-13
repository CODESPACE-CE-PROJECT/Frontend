import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const login = async (username: string, password: string) => {
     const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          username: username,
          password: password
     });
     if (response.status === 201) {
          const token: string | null = response.data.accessToken
          if (token) {
               Cookies.set('accessToken', token)
          }
     }
     return response
}


export const logout = async () => {
     try {
          const response: AxiosResponse = await axios.get(
               `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
               {
                    headers: {
                         Authorization: `Bearer ${Cookies.get('accessToken')}`
                    }
               }
          );

          if (response.status === 200) {
               Cookies.remove('accessToken');
          }

          return response;
     } catch (error) {
          console.error('Logout failed:', error);
          throw new Error('Logout failed');
     }
};
