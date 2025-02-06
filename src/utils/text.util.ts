import { PackageType } from "../enum/enum"

export const textActivedUser = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "ปิดการใช้งานชั่วคราว"
     }else if(isActived){
          return "ออนไลน์"
     }else {
          return "ออฟไลน์"
     }
}

export const textPackage = (packageType: PackageType | undefined) => {
    if(packageType === PackageType.PREMIUM){
     return "Premium"
    }else{
     return "Standard"
    } 
}