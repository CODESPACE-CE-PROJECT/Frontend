"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "@/lib/session";

export const getAllCourse = async (): Promise<any | null> => {
  const token = await getToken()
  if (token) {
      return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.data).catch((err) => err);
  }
}


export const getpeople = async (courseId: string) => {
  const token = await getToken()
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/people`
    );
    return response.data.data;
  }
  throw new Error("No token available");
};

export const getCoursesById = async (courseId: string) => {
  const token = await getToken();
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
};

export const editCourse = async (courseId: string, courseData: any) => {
  const token = await getToken();

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
        {
          title: courseData.title,
          description: courseData.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating Course:", error);
      throw error;
    }
  } else {
    throw new Error("No access token found");
  }
};

export const uploadCoursePicture = async (courseId:string, picture: File) => {
  const token = getToken()
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
        {
          picture: picture,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
};

export const createCourse = async (formData: {
     title: string;
     description: string;
   }) => {
     try {
       const token = getToken()
   
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
