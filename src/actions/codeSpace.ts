"use server";

import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/session";
import { ICreateCodeSpace, IUpdateCodeSpace } from "@/types/codeSpace";

export const getCodeSpace = async () => {
  const token = await getToken();
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/code-space`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
};

export const createFileCodeSpace = async (createForm: ICreateCodeSpace) => {
  const token = await getToken();
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/code-space`, createForm, {
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
        status: e.status,
        data: e.response?.data,
      };
    });
};

export const updateFileCodeSpace = async (
  codeSpaceId: string,
  updateForm: IUpdateCodeSpace
) => {
  const token = await getToken();
  return await axios
    .patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/code-space/${codeSpaceId}`,
      updateForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return {
        status: res.status,
        data: res.data.data,
      };
    })
    .catch((e: AxiosError) => {
      return {
        status: e.status,
        data: e.response?.data,
      };
    });
};

export const deleteFileCodeSpace = async (codeSpaceId: string) => {
  const token = await getToken();
  return await axios
    .delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/code-space/${codeSpaceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return {
        status: res.status,
        data: res.data.data,
      };
    })
    .catch((e: AxiosError) => {
      console.log(e.response?.data);
      return {
        status: e.status,
        data: e.response?.data,
      };
    });
};
