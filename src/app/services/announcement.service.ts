import axios, { AxiosResponse } from "axios";

import Cookies from "js-cookie";

export const getAnnouncement = async (courseId: string) => {
     const token: string | undefined = Cookies.get("accessToken");
   
     if (!courseId) {
       console.error("No courseId provided.");
       return null;
     }
   
     if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
       try {
         const response: AxiosResponse = await axios.get(
           `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`
         );
         return response.data;
       } catch (error) {
         console.error("Error fetching course:", error);
         return null;
       }
     } else {
       console.error("No access token found.");
       return null;
     }
   };