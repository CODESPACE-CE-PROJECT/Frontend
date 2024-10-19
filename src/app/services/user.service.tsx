import axios, { AxiosError, AxiosResponse } from 'axios';

import Cookies from 'js-cookie';


export const getProfile = async () => {
  const token: string | undefined = Cookies.get('accessToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`);
    return response.data;
  }
};


export const editProfile = async (profileData: object) => {
  const token: string | undefined = Cookies.get('accessToken');
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    try {
      const response: AxiosResponse = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/edit`, profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Re-throw the error for handling it later
    }
  } else {
    throw new Error("No access token found");
  }
};





export const getAllCourseById = async (): Promise<any | null> => {
  const token: string | undefined = Cookies.get('accessToken'); 
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/school/myid`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return null; 
    }
  }
  return null; 
};



export const createCourse = async (formData: { title: string; description: string }) => {
  try {
    const token: string | undefined = Cookies.get('accessToken');

    if (!token) {
      alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
      return;
    }


    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
      {
        title: formData.title,
        description: formData.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error creating course:", axiosError.response?.data || axiosError.message);
    throw error;
  }
};
