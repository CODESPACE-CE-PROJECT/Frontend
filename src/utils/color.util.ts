import { StateSubmission } from "@/enum/enum"

export const borderStatusActiveColor = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "border-red-l"
     }else if(isActived){
          return "border-green-l"
     }else {
          return "border-white"
     }
}

export const textStatusActiveColor = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "text-red-l"
     }else if(isActived){
          return "text-green-l"
     }else {
          return "text-white"
     }
}
