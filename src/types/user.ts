import { Role, Gender, PackageType, ValidateType } from '@/enum/enum'

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
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: Gender;
  role: Role;
  studentNo?: string;
}

export type IUpdateUser = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: Gender;
  role: Role;
  studentNo?: string;
  picture?: File | null;
  pictureUrl?: string
}

export type IFileFormat = {
  studentId: string,
  firstname: string,
  lastname: string,
  gender: Gender,
  username: string,
  email: string,
  role: Role,
  validateType: ValidateType
}