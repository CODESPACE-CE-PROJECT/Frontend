import Image from "next/image";
import SchoolPlaceholder from "@/assets/placeholder/school-placeholder.svg"
import { OptionTrash } from "../Options/OptionTrash";
import { ISchools } from "@/types/school";
import { Role } from "@/enum/enum";
import { IProfile } from "@/types/user";
import { getAvatar } from "@/utils/gender.util";

interface Props {
     school: ISchools[] | undefined,
     user: IProfile[] | undefined,
     onClickOption: (name: string, type: string, id: string) => void
}


export const TrashTable: React.FC<Props> = ({ school, user, onClickOption }) => {
     return (
          <div className="w-full">
               <div className="table w-full rounded-xl">
                    <div className="table-header-group bg-[#3049724D] w-full">
                         <div className="table-row text-xl font-medium">
                              <div className="table-cell text-left align-middle rounded-l-xl px-8 py-4">ชื่อ</div>
                              <div className="table-cell text-left align-middle py-4">ที่ตั้ง</div>
                              <div className="table-cell text-center align-middle p-4">ประเภท</div>
                              <div className="table-cell text-center align-middle rounded-r-xl py-4" />
                         </div>
                    </div>

                    <div className="table-row-group w-full">
                         <div className="table-row w-full">
                              <div className="table-cell align-middle py-2" />
                         </div>

                         {
                              school?.map((item) => (
                                   <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center" key={item.schoolId}>
                                        <div className="table-cell align-middle px-8 py-4">
                                             <div className="flex flex-col lg:flex-row items-center gap-x-4">
                                                  <Image
                                                       src={item.pictureUrl || SchoolPlaceholder}
                                                       alt="school logo"
                                                       width={60}
                                                       height={60}
                                                       className="object-cover size-16 rounded-full"
                                                  />
                                                  <p className="text-center">{item.schoolName}</p>
                                             </div>
                                        </div>
                                        <div className="table-cell align-middle py-4 text-left">
                                             {item.address} {item.subDistrict} {item.district} {item.province} {item.postCode}
                                        </div>
                                        <div className="table-cell align-middle p-4">โรงเรียน</div>
                                        <div className="table-cell align-middle p-4">
                                             <div className="flex justify-center items-center">
                                                  <OptionTrash onClick={(name) => onClickOption(name, "school", item.schoolId)}/>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         }
                         {
                              user?.map((item) => (
                                   <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center" key={item.username}>
                                        <div className="table-cell align-middle px-8 py-4">
                                             <div className="flex flex-col lg:flex-row items-center gap-x-4">
                                                  <Image
                                                       src={getAvatar(item.gender)}
                                                       alt="school logo"
                                                       width={60}
                                                       height={60}
                                                       className="object-cover size-16 rounded-full"
                                                  />
                                                  <p className="text-center">{item.firstName} {item.lastName}</p>
                                             </div>
                                        </div>
                                        <div className="table-cell align-middle py-4 text-left">
                                             -
                                        </div>
                                        <div className="table-cell align-middle text-center p-4">{item.role === Role.TEACHER ? 'ผู้สอน' : 'ผู้เรียน'}</div>
                                        <div className="table-cell align-middle p-4">
                                             <div className="flex justify-center items-center">
                                                  <OptionTrash onClick={(name) => onClickOption(name, "user", item.username)} />
                                             </div>
                                        </div>
                                   </div>
                              ))
                         }
                    </div>
               </div>
          </div>
     );
}