import Image from "next/image";
import SchoolPlaceholder from "@/assets/placeholder/school-placeholder.svg"
import { OptionTrash } from "../Options/OptionTrash";

export const TrashTable = () => {
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
                         {Array.from({length: 10}).map((item, index) => (
                              <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center" key={index}>
                                   <div className="table-cell align-middle px-8 py-4">
                                        <div className="flex flex-col lg:flex-row items-center gap-x-4" onClick={() => {}}>
                                             <Image
                                                  src={SchoolPlaceholder}
                                                  alt="school logo"
                                                  width={60}
                                                  height={60}
                                                  className="object-cover"
                                             />
                                             <p className="text-center">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>
                                        </div>
                                   </div>
                                   <div className="table-cell align-middle py-4 text-left">
                                   1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520
                                   </div>
                                   <div className="table-cell align-middle p-4">โรงเรียน</div>
                                   <div className="table-cell align-middle p-4">
                                        <div className="flex justify-center items-center">
                                            <OptionTrash />
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}