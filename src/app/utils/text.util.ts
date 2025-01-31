export const textActivedUser = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "ปิดการใช้งานชั่วคราว"
     }else if(isActived){
          return "ออนไลน์"
     }else {
          return "ออฟไลน์"
     }
}