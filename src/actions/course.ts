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
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    courseData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => {
    return {
      status: res.status,
      data: res.data.data,
    };
  }).catch((e: AxiosError) => {
    return {
      status: e.response?.status,
      data: e.response?.data,
    }
  });
};

export const uploadCoursePicture = async (courseId: string, picture: File) => {
  const token = await getToken();
  const formData = new FormData();
  formData.append("picture", picture);  
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  ).then((res) => {
    return {
      status: res.status,
      data: res.data.data,
    }
  }).catch((e: AxiosError) => {
    return {
      status: e.response?.status,
      data: e.response?.data,
    }
  });
};

export const createCourse = async (formData: FormData) => {
  const token = await getToken();
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  ).then((res) => ({
    status: res.status,
    data: res.data.data
  })
  ).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }));
};

export const deleteCoursesById = async (courseId: string) => {
  const token = await getToken();
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => {
    return {
      status: res.status,
      data: res.data.data,
    };
  }).catch((e: AxiosError) => {
    return {
      status: e.response?.status,
      data: e.response?.data,
    };
  });
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

export const deletePeopleByCoursesId = async (
  courseId: string,
  username: string
) => {
  const token = await getToken();

  return await axios
    .delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/user/${username}`,
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
        status: e.response?.status,
        data: e.response?.data,
      };
    });
};

