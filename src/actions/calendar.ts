"use server";

import { getToken } from "@/lib/session";
import axios from "axios";

export const GetAllAssignmentFromCalendar = async () => {
  const token = await getToken();
  if (token) {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment/calendar/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => err);
  }
};
