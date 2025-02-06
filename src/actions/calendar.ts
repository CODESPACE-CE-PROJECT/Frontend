import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const GetAllAssignmentForCalendar = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response: AxiosResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/calendar/info`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching assignment calendar:", error);
      return null;
    }
  } else {
    console.error("No access token found.");
    return null;
  }
};
