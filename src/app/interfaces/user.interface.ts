import {Role, Gender, PackageType} from '@/app/enum/enum'
export interface IProfile {
    username: string,
    email: string,
    studentNo: string,
    firstName: string,
    lastName: string,
    gender: Gender,
    role: Role,
    pictureUrl: string ,
    IpAddress: string ,
    isActived: boolean,
    allowLogin: boolean,
    isEnable: boolean,
    createdAt: Date,
    updatedAt: Date,
    schoolId: string,
    school: {
      schoolName: string,
      package: PackageType
    }
}