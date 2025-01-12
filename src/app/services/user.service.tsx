import axios, { AxiosError, AxiosResponse } from "axios";

import Cookies from "js-cookie";


export const getAssignment = async (courseId: string, p0: string) => {
  const token: string | undefined = Cookies.get("accessToken");

  if (!courseId) {
    console.error("No courseId provided.");
    return null;
  }

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}`
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

export const getpeople = async (courseId: string) => {
  const token = Cookies.get("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/people`
    );
    return response.data;
  }
  throw new Error("No token available");
};



export const getProfile = async () => {
  const token: string | undefined = Cookies.get("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`
    );
    return response.data;
  }
};

export const editProfile = async (profileData: object) => {
  const token: string | undefined = Cookies.get("accessToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/edit`,
        profileData
      );
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
  const token: string | undefined = Cookies.get("accessToken");
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


export const createCourse = async (formData: {
  title: string;
  description: string;
}) => {
  try {
    const token: string | undefined = Cookies.get("accessToken");

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
    const axiosError = error as AxiosError;
    console.error(
      "Error creating course:",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
};

export const getAnnouncementsByCourseId = async (
  courseId: string
): Promise<any | null> => {
  const token: string | undefined = Cookies.get("accessToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/announce/${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      return null;
    }
  }

  return null;
};
