import axios from "axios"
import Cookies from "js-cookie"
import { ICreateSchool, IUpdateSchool } from "../interfaces/school.interface"
import { PackageType } from "../enum/enum"

export const getAllSchool = async () => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }).then((res) => res.data.data)
     } catch (error) {
          console.log(error)
     }
}

export const getSchoolById = async (id: string) => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${id}`, {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }).then((res) => res.data.data)
     } catch (error) {
          console.log(error)
     }
}

export const getSchoolBinInfo = async () => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/bin`, {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
               }
          }).then((res) => res.data.data).catch((err) => err)
     } catch (error) {
          console.log(error)
     }
}

export const createSchool = async (createForm: ICreateSchool) => {
     try {
          return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`, {
               ...createForm,
               package: createForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
               subdistrict: createForm.subDistrict
          }, {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    "Content-Type": "multipart/form-data"
               }
          }).then((res) => res.data.data)
     } catch (error) {
          console.log(error)
     }
}

export const updateSchoolById = async (updateForm: IUpdateSchool, schoolId:string) => {
     try {
          return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${schoolId}`, {
               ...updateForm,
               package: updateForm.package === "Premium" ? PackageType.PREMIUM : PackageType.STANDARD,
               subdistrict: updateForm.subDistrict,
               isEnable: true
          }, {
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    "Content-Type": "multipart/form-data"
               }
          }).then((res) => res.data.data)
     } catch (error) {
          console.log(error)
     }
}