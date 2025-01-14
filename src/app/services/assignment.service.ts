import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const getAssignment = async (courseId: string) => {
  const token = Cookies.get('accessToken'); // Retrieve the token from cookies
  
  if (token) {
    // Set the Authorization header with the token if it's available
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      // Make the request with the provided courseId
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/${courseId}`
      );
      return response.data;  // Return the assignment data if successful
    } catch (error) {
      // Log error if request fails
      console.error("Error fetching assignment:", error);
      return null;
    }
  } else {
    // Log error if token is not found
    console.error("No access token found.");
    return null;  // Return null if there's no token
  }
};
