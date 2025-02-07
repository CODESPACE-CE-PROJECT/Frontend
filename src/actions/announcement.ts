import axios, { AxiosResponse } from "axios";

import Cookies from "js-cookie";

export const getCoursesById = async (courseId: string) =>  {
  try {
       return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`, {
            headers: {
                 Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
       }).then((res) => res.data.data)
  } catch (error) {
       console.log(error)
  }
}