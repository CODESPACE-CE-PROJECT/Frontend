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
