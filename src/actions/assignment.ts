"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { ICreateAssignment, IUpdateAssignment, IUpdateLock } from "@/types/assignment";
import { getToken } from "@/lib/session";

export const getAssignmentByCourseId = async (courseId: string) => {
  const token = await getToken();
  if (token) {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.data.data);
  }
};

export const getAssignmentscore = async (courseId: string) => {
  const token = await getToken();
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}/score`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.data.data);
};

export const createAssignment = async (formData: ICreateAssignment) => {
  const token = await getToken();
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => ({
    status: res.status,
    data: res.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }));
};

export const updateAssignmentById = async (id: string, updateForm: IUpdateAssignment) => {
  const token = await getToken()
  return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${id}`, updateForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => ({
    status: res.status,
    data: res.data.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }))
}

export const deleteAssignmentById = async (assignmentId: string) => {
  const token = await getToken();
  return await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${assignmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => ({
    status: res.status,
    data: res.data.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }));
};


export const updatedLockAssignment = async (updateForm: IUpdateLock) => {
  const token = await getToken();
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${updateForm.assignmentId}/${updateForm.isLock}`,
    {
      isLock: updateForm.isLock,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => ({
    status: res.status,
    data: res.data.dat
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }));
};
