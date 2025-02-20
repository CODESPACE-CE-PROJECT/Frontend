"use server"

import { getToken } from "@/lib/session";
import { ICreateProblems } from "@/types/problem";
import axios, { AxiosError, AxiosResponse } from "axios";


export const getProblemById = async (problemId: string) => {
  const token = await getToken()
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${problemId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return {
      status: res.status,
      data: res.data.data
    }
  }).catch((e: AxiosError) => {
    return {
      status: e.status,
      data: e.response?.data
    }
  })
};

export const createProblem = async (formData: ICreateProblems) => {
  try {
    const token = await getToken();
    console.log(formData);

    if (!token) {
      alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
      return;
    }

    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response?.data || error.response);
      console.error("Axios Error Message:", error.message);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};

