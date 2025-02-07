import { PackageType } from "../enum/enum"
import { IProfile } from "./user"

export type ISchools = {
     schoolId: string,
     schoolName: string,
     pictureUrl: string,
     package: PackageType,
     isEnable: boolean,
     address: string,
     district: string,
     subDistrict: string,
     province: string,
     postCode: string,
     updateAt: Date,
     createAt: Date,
     permission: {
          permissionId: string,
          maxCreateTeacher: number,
          maxCreateStudent: number,
          maxCreateCoursePerTeacher: number,
          canCreateUser: boolean,
          canUpdateUser: boolean,
          canDeleteUser: boolean,
          schoolId: string
     },
     count: {
          student: number,
          teacher: number
     }
}

export interface ISchool extends ISchools {
     users: IProfile[]
}

export type ISchoolBin = {
     school: ISchools[],
     user: IProfile[]
}

export type ICreateSchool = {
     schoolName?: string,
     picture?: File | null,
     package?: string,
     address: string,
     district: string,
     subDistrict: string,
     province: string,
     postCode: string,
     maxCreateTeacher?: number,
     maxCreateStudent?: number,
     maxCreateCoursePerTeacher?: number,
     canCreateUser: boolean,
     canUpdateUser: boolean,
     canDeleteUser: boolean
}

export type IUpdateSchool = {
     schoolName?: string,
     picture?: File | null,
     package?: string,
     address: string,
     district: string,
     subDistrict?: string,
     province: string,
     postCode: string,
     maxCreateTeacher?: number,
     maxCreateStudent?: number,
     maxCreateCoursePerTeacher?: number,
     canCreateUser: boolean,
     canUpdateUser: boolean,
     canDeleteUser: boolean
}