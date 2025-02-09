"use server"

import axios, { AxiosError, AxiosResponse } from "axios";
import { IProfile } from "../types/user";
import { getToken } from "@/lib/session";

export const getProfile = async () => {
  const token = await getToken();
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);
};

export const editProfile = async (profileData: IProfile) => {
  const token = await getToken();

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
          gender: profileData.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
  const token = await getToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
        {
          picture: picture,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const setEnableUserByUsername = async (username: string, isEnable: boolean) => {
  const token = await getToken()
  return axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`, {
    isEnable: isEnable
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    return {
      status: res.status,
      data: res.data.data
    }
  }).catch((e: AxiosError) => {
    console.log(e.response?.data)
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}


export const deleteUserByUsername = async (username: string) => {
  const token = await getToken()
  return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    return {
      status: res.status,
      data: res.data.data
    }
  }).catch((e: AxiosError) => {
    console.log(e.response?.data)
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}

export const setAllowLoginByUsername = async (username: string, allowLogin: boolean) => {
  const token = await getToken()
  return axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`, {
    allowLogin: allowLogin
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res) => {
    return {
      status: res.status,
      data: res.data.data
    }
  }).catch((e: AxiosError) => {
    console.log(e.response?.data)
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}