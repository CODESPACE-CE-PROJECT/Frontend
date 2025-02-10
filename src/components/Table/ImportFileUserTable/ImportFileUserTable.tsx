import { IFileFormat, IProfile } from "@/types/user";
import { RowUserItem } from "./RowUserItem";
import { Gender, Role, ValidateType } from "@/enum/enum";

interface Props {
     data?: IProfile[],
     onClickOption: (name: string, username: string, allowLogin: boolean | null) => void
}

export const ImportFileUserTable: React.FC<Props> = ({ data, onClickOption }) => {
     const mockdata:IFileFormat = {
          studentId: '64010726',
          firstname: 'รัตนพร',
          lastname: 'สมใจนึก',
          role: Role.STUDENT,
          username: 'rattanaporn.r',
          gender: Gender.FEMALE,
          email: '64010726@kmitl.ac.th',
          validateType: ValidateType.EXIST
     }
     return (
          <div className="w-full">
               <div className="table w-full rounded-xl">
                    <div className="table-header-group bg-[#3049724D] w-full">
                         <div className="table-row text-xl text-center font-medium">
                              <div className="table-cell align-middle rounded-l-xl px-8 py-4">รหัสประจำตัว</div>
                              <div className="table-cell align-middle px-8 py-4">ชื่อ</div>
                              <div className="table-cell align-middle px-8 py-4">นามสกุล</div>
                              <div className="table-cell align-middle px-8 py-4">เพศ</div>
                              <div className="table-cell align-middle px-8 py-4">ผู้ใช้งาน</div>
                              <div className="table-cell align-middle px-8 py-4">อีเมล</div>
                              <div className="table-cell align-middle px-8 py-4">ประเภท</div>
                              <div className="table-cell text-center align-middle rounded-r-xl py-4 text-transparent">.</div>
                         </div>
                    </div>

                    <div className="table-row-group w-full">
                         <div className="table-row w-full">
                              <div className="table-cell align-middle py-2" />
                         </div>
                         {Array.from({ length: 100 }).map((item, index) => (
                            <RowUserItem key={index} data={mockdata}/>
                         ))}
                    </div>
               </div>
          </div>
     );
}