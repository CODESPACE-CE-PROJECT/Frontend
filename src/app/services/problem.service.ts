import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const getProblemById = async (problemId: string) => {
     const token: string | undefined = Cookies.get("accessToken");
   
     if (!problemId) {
       console.error("No courseId provided.");
       return null;
     }
   
     if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
       try {
         const response: AxiosResponse = await axios.get(
           `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${problemId}`
         );
         return response.data;
       } catch (error) {
         console.error("Error fetching assignment:", error);
         return null;
       }
     } else {
       console.error("No access token found.");
       return null;
     }
   };