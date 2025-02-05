import { toast, Bounce } from 'react-toastify';
import { NotifyType } from '@/app/enum/enum';

export const notify = (type: NotifyType, text: string) => {
     if (type === NotifyType.SUCCESS) {
          toast.success(text, {
               position: "top-center",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Bounce,
          });
     } else if (type === NotifyType.ERROR){
          toast.error(text, {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Bounce,
               className: 'font-sans'
          });
     } else if (type === NotifyType.WARNING){
          toast.warn(text, {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Bounce,
               className: 'font-sans'
          });
     }
}