import { Button } from "@/components/LexicalEditor/ui/Button"
import { Modal } from '@/components/Modals/Modal'
import { TextField } from '@/components/Input/TextField/TextField'
import { useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createImageNode } from '@/components/LexicalEditor/node/ImageNode'
import { $insertNodes } from 'lexical'
import { FcAddImage } from "react-icons/fc";
import { uploadImageFile } from "@/actions/file"
import { IImageFile } from "@/types/file"

export const ImagePlugin = () => {
     const [isOpen, setIsOpen] = useState(false)
     const [url, setURL] = useState("")
     const [file, setFile] = useState<File>()
     const inputFileRef = useRef<HTMLInputElement>(null)
     const [editor] = useLexicalComposerContext()

     const onAddImage = async () => {
          let src = "";
          if (url) src = url;
          if (file) {
               const {status, data} = await uploadImageFile(file);
               const image:IImageFile = data
               if(status === 201){
                    src = image.imageUrl
               }
               console.log(src)
          }

          editor.update(() => {
               const node = $createImageNode({ src, altText: file?.name || "Dummy Text"});
               $insertNodes([node]);
          });
          setFile(undefined);
          setURL("");
          setIsOpen(false);
     };

     return (
          <div>
               <Button
                    onClick={() => setIsOpen(prev => !prev)}
               >
                    <FcAddImage className='text-2xl' />
               </Button>

               <input
                    type="file"
                    ref={inputFileRef}
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => {
                         const file = e.target.files?.[0];
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
                                   <p className='text-2xl'>เพิ่มรูปภาพ</p>
                              </div>
                              <TextField className='w-full bg-white  border-border-text-light order-[2px]' onChange={(value) => setURL(value as string)} placeholder='พิมพ์ URL รูปภาพ' />

                              <div className='flex flex-row w-full items-center justify-between'>
                                   <Button
                                        className='hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                                        onClick={() => inputFileRef.current?.click()}
                                   >
                                        {file?.name || 'อัพโหลดรูปภาพ'}
                                   </Button>

                                   <Button
                                        className='disabled:bg-gray-300 disabled:text-black hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                                        onClick={onAddImage}
                                        disabled={!url && !file}
                                   >
                                        ตกลง
                                   </Button>
                              </div>
                         </div>
                    </Modal>
               }
          </div>
     )
}