import axios from "axios"
import Cookies from "js-cookie"

export const getDashboardInfo = async () => {
     try {
          return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,{
               headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
               }
          }).then((res) => res.data.data)
     } catch (error) {
         console.log(error)
     }
}