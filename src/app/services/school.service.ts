import axios from "axios"
import Cookies from "js-cookie"

export const getAllSchool = async () => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school`,{
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }).then((res) => res.data.data)
     } catch (error) {
         console.log(error) 
     }
}

export const getSchoolById = async (id:string) => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/${id}`,{
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
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/school/bin`,{
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }).then((res) => res.data.data)
     } catch (error) {
         console.log(error) 
     }
}

export const getProvinceData = async () => {
     try {
          return await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json',{
          }).then((res) => res.data)
     } catch (error) {
         console.log(error) 
     }
}