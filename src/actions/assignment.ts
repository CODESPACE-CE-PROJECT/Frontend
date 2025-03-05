"use server";

import axios, { AxiosResponse } from "axios";
import { ICreateAssignment, IUpdateLock } from "@/types/assignment";
import { getToken } from "@/lib/session";

export const getAssignment = async (courseId: string) => {
  const token = await getToken();

  if (token) {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

export const getAssignmentscore = async (courseId: string) => {
  const token = await getToken();

  if (token) {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}/score`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

export const createAssignment = async (formData: ICreateAssignment) => {
  const token = await getToken();

  if (!token) {
    alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
    return;
  }

  if (new Date(formData.expireAt) <= new Date(formData.startAt)) {
    alert("Expire date must be later than start date.");
    return;
  }

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment`,
    {
      courseId: formData.courseId,
      title: formData.title,
      type: formData.type,
      announceDate: new Date(new Date(formData.announceDate).toUTCString()),
      startAt: new Date(new Date(formData.startAt).toUTCString()),
      expireAt: new Date(new Date(formData.expireAt).toUTCString()),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  
  const token = await getToken();
  
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${assignmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  
  
  return response.data.data;

};


export const UpdatedLockAssignment = async (assignmentData: IUpdateLock) => {
  const token = await getToken();
  if (token) {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${assignmentData.assignmentId}/${assignmentData.isLock}`,
      {
        isLock: assignmentData.isLock,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
