import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const getAllCourse = async (): Promise<any | null> => {
  const token = Cookies.get("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`
      );
      console.log("Course Data:", response.data); // Log the response to see its structure
      return response.data; // Ensure this includes the courseId
    } catch (error) {
      console.error("Error fetching courses:", error);
      return null;
    }
  }
  return null;
};

export const getpeople = async (courseId: string) => {
  const token = Cookies.get("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}/people`
    );
    return response.data;
  }
  throw new Error("No token available");
};

export const getCoursesById = async (courseId: string) => {
  const token: string | undefined = Cookies.get("accessToken");

  if (!courseId) {
    //  console.error("No courseId provided.");
    return null;
  }

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  } else {
    console.error("No access token found.");
    return null;
  }
};

export const editCourse = async (courseId: string, courseData:any) => {
  const token = Cookies.get("accessToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
        {
          title: courseData.title,
          description: courseData.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating Course:", error);
      throw error;
    }
  } else {
    throw new Error("No access token found");
  }
};

export const uploadCoursePicture = async (courseId:string, picture: File) => {
  const token = Cookies.get('accessToken')
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
        {
          picture: picture
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error
    }
  }
}

export const createCourse = async (formData: {
     title: string;
     description: string;
   }) => {
     try {
       const token = Cookies.get('accessToken')
   
       if (!token) {
         alert("คุณไม่ได้รับอนุญาต โปรดเข้าสู่ระบบ");
         return;
       }
   
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
       const response: AxiosResponse = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
         {
           title: formData.title,
           description: formData.description,
         },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
   
       return response.data;
     } catch (error) {
       throw error;
     }
   };
