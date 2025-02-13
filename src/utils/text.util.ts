import { PackageType, Role } from "../enum/enum"

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

export const getRole = (role: Role|undefined) => {
     if(role === Role.ADMIN){
          return "admin"
     }else if(role === Role.TEACHER){
          return "teacher"
     }else if(role === Role.STUDENT){
          return "student"
     }else{
          return null
     }
}

export const getRoleInThai = (role: Role | undefined) => {
     if(role === Role.ADMIN){
          return "ผู้ดูแลระบบ"
     }else if(role === Role.TEACHER){
          return "ผู้สอน"
     }else if(role === Role.STUDENT){
          return "ผู้เรียน"
     }
}