import { Gender, ValidType } from "@/enum/enum"
import { IFileFormat } from "@/types/user"
import { getRoleInThai } from "@/utils/text.util"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface Props {
     data: IFileFormat,
     onClick?: (index: number|undefined) => void,
     index?: number
}

export const RowUserItem: React.FC<Props> = ({ data, onClick, index }) => {
     const backgroundColor = (validType: ValidType) => {
          if (validType === ValidType.EXIST) {
               return 'bg-[#EF4343]'
          } else if (validType === ValidType.DUPLICATE) {
               return 'bg-[#FF9000]'
          } else {
               return ''
          }
     }
     return <>
          <div className={`table-row w-full text-center ${backgroundColor(data.validType)} bg-opacity-10 gap-y-4 text-xl`}>
               <div className="table-cell align-middle px-8 py-4 rounded-l-xl">{data.studentId}</div>
               <div className="table-cell align-middle px-8 p-4">{data.firstname}</div>
               <div className="table-cell align-middle px-8 p-4">{data.lastname}</div>
               <div className="table-cell align-middle px-8 p-4">{data.gender === Gender.MALE ? 'ชาย' : data.gender === Gender.FEMALE ? 'หญิง' : 'อื่น ๆ'}</div>
               <div className="table-cell align-middle px-8 p-4">{data.username}</div>
               <div className="table-cell align-middle px-8 p-4">{data.email}</div>
               <div className="table-cell align-middle px-8 p-4">{getRoleInThai(data.role)}</div>
               <div className="table-cell align-middle px-8 p-4 rounded-r-xl">
                    {
                         data.validType === ValidType.NOTEXIST ? (
                              <div className="flex flex-row items-center  gap-x-2 justify-start text-green-l">
                                   <CheckCircleOutlineIcon />
                                   <p>สามารถเพิ่มได้</p>
                              </div>
                         ) : data.validType === ValidType.DUPLICATE ? (
                              <div className="flex flex-row items-center gap-x-7 justify-start text-[#FF9000]">
                                   <div className="flex flex-row items-center gap-x-2">
                                        <CancelOutlinedIcon />
                                        <p>รายชื่อซ้ำจากไฟล์</p>
                                   </div>
                                   <div className="hover:underline cursor-pointer" onClick={() => onClick && onClick(index)}>ลบ</div>
                              </div>
                         ) : <div className="flex flex-row items-center gap-x-7 justify-start text-[#EF4343]">
                              <div className="flex flex-row items-center gap-x-2">
                                   <CancelOutlinedIcon />
                                   <p>รายชื่อซ้ำในระบบ</p>
                              </div>
                              <div className="hover:underline cursor-pointer" onClick={() => onClick && onClick(index)}>ลบ</div>
                         </div>
                    }
               </div>
          </div>
          <div className="table-row w-full">
               <div className="table-cell align-middle py-2" />
          </div>
     </>
}