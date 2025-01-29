import { PackageType } from "../enum/enum"
import { IProfile } from "./user.interface"

export interface ISchools {
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

export interface ISchool extends ISchools{
     users: IProfile[]
}

export interface ISchoolBin {
     school: ISchools[],
     user: IProfile[]
}

export interface IProvince {
     id: number,
     created_at: Date,
     deleted_at: Date,
     geography_id: number,
     name_en: string,
     name_th: string,
     updated_at: Date,
     amphure: {
          create_at: Date,
          delete_at: Date,
          id: number,
          name_en: string,
          name_th: string,
          province_id: number,
          updated_at: Date,
          tambon: {
               amphure_id: number,
               create_at: Date,
               delete_at: Date,
               id: number,
               name_en: string,
               name_th: string,
               updated_at: Date
               zip_code: number
          }[]
     }[]
}