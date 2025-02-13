import { OptionSchool } from "@/components/Options/OptionSchool";
import SchoolPlaceholder from "@/assets/placeholder/school-placeholder.svg"
import Image from "next/image";
import { ISchools } from "@/types/school";
import { useRouter } from "next/navigation"
interface Props {
     schools: ISchools[] | undefined
     onClickOption: (name: string, schoolId: string) => void
}

export const SchoolTable: React.FC<Props> = ({ schools,  onClickOption}) => {
     const router = useRouter()

     return (
          <div className="w-full">
               <div className="table w-full rounded-xl">
                    <div className="table-header-group bg-[#3049724D] w-full">
                         <div className="table-row text-xl font-medium">
                              <div className="table-cell text-left align-middle rounded-l-xl px-8 py-4">ชื่อ</div>
                              <div className="table-cell text-left align-middle py-4">ที่ตั้ง</div>
                              <div className="table-cell text-center align-middle p-4">ผู้สอน</div>
                              <div className="table-cell text-center align-middle p-4">ผู้เรียน</div>
                              <div className="table-cell text-center align-middle rounded-r-xl py-4" />
                         </div>
                    </div>

                    <div className="table-row-group w-full">
                         <div className="table-row w-full">
                              <div className="table-cell align-middle py-2" />
                         </div>
                         {schools?.map((item) => (
                              <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center" key={item.schoolId}>
                                   <div className="table-cell align-middle px-8 py-4">
                                        <div className="flex flex-col lg:flex-row items-center gap-x-4 cursor-pointer hover:text-primary" onClick={() => router.push(`/admin/school/${item.schoolId}`)}>
                                             <Image
                                                  src={item.pictureUrl || SchoolPlaceholder}
                                                  alt="school logo"
                                                  width={60}
                                                  height={60}
                                                  className="object-cover"
                                             />
                                             <p className="text-center">{item.schoolName}</p>
                                        </div>
                                   </div>
                                   <div className="table-cell align-middle py-4 text-left">
                                        {item.address} {item.subDistrict} {item.district} {item.province} {item.postCode}
                                   </div>
                                   <div className="table-cell align-middle p-4">{item.count.teacher}</div>
                                   <div className="table-cell align-middle p-4">{item.count.student}</div>
                                   <div className="table-cell align-middle p-4">
                                        <div className="flex justify-center items-center">
                                             <OptionSchool onClick={(name) => onClickOption(name, item.schoolId)} />
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}
