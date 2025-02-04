import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const getAllCourse = async (): Promise<any | null> => {
     const token = Cookies.get('accessToken')
     if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          try {
               const response: AxiosResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`
               );
               console.log("Course Data:", response.data); // Log the response to see its structure
               return response.data; // Ensure this includes the courseId
          } catch (error) {
               console.error("Error fetching courses:", error);
               return null;
          }
     }
     return null;
};

export const getpeople = async (courseId: string) => {
     const token = Cookies.get('accessToken')
     if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
               `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/people`
          );
          return response.data;
     }
     throw new Error("No token available");
};

export const createCourse = async (formData: {
     title: string;
     description: string;
   }) => {
     try {
       const token = Cookies.get('accessToken')
   
       if (!token) {
         alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
         return;
       }
   
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
       const response: AxiosResponse = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
         {
           title: formData.title,
           description: formData.description,
         },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
   
       return response.data;
     } catch (error) {
       throw error;
     }
   };