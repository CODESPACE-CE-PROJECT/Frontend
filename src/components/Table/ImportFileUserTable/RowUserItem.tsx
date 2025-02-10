import { Gender, ValidateType } from "@/enum/enum"
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
     const backgroundColor = (validateType: ValidateType) => {
          if (validateType === ValidateType.EXIST) {
               return 'bg-[#FF9000]'
          } else if (validateType === ValidateType.DUPLICATE) {
               return 'bg-[#EF4343]'
          } else {
               return ''
          }
     }
     return <>
          <div className={`table-row w-full text-center ${backgroundColor(data.validateType)} bg-opacity-10 gap-y-4 text-xl`}>
               <div className="table-cell align-middle px-8 py-4 rounded-l-xl">{data.studentId}</div>
               <div className="table-cell align-middle px-8 p-4">{data.firstname}</div>
               <div className="table-cell align-middle px-8 p-4">{data.lastname}</div>
               <div className="table-cell align-middle px-8 p-4">{data.gender === Gender.MALE ? 'ชาย' : data.gender === Gender.FEMALE ? 'หญิง' : 'อื่น ๆ'}</div>
               <div className="table-cell align-middle px-8 p-4">{data.username}</div>
               <div className="table-cell align-middle px-8 p-4">{data.email}</div>
               <div className="table-cell align-middle px-8 p-4">{getRoleInThai(data.role)}</div>
               <div className="table-cell align-middle px-8 p-4 rounded-r-xl">
                    {
                         data.validateType === ValidateType.NOTEXIST ? (
                              <div className="flex flex-row items-center gap-x-2 justify-center text-green-l">
                                   <CheckCircleOutlineIcon />
                                   <p>สามารถเพิ่มได้</p>
                              </div>
                         ) : data.validateType === ValidateType.EXIST ? (
                              <div className="flex flex-row items-center gap-x-7 justify-center text-[#FF9000]">
                                   <div className="flex flex-row items-center gap-x-2">
                                        <CancelOutlinedIcon />
                                        <p>รายชื่อซ้ำจากไฟล์</p>
                                   </div>
                                   <div className="underline cursor-pointer" onClick={() => onClick && onClick(index)}>ลบ</div>
                              </div>
                         ) : <div className="flex flex-row items-center gap-x-7 justify-center text-[#EF4343]">
                              <div className="flex flex-row items-center gap-x-2">
                                   <CancelOutlinedIcon />
                                   <p>รายชื่อซ้ำในระบบ</p>
                              </div>
                              <div className="underline cursor-pointer" onClick={() => onClick && onClick(index)}>ลบ</div>
                         </div>
                    }
               </div>
          </div>
          <div className="table-row w-full">
               <div className="table-cell align-middle py-2" />
          </div>
     </>
}