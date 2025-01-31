export interface IProvinceResponse {
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

export interface IProvince {
     province: string,
     district: string,
     subDistrict: string,
     zipCode: string
}