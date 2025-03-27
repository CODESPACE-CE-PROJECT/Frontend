import { NotificationType } from "@/enum/enum";
import { ICourse } from "@/types/course";

export type INotification = {
  notificationId: string;
  username: string;
  courseId: string;
  course: ICourse;
  type: NotificationType;
  detail: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    pictureUrl: string | null;
  };
}