import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const getAssignment = async (courseId: string) => {
  const token = Cookies.get('accessToken'); // Retrieve the token from cookies
  
  if (!courseId) {
    //  console.error("No courseId provided.");
     return null;
   }

  if (token) {
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
    
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}`
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
  const token = Cookies.get('accessToken');

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

export const createAssignment = async (formData: {
  courseId: string;
  title: string;
  type: "EXERCISE" | "EXAMONSITE" | "EXAMONLINE";
  announceDate: string; 
  startAt: string;
  expireAt: string;
}) => {
  try {
    const token = Cookies.get("accessToken");
    console.log(formData)
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
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response?.data || error.response);
      console.error("Axios Error Message:", error.message);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
};
