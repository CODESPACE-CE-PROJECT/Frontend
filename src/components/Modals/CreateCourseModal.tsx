import { Modal } from "@/components/Modals/Modal"
import { UploadFile } from "@/components/Input/UploadFile"
import { Label } from "@/components/Input/Label"
import { TextField } from "@/components/Input/TextField/TextField"
import { TextArea } from "@/components/Input/TextArea"
import { ConfirmButton } from "../Button/ConfirmButton"
import { CancelButton } from "../Button/CancelButton"
import { useEffect, useState } from "react"

export const CreatCourseModal = () => {
     const [numChar, setNumChar] = useState<number>(0)

     useEffect(() => {

     }, [numChar])

     return <Modal isOpen={false} onClose={() => console.log("ennnn")}>
          <div className="my-4 mx-28">
               <div className="flex flex-col items-center gap-y-4">
                    <p className="text-2xl font-semibold">
                         สร้างคอร์สในโรงเรียน
                    </p>

                    <UploadFile text="เลือกรูปภาพคอร์สเรียน" className="w-[35vw] py-6 border-border-text-light" onInput={() => { }} />

                    <div className="flex flex-col items-start w-full gap-y-2">
                         <Label text="ชื่อวิชา" isRequired={true} />
                         <TextField bgColor="bg-white" onChange={() => { }} placeholder="ชื่อวิชา" className="border-border-text-light" />
                    </div>

                    <div className="flex flex-row items-center justify-start gap-4">
                         <div className="flex flex-col items-start w-full gap-y-2">
                              <Label text="ระดับชั้นการศึกษา" isRequired={false} />
                              <TextField bgColor="bg-white" onChange={() => { }} placeholder="ระดับชั้นการศึกษา" className="border-border-text-light" />
                         </div>

                         <div className="flex flex-col items-start w-full gap-y-2">
                              <Label text="ภาคเรียน" isRequired={false} />
                              <TextField bgColor="bg-white" onChange={() => { }} placeholder="ภาคเรียน" className="border-border-text-light" />
                         </div>

                         <div className="flex flex-col items-start w-full gap-y-2">
                              <Label text="ปีการศึกษา" isRequired={false} />
                              <TextField bgColor="bg-white" onChange={() => { }} placeholder="ปีการศึกษา" className="border-border-text-light" />
                         </div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-y-2">
                         <Label text="รายละเอียด" isRequired={false} />
                         <TextArea onChange={() => { }} bgColor="bg-white" placeholder="รายละเอียด" className="border-border-text-light" />
                         <p className="self-end text-xs">0/200</p>
                    </div>

                    <div className="flex flex-row gap-x-6">
                         <CancelButton className="hover:bg-[#f3f4f6] border-border-text-light">
                              ยกเลิก
                         </CancelButton>
                         <ConfirmButton className="text-pure-white">
                              สร้าง
                         </ConfirmButton>
                    </div>
               </div>
          </div>
     </Modal>
}