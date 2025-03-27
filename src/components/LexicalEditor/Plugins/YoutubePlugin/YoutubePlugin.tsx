import { useState } from "react";
import { Button } from "../../ui/Button"
import { Modal } from "@/components/Modals/Modal";
import { TextField } from "@/components/Input/TextField/TextField";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createYoutubeNode } from "../../node/YoutubeNode";
import { $insertNodes } from "lexical";
import { FcStart } from "react-icons/fc";

export const YoututbePlugin = () => {
     const [editor] = useLexicalComposerContext()
     const [isOpen, setIsOpen] = useState<boolean>(false)
     const [url, setURL] = useState<string>("")

     const onEmbed = () => {
          if (!url) return;
          const match =
               /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

          const id = match && match?.[2]?.length === 11 ? match?.[2] : null;
          if (!id) return;
          editor.update(() => {
               const node = $createYoutubeNode({id})
               $insertNodes([node])
          });
          setURL("")
          setIsOpen(false)
     }

     return (
          <div>
               <Button
                    onClick={() => setIsOpen(prev => !prev)}
               >
                    <FcStart className='text-2xl' />
               </Button>

               {
                    isOpen && <Modal
                         isOpen={isOpen}
                         onClose={() => setIsOpen(false)}
                    >
                         <div className='flex flex-col items-center gap-y-10 w-96'>
                              <div className='w-full flex flex-row items-start'>
                                   <p className='text-2xl'>เพิ่มคลิป Youtube</p>
                              </div>
                              <TextField className='w-full bg-white border-border-text-light order-[2px]' onChange={(value) => setURL(value as string)} placeholder='พิมพ์ URL Youtube' />

                              <div className='flex flex-row w-full items-center justify-between'>
                                   <Button
                                        className='disabled:bg-gray-300 disabled:text-black hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                                        onClick={onEmbed}
                                        disabled={!url}
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