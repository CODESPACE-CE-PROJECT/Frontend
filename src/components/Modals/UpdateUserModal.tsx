import { Modal } from "@/components/Modals/Modal"
import { TextField } from "@/components/Input/TextField/TextField"
import { CancelButton } from "@/components/Button/CancelButton"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { Label } from "@/components/Input/Label"
import { Dropdown } from "@/components/Input/Dropdown"
import { useState } from "react"
import { Gender, Role } from "@/enum/enum"
import { IUpdateUser } from "@/types/user"
import { getRoleInThai } from "@/utils/text.util"
import { TextFieldEmail } from "@/components/Input/TextField/TextFieldEmail"
import { UploadFile } from "@/components/Input/UploadFile"

interface Props {
     onSubmit: (updateForm: IUpdateUser) => void,
     isOpen: boolean,
     onClose: (username: string) => void,
     updateForm: IUpdateUser,
     handleInputChange: (value: string | number, name: string) => void,
     handleFileInputChange?: (file: File) => void
}

export const UpdateUserModal:React.FC<Props> = ({onSubmit, isOpen, onClose, updateForm, handleInputChange, handleFileInputChange}) => {
     const [isSubmited, setIsSubmited] = useState<boolean>(false)

     const handleSubmit = () => {
          setIsSubmited(true)
          if(
               !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(updateForm.email) ||
               !updateForm.firstName || 
               !updateForm.lastName ||
               !updateForm.gender ||
               !updateForm.username || (updateForm.role === Role.STUDENT && !updateForm.studentNo)  
          ){
               return 
          }
          onSubmit(updateForm)
     }

     return <Modal isOpen={isOpen} onClose={() => {onClose(updateForm.username); setIsSubmited(false)}}>
          <div className="my-4 mx-28 w-[40vw]">
               <div className="flex flex-col items-center w-full gap-y-4">
                    <p className="text-2xl font-semibold">
                         เพิ่มสมาชิกในโรงเรียน
                    </p>

                    <UploadFile className="w-full py-2" text="เลือกรูปภาพโปรไฟล์ของผู้ใช้งาน" onInput={handleFileInputChange} imageUrl={updateForm.pictureUrl}/>
                    <div className="flex flex-row justify-start gap-x-4 w-full">
                         <div className="flex flex-col items-start w-full gap-y-2">
                              <Label text="ประเภท" isRequired={true} />
                              <Dropdown name="role" value={getRoleInThai(updateForm.role)} className="w-full" bgColor="bg-white" options={['ผู้สอน', 'ผู้เรียน']} border="border-[1px] border-border-text-light" onChange={handleInputChange} />
                         </div>
                         {
                              updateForm.role === Role.STUDENT && <div className="flex flex-col items-start w-full gap-y-2 self-stretch">
                              <Label text="รหัสประจำตัว" isRequired={true} />
                              <TextField name="studentNo" value={updateForm.studentNo} bgColor="bg-white" onChange={handleInputChange} placeholder="รหัสประจำตัว" className="border-border-text-light" validateText="กรุณาใส่รหัสประจำตัว" isSubmited={isSubmited}/>
                         </div>
                         }
                    </div>

                    <div className="flex flex-row items-center justify-start gap-4 w-full">
                         <div className="flex flex-col items-start w-full self-stretch gap-y-2">
                              <Label text="ชื่อ" isRequired={true} />
                              <TextField name="firstName" value={updateForm.firstName} bgColor="bg-white" onChange={handleInputChange} placeholder="ชื่อ" className="border-border-text-light" validateText="กรุณาใส่ชื่อ" isSubmited={isSubmited}/>
                         </div>

                         <div className="flex flex-col items-start self-stretch w-full gap-y-2">
                              <Label text="นามสกุล" isRequired={true} />
                              <TextField name="lastName" value={updateForm.lastName} bgColor="bg-white" onChange={handleInputChange} placeholder="นามสกุล" className="border-border-text-light" validateText="กรุณาใส่นามสกุล" isSubmited={isSubmited}/>
                         </div>

                    </div>

                    <div className="flex flex-row justify-start items-center py-4 w-full gap-x-10">
                         <div className="flex flex-row items-center gap-x-2">
                              <p>เพศ</p>
                              <p className="text-red-l">*</p>
                         </div>
                         <div className="flex flex-row items-center gap-x-7">
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" checked={updateForm?.gender === Gender.MALE} onChange={() => handleInputChange(Gender.MALE, "gender")} className="cursor-pointer"/>
                                   <p>ชาย</p>
                              </div>
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" checked={updateForm?.gender === Gender.FEMALE} onChange={() => handleInputChange(Gender.FEMALE, "gender")} className="cursor-pointer"/>
                                   <p>หญิง</p>
                              </div>
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" checked={updateForm?.gender === Gender.OTHER} onChange={() => handleInputChange(Gender.OTHER, "gender")} className="cursor-pointer"/>
                                   <p>อื่น ๆ</p>
                              </div>
                         </div>
                    </div>

                    <div className="flex flex-col items-start w-full self-stretch gap-y-2">
                         <Label text="ชื่อบัญชีผู้ใช้" isRequired={true} />
                         <TextField name="username" value={updateForm.username} bgColor="bg-white" onChange={handleInputChange} placeholder="codespace" className="border-border-text-light" validateText="กรุณาใส่ชื่อผู้ใช้งาน" isSubmited={isSubmited} disable={true}/>
                    </div>

                    <div className="flex flex-col items-start w-full self-stretch gap-y-2 mb-4">
                         <Label text="อีเมล" isRequired={true} />
                         <TextFieldEmail name="email" value={updateForm.email} bgColor="bg-white" onChange={handleInputChange} placeholder="worawit@codespace.com" className="border-border-text-light" validateText="กรุณาใส่อีเมลในรูปแบบที่ถูกต้อง ตัวอย่าง sang@gmail.com, sang@codespace.co.th" isSubmited={isSubmited} />
                    </div>


                    <div className="flex flex-row gap-x-6">
                         <CancelButton className="text-[#64748B] py-3 border-border-text-light" onClick={() => {onClose(updateForm.username); setIsSubmited(false)}}>
                              ยกเลิก
                         </CancelButton>
                         <ConfirmButton className="text-pure-white px-16" onClick={() => {handleSubmit()}}>
                              ตกลง
                         </ConfirmButton>
                    </div>
               </div>
          </div>
     </Modal>
}