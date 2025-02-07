import { Gender } from "@/enum/enum";
import ManAvatart from "@/assets/placeholder/man-avatar.svg"
import WomanAvatar from "@/assets/placeholder/woman-avatar.svg"
import OtherAvatar from "@/assets/placeholder/other-avatar.svg"

export const getAvatar = (gender: Gender) => {
     if(gender === Gender.MALE){
          return ManAvatart
     }else if(gender === Gender.FEMALE){
          return WomanAvatar
     } else {
          return OtherAvatar
     }
}