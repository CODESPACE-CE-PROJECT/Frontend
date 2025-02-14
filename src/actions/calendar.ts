import { getToken } from "@/lib/session";
import axios, { AxiosResponse } from "axios";

export const GetAllAssignmentForCalendar = async () => {
  const token = await getToken()
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
