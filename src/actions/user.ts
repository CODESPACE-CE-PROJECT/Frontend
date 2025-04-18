"use server"

import axios, { AxiosError, AxiosResponse } from "axios";
import { ICreateUser, IProfile, IUpdatePassword, IUpdateUser } from "@/types/user";
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
  return await axios
    .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      {
        email: profileData.email,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        studentNo: profileData.studentNo,
        gender: profileData.gender,
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => ({
      status: res.status,
      data: res.data
    })).catch((err: AxiosError) => ({
      status: err.status,
      data: err.response?.data
    }));
};

export const uploadProfilePicture = async (picture: File) => {
  const token = await getToken();
  const formData = new FormData()
  formData.append('picture', picture)
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, 
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
  ).then((res) => ({
    status: res.status,
    data: res.data
  })).catch((err: AxiosError) => ({
    status: err.status,
    data: err.response?.data
  }));
};

export const setEnableUserByUsername = async (username: string, isEnable: boolean) => {
  const token = await getToken()
  return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`, {
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
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}


export const deleteUserByUsername = async (username: string) => {
  const token = await getToken()
  return await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
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
}

export const setAllowLoginByUsername = async (username: string, allowLogin: boolean) => {
  const token = await getToken()
  return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`, {
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
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}

export const createUserBySchoolId = async (schoolId: string, createForm: ICreateUser) => {
  const token = await getToken()
  return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    schoolId: schoolId,
    users: [
      {
        ...createForm
      }
    ]
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
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}

export const createMultipleUserBySchoolId = async (schoolId: string, createForm: ICreateUser[]) => {
  const token = await getToken()
  return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    schoolId: schoolId,
    users: createForm
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
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}

export const getUserByUsername = async (username: string) => {
  const token = await getToken()
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
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
}

export const updateUserByUsername = async (updateForm: IUpdateUser) => {
  const token = await getToken()

  if (updateForm.picture) {
    const formData = new FormData()
    formData.append('picture', updateForm.picture as File)
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${updateForm.username}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${updateForm.username}`, {
    updateForm
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
    return {
      status: e.status,
      data: e.response?.data
    }
  })
}

export const importFileExel = async (file: File) => {
  const token = await getToken()
  const formData = new FormData()
  formData.append('file', file)

  return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/file`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
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
}

export const updatePassword = async (updateForm: IUpdatePassword) => {
  const token = await getToken();

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/update-password`,
    updateForm,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  ).then((res) => {
    return {
      status: res.status,
      data: res.data,
    }
  }).catch((err: AxiosError) => {
    return {
      status: err.status,
      data: err.response?.data
    }
  });
};
