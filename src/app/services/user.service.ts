import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { IProfile } from "../interfaces/user.interface";

export const getProfile = async () => {
  const token = Cookies.get('accessToken')
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`
    );
    return response.data.data;
  }
};

export const editProfile = async (profileData: IProfile) => {
  const token = Cookies.get('accessToken')

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          studentNo: profileData.studentNo,
          gender: profileData.gender
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  } else {
    throw new Error("No access token found");
  }
};


export const uploadProfilePicture = async (picture: File) => {
  const token = Cookies.get('accessToken')
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          picture: picture
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error
    }
  }
}

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