import { toast, Bounce, Id, TypeOptions } from 'react-toastify';
import { NotifyType } from '@/enum/enum';

export const notify = (type: NotifyType, text: string) => {
     if (type === NotifyType.SUCCESS) {
          toast.success(text, {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Bounce,
          });
     } else if (type === NotifyType.ERROR) {
          toast.error(text, {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "light",
               transition: Bounce,
          });
     } else if (type === NotifyType.WARNING) {
          toast.warn(text, {
               position: "top-center",
               hideProgressBar: true,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: false,
               progress: undefined,
               theme: "light",
               transition: Bounce,
          });
     } else if (type === NotifyType.LOADING) {
          return toast.loading(text, {
               position: "top-center",
               transition: Bounce,
               theme: 'light',
               draggable: false,
               pauseOnHover: false,
               hideProgressBar: false,
          })
     }
}

export const updateNotify = (id: Id, type: NotifyType, text: string) => {
     let textType: TypeOptions = "warning"

     if (type === NotifyType.SUCCESS) {
          textType = "success"
     } else if (type === NotifyType.ERROR) {
          textType = "error"
     } else if (type === NotifyType.WARNING) {
          textType = "warning"
     }

     toast.update(id, {
          render: text,
          isLoading: false,
          type: textType,
          autoClose: 3000,
          position: "top-center",
          transition: Bounce,
          theme: 'light',
          draggable: false,
          pauseOnHover: false,
          hideProgressBar: false,
     })
}