import { useRef, useState } from "react";
import { Button } from "../../ui/Button";
import { Modal } from "@/components/Modals/Modal";
import { MdAttachFile } from "react-icons/md";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createFileNode } from "../../node/FileNode";
import { $insertNodes } from "lexical";
import { uploadDocumentFile } from "@/actions/file";
import { IFile } from "@/types/file";

export const FilePlugin = () => {
     const [editor] = useLexicalComposerContext()
     const [isOpen, setIsOpen] = useState<boolean>(false)
     const inputFileRef = useRef<HTMLInputElement>(null)
     const [file, setFile] = useState<File>()

     const onAttachFile = async () => {
          if (file) {
               const {status, data} = await uploadDocumentFile(file)
               if(status === 201){
                    const srcFile:IFile = data
                    editor.update(() => {
                         editor.update(() => {
                              const node = $createFileNode({file, src:srcFile.fileUrl, editor});
                              $insertNodes([node])
                         })
                    })
                    setFile(undefined)
                    setIsOpen(false)
               }
          }
     }

     return (<div>
          <Button
               onClick={() => setIsOpen(prev => !prev)}
          >
               <MdAttachFile className='text-xl' />
          </Button>

          <input
               type="file"
               ref={inputFileRef}
               accept="application/pdf, 
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
               style={{ display: "none" }}
               onChange={(e) => {
                    const file = e.target.files?.[0];
                    console.log(file)
                    if (file) {
                         setFile(file);
                    }
                    e.target.files = null;
               }}
          />
          {
               isOpen && <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
               >
                    <div className='flex flex-col items-center gap-y-10 w-96'>
                         <div className='w-full flex flex-row items-start'>
                              <p className='text-2xl'>เพิ่มไฟล์</p>
                         </div>

                         <Button
                              className='hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                              onClick={() => inputFileRef.current?.click()}
                         >
                              {file?.name || 'อัพโหลดไฟล์'}
                         </Button>
                         <div className='flex flex-row w-full items-center justify-center'>
                              <Button
                                   className='disabled:bg-gray-300 disabled:text-black hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                                   onClick={onAttachFile}
                                   disabled={!file}
                              >
                                   ตกลง
                              </Button>
                         </div>
                    </div>
               </Modal>
          }
     </div>)
}