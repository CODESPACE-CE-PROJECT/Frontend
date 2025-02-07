import Image from "next/image"
import SchoolPlaceholder from "@/assets/placeholder/school-placeholder.svg"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { ISchool } from "@/types/school";
import { textPackage } from "@/utils/text.util";

interface Prop {
     data?: ISchool
}

export const SchoolCard: React.FC<Prop> = ({ data }) => {
     return <div className="bg-table-header rounded-xl py-5 px-9">
          <div className="flex flex-row items-center justify-between">
               <div className="flex flex-row items-center gap-x-12">
                    <Image
                         src={data?.pictureUrl || SchoolPlaceholder}
                         alt="school logo"
                         width={140}
                         height={140}
                         className="object-cover"
                         priority={true}
                    />
                    <div className="flex flex-col items-start gap-y-4">
                         <div className="border-[1px] border-blackground-text py-2 px-3 rounded-md">
                              {
                                   textPackage(data?.package)
                              }
                         </div>
                         <p className="text-2xl font-semibold">{data?.schoolName}</p>
                         <p className="text-xl">{data?.address} {data?.subDistrict} {data?.district} {data?.province} {data?.postCode}</p>
                         <div className="flex flex-row gap-x-4 items-center text-lg">
                              <p>ผู้สอน 2 คน</p>
                              <CircleIcon fontSize="small" />
                              <p>ผู้เรียน 1 คน</p>
                         </div>
                    </div>
               </div>
               <div className="self-start hover:text-primary cursor-pointer">
                    <ModeEditOutlineOutlinedIcon />
               </div>
          </div>
     </div>
}