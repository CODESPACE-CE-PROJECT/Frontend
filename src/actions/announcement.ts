"use server";

import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/session";
import { ICreateAnnounce, ICreateReply } from "@/types/courseAnnounce";

export const createReplyAnnounce = async (formData: ICreateReply) => {
  const token = await getToken();
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/announce/reply`, formData, {
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

export const createAnnonuncement = async (formData: ICreateAnnounce) => {
  const token = await getToken();
  return await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/announce`, formData, {
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
}