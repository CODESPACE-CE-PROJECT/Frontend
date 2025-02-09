import { Modal } from "@/components/Modals/Modal"
import { TextField } from "@/components/Input/TextField/TextField"
import { CancelButton } from "@/components/Button/CancelButton"
import { ConfirmButton } from "@/components/Button/ConfirmButton"
import { Label } from "@/components/Input/Label"
import { Dropdown } from "@/components/Input/Dropdown"
import { useState } from "react"
import { Gender, Role } from "@/enum/enum"
import { ICreateUser } from "@/types/user"
import { getRoleInThai } from "@/utils/text.util"
import { TextFieldEmail } from "@/components/Input/TextField/TextFieldEmail"

interface Props {
     onSubmit: (createForm: ICreateUser) => void,
     isOpen: boolean
     onClose?: () => void
}

export const UpdateUserModal: React.FC<Props> = ({ onSubmit, isOpen, onClose }) => {
     const [createForm, setCreateForm] = useState<ICreateUser>({
          email: "",
          firstName: "",
          lastName: "",
          username: "",
          gender: Gender.MALE,
          role: Role.STUDENT
     })
     const [isVisibleStudentNoField, setIsVisibleStudentNoField] = useState<boolean>(true)
     const [isSubmited, setIsSubmited] = useState<boolean>(false)

     const handleInputChange = (value: string | number, name: string) => {
          if (name === "role" && value === "ผู้สอน") {
               setIsVisibleStudentNoField(false)
               setCreateForm(prev => ({
                    ...prev,
                    studentNo: undefined
               }))
          } else {
               setIsVisibleStudentNoField(true)
          }

          setCreateForm(prev => {
               return {
                    ...prev,
                    [name]: name !== "role" ? value : value === "ผู้สอน" ? Role.TEACHER : Role.STUDENT
               }
          })
     }

     const handleRedioTypeChange = (gender: string) => {
          setCreateForm(prev => {
               return {
                    ...prev,
                    gender: gender === Gender.MALE.toString() ? Gender.MALE : gender === Gender.FEMALE.toString() ? Gender.FEMALE : Gender.OTHER,
               }
          })
     }

     const handleSubmit = () => {
          setIsSubmited(true)
          if (
               !createForm.email ||
               !createForm.firstName ||
               !createForm.lastName ||
               !createForm.gender ||
               !createForm.username
          ) {
               return
          }
          onSubmit(createForm)
     }

     return <Modal isOpen={isOpen} onClose={onClose}>
          <div className="my-4 mx-28 w-[40vw]">
               <div className="flex flex-col items-center w-full gap-y-4">
                    <p className="text-2xl font-semibold">
                         แก้ไขข้อมูลสมาชิก
                    </p>
                    <div className="flex flex-row justify-start gap-x-4 w-full">
                         <div className="flex flex-col items-start w-full gap-y-2">
                              <Label text="ประเภท" isRequired={true} />
                              <Dropdown name="role" value={getRoleInThai(createForm.role)} className="w-full" bgColor="bg-white" options={['ผู้สอน', 'ผู้เรียน']} border="border-[1px] border-border-text-light" onChange={handleInputChange} />
                         </div>
                         {
                              isVisibleStudentNoField && <div className="flex flex-col items-start w-full gap-y-2 self-stretch">
                                   <Label text="รหัสประจำตัว" isRequired={true} />
                                   <TextField name="studentNo" value={createForm.studentNo} bgColor="bg-white" onChange={handleInputChange} placeholder="รหัสประจำตัว" className="border-border-text-light" validateText="กรุณาใส่รหัสประจำตัว" isSubmited={isSubmited} />
                              </div>
                         }
                    </div>

                    <div className="flex flex-row items-center justify-start gap-4 w-full">
                         <div className="flex flex-col items-start w-full self-stretch gap-y-2">
                              <Label text="ชื่อ" isRequired={true} />
                              <TextField name="firstName" value={createForm.firstName} bgColor="bg-white" onChange={handleInputChange} placeholder="ชื่อ" className="border-border-text-light" validateText="กรุณาใส่ชื่อ" isSubmited={isSubmited} />
                         </div>

                         <div className="flex flex-col items-start self-stretch w-full gap-y-2">
                              <Label text="นามสกุล" isRequired={true} />
                              <TextField name="lastName" value={createForm.lastName} bgColor="bg-white" onChange={handleInputChange} placeholder="นามสกุล" className="border-border-text-light" validateText="กรุณาใส่นามสกุล" isSubmited={isSubmited} />
                         </div>

                    </div>

                    <div className="flex flex-row justify-start items-center py-4 w-full gap-x-10">
                         <div className="flex flex-row items-center gap-x-2">
                              <p>เพศ</p>
                              <p className="text-red-l">*</p>
                         </div>
                         <div className="flex flex-row items-center gap-x-7">
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" name={Gender.MALE.toString()} checked={createForm?.gender === Gender.MALE} onChange={(e) => handleRedioTypeChange(e.target.name)} className="cursor-pointer" />
                                   <p>ชาย</p>
                              </div>
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" name={Gender.FEMALE.toString()} checked={createForm?.gender === Gender.FEMALE} onChange={(e) => handleRedioTypeChange(e.target.name)} className="cursor-pointer" />
                                   <p>หญิง</p>
                              </div>
                              <div className="flex flex-row gap-x-2 items-center">
                                   <input type="radio" name={Gender.OTHER.toString()} checked={createForm?.gender === Gender.OTHER} onChange={(e) => handleRedioTypeChange(e.target.name)} className="cursor-pointer" />
                                   <p>อื่น ๆ</p>
                              </div>
                         </div>
                    </div>

                    <div className="flex flex-col items-start w-full self-stretch gap-y-2">
                         <Label text="ชื่อบัญชีผู้ใช้" isRequired={true} />
                         <TextField name="username" value={createForm.username} bgColor="bg-white" onChange={handleInputChange} placeholder="codespace" className="border-border-text-light" validateText="กรุณาใส่ชื่อผู้ใช้งาน" isSubmited={isSubmited} />
                    </div>

                    <div className="flex flex-col items-start w-full self-stretch gap-y-2 mb-4">
                         <Label text="อีเมล" isRequired={true} />
                         <TextFieldEmail name="email" value={createForm.email} bgColor="bg-white" onChange={handleInputChange} placeholder="worawit@codespace.com" className="border-border-text-light" validateText="กรุณาใส่อีเมลในรูปแบบ ตัวอย่าง sang@gmail.com, sang@codespace.co.th" isSubmited={isSubmited} />
                    </div>


                    <div className="flex flex-row gap-x-6">
                         <CancelButton className="text-[#64748B] border-border-text-light">
                              ยกเลิก
                         </CancelButton>
                         <ConfirmButton className="text-pure-white px-16" onClick={() => handleSubmit()}>
                              เพิ่ม
                         </ConfirmButton>
                    </div>
               </div>
          </div>
     </Modal>
}