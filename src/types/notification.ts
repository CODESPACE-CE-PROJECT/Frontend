import { NotificationType } from "@/enum/enum";

export type INotification = {
     notificationId: string;
     username: string;
     courseId: string;
     type: NotificationType;
     detail: string;
     createdAt: string;
     user: {
       firstName: string;
       lastName: string;
       pictureUrl: string | null;
     };   
}