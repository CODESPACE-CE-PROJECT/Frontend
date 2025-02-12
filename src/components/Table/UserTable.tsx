import Image from "next/image";
import { getAvatar } from "@/utils/gender.util";
import { OptionUser } from "@/components/Options/OptionUser";
import CircleIcon from "@mui/icons-material/Circle";
import { textStatusActiveColor, borderStatusActiveColor } from "@/utils/color.util";
import { textActivedUser } from "@/utils/text.util";
import { IProfile } from "@/types/user";

interface Props {
     title: string
     data?: IProfile[],
     onClickOption: (name: string, username:string, allowLogin: boolean | null) => void
}

export const UserTable:React.FC<Props> = ({title, data, onClickOption}) => {
     return (
          <div className="w-full">
               <div className="table w-full rounded-xl">
                    <div className="table-header-group bg-[#3049724D] w-full">
                         <div className="table-row text-xl font-medium">
                              <div className="table-cell text-left align-middle rounded-l-xl px-8 py-4">{title}</div>
                              <div className="table-cell text-center align-middle rounded-r-xl py-4 text-transparent">.</div>
                         </div>
                    </div>

                    <div className="table-row-group w-full">
                         <div className="table-row w-full">
                              <div className="table-cell align-middle py-2" />
                         </div>
                         {data?.map((item) => (
                              <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center" key={item.username}>
                                   <div className="table-cell align-middle px-8 py-4">
                                        <div className="flex flex-col lg:flex-row items-center gap-x-6">
                                             <Image
                                                  src={item.pictureUrl || getAvatar(item.gender)}
                                                  alt="avatar"
                                                  width={60}
                                                  height={60}
                                                  className="object-cover"
                                             />
                                             <div className="flex flex-col items-start">
                                                  <p className="text-center text-xl">{item.firstName} {item.lastName}</p>
                                                  <p className="text-cente text-smr">{item.email}</p>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="table-cell align-middle text-end p-4 ">
                                        <div className="flex flex-row justify-end items-center w-full gap-x-4">
                                             <p className={`py-2 font-normal px-3 text-center flex items-center ${textStatusActiveColor(item.isActived, item.allowLogin)} justify-center gap-2 border-2 ${borderStatusActiveColor(item.isActived, item.allowLogin)} rounded-md`}>
                                                  <CircleIcon /> {textActivedUser(item.isActived, item.allowLogin)}
                                             </p>
                                             <OptionUser allowLogin={item.allowLogin} onClick={(name, allowLogin) => onClickOption(name,item.username, allowLogin)}/>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}