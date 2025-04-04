"use server"

import { IProvinceResponse, IProvince } from "../types/province"
import axios from "axios"

export const getProvinceData = async () => {
     try {
          let provinces:IProvince[] = []
          const respone: IProvinceResponse[] = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json',{
          }).then((res) => res.data)
          respone.map((province) => {
               province.amphure.map((district) => {
                    district.tambon.map((subDistrict) => {
                         provinces.push({
                              province: province.name_th,
                              district: district.name_th,
                              subDistrict: subDistrict.name_th,
                              zipCode: subDistrict.zip_code.toString()
                         })
                    })
               })
          })
          return provinces;
     } catch (error) {
         console.log(error) 
     }
}