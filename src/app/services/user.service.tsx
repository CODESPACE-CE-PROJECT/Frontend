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

// ฟังก์ชันสำหรับสร้างหลักสูตร
export const createCourse = async (formData: { title: string; description: string }) => {
  try {
    const token: string | undefined = Cookies.get('accessToken');

    if (!token) {
      alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
      return;
    }

    // ตั้งค่าโทเค็นใน header แบบเดียวกับ getProfile
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
