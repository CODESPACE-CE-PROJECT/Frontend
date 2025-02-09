import { Role, Gender, PackageType } from '@/enum/enum'

export type IProfile = {
  username: string,
  email: string,
  studentNo: string,
  firstName: string,
  lastName: string,
  gender: Gender,
  role: Role,
  pictureUrl: string,
  IpAddress: string,
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

export type ICreateUser = {
  role?: Role,
  studentNo?: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  gender?: Gender
}