"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "@/lib/session";
import { IAddPeopleToCourse } from "@/types/course";

export const getAllCourse = async () => {
  const token = await getToken();
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data.data,
      };
    })
    .catch((err: AxiosError) => {
      return {
        status: err.status,
        data: err.response?.data,
      };
    });
};

export const getpeople = async (courseId: string) => {
  const token = await getToken();
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/people`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
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

export const editCourse = async (courseId: string, courseData: FormData) => {
  const token = await getToken();

  if (!token) {
    throw new Error("No access token found");
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const response: AxiosResponse = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    courseData, // ใช้ `FormData` แทน JSON
    {
      headers: {
        "Content-Type": "multipart/form-data", // เปลี่ยนเป็น `multipart/form-data`
      },
    }
  );
  return response.data.data;
};

export const uploadCoursePicture = async (courseId: string, picture: File) => {
  const token = await getToken();
  if (!token) throw new Error("No access token found");

  const formData = new FormData();

  formData.append("picture", picture);
  const response: AxiosResponse = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const createCourse = async (formData: FormData) => {
  const token = await getToken();
  if (!token) {
    alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
    return;
  }

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteCoursesById = async (courseId: string) => {
  const token = await getToken();

  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const addPeopleToCourse = async (formData: IAddPeopleToCourse) => {
  const token = await getToken();

  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return {
        status: res.status,
        data: res.data.data,
      };
    })
    .catch((e: AxiosError) => {
      return {
        status: e.response?.status,
        data: e.response?.data,
      };
    });
};
