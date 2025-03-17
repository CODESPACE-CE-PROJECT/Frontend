"use server"

import { getToken } from "@/lib/session";
import { ICreateProblems, IUpdateProblem } from "@/types/problem";
import axios, { AxiosError } from "axios";

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
  const token = await getToken();
  console.log(formData)
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem`, 
    formData, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then((res) => ({
    status: res.status,
    data: res.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }))
};

export const updateProblemById = async (id: string, updateForm: IUpdateProblem) => {
  const token = await getToken()
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${id}`,
    updateForm,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then((res) => ({
      status: res.status,
      data: res.data.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }))
}

export const deleteProblemById = async (id: string) => {
  const token = await getToken()
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then((res) => ({
    status: res.status,
    data: res.data.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }))
}
