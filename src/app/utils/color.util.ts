export const statusActiveColor = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "#EF4343"
     }else if(isActived){
          return "#00DACC"
     }else {
          return "#fafafa"
     }
}

export const textStatusActiveColor = (isActived: boolean, allowLogin: boolean) => {
     if(!allowLogin){
          return "text-[#EF4343]"
     }else if(isActived){
          return "text-[#00DACC]"
     }else {
          return "text-[#fafafa]"
     }
}