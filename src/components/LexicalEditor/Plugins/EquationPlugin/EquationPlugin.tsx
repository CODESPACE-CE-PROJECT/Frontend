import 'katex/dist/katex.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
     $insertNodes,
} from 'lexical';

import KatexRenderer from '@/components/LexicalEditor/ui/KatexRenderer';
import { useState } from 'react';
import { PiPlusMinusFill } from "react-icons/pi";
import { Modal } from '@/components/Modals/Modal';
import { Button } from '@/components/LexicalEditor/ui/Button';
import { TextField } from '@/components/Input/TextField/TextField';
import { $createEquationNode } from '@/components/LexicalEditor/node/EquationNode';

export const EquationPlugin = () => {
     const [editor] = useLexicalComposerContext()
     const [isOpen, setIsOpen] = useState<boolean>(false)
     const [equation, setEquation] = useState<string>("")

     const onAddEquation = () => {
          editor.update(() => {
               const node = $createEquationNode(equation, true);
               $insertNodes([node])
          })
          setEquation("")
          setIsOpen(false)
     }

     return (<div>
                    <Button
                         onClick={() => setIsOpen(prev => !prev)}
                    >
                         <PiPlusMinusFill className='text-2xl' />
                    </Button>

                    {
                         isOpen && <Modal
                              isOpen={isOpen}
                              onClose={() => setIsOpen(false)}
                         >
                              <div className='flex flex-col items-center gap-y-10 min-w-96'>
                                   <div className='w-full flex flex-row items-start'>
                                        <p className='text-2xl'>เพิ่มสมการ</p>
                                   </div>
                                   <TextField className='w-full bg-white  border-border-text-light order-[2px]' onChange={(value) => setEquation(value as string)} placeholder='' />
     
                                   <p className='self-start'>แสดงผลลัพธ์</p>
                                   <KatexRenderer 
                                        equation={equation}
                                        inline={true}
                                        onDoubleClick={() => {}}
                                   />
                                   <div className='flex flex-row w-full items-center justify-center'>
                                        <Button
                                             className='disabled:bg-gray-300 disabled:text-black hover:bg-primary hover:bg-opacity-75 px-4 py-2 border-[2px] outline-border-page rounded-md hover:text-white'
                                             onClick={onAddEquation}
                                             disabled={!equation}
                                        >
                                             ตกลง
                                        </Button>
                                   </div>
                              </div>
                         </Modal>
                    }
               </div>)
}