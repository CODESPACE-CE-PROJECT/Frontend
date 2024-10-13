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

export const createCourse = async (formData: String) => {
     try {
       const response = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
         {
           title: formData,
           description: formData
         },
         {
           headers: {
             "Content-Type": "application/json", 
           },
         }
       );
       return response.data;
     } catch (error) {
       console.error("Error creating course:", error.response?.data || error.message);
       throw error; 
     }
   };