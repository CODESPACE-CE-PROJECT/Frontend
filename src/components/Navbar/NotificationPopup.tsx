'use client'
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { NotiPopupItem } from "@/components/Navbar/NotiPopupItem";
import { createUserNotification, getNotification } from "@/actions/notification";
import { useEffect, useRef, useState } from "react";
import { INotification } from "@/types/notification";
export const NotificationPopup = () => {
     const [isOpen, setIsOpen] = useState<boolean>(false);
     const [notifications, setNotifications] = useState<INotification[]>();
     const notiPopupRef = useRef<HTMLDivElement>(null);

     const handleClickOutside = (event: MouseEvent) => {
          if (notiPopupRef.current && !notiPopupRef.current.contains(event.target as Node)) {
               setIsOpen(false);
          }
     };

     useEffect(() => {
          const fetchNotification = async () => {
               const { data } = await getNotification();
               setNotifications(data);
          }
          fetchNotification();
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [])

     const handleCloseNotification = async (notificationId: string) => {
          const { status } = await createUserNotification(notificationId);
          if (status === 200) {
               setNotifications(prev => prev?.filter((item) => item.notificationId !== notificationId))
               const { data } = await getNotification();
               setNotifications(data);
          }
     }

     return (
          <div className="relative" ref={notiPopupRef}>
               <button className="hover:text-gray-300 rounded-md" onClick={() => setIsOpen(prev => !prev)}>
                    <NotificationsNoneIcon fontSize="large" />
               </button>

               {
                    notifications?.length !== 0 &&
                    <div className="absolute top-2 right-2 size-2 bg-[#EF4343] rounded-full" />
               }
               {
                    isOpen &&
                    <div className="absolute top-10  z-50 w-fit right-0 bg-pure-white rounded-2xl ">
                         <div className="text-black text-base p-4 flex flex-col gap-y-3 max-h-[400px] overflow-y-auto px-4">
                              {
                                   notifications?.length === 0 ? <p className="text-nowrap text-[#808080]">ไม่มีการแจ้งเตือน</p> :
                                        notifications?.map((item) => <NotiPopupItem data={item} key={item.notificationId} onClose={handleCloseNotification} />)
                              }
                         </div>
                    </div>
               }
          </div>
     )
}