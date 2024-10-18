import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';


export const getProfile = async () => {
  const token: string | undefined = Cookies.get('accessToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`);
    return response.data;
  }
};



export const getAllCourseById = async (schoolId: string): Promise<any | null> => {
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
    console.error("Error creating course:", error.response?.data || error.message);
    throw error;
  }
};
