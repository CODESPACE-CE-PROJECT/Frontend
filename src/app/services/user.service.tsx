import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const getProfile = async () => {
     const token: string | undefined = Cookies.get('accessToken')
     if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`);
          return response.data;
     }
}
