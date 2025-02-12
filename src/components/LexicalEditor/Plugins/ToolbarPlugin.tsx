import { DropDown } from '@/components/LexicalEditor/ui/DropDown';
import { DropDownItem } from '@/components/LexicalEditor/ui/DropDownItem';
import {
     BsTypeH1,
     BsTypeH2,
     BsTypeH3,
     BsChatSquareQuote
} from "react-icons/bs";
import { HiListBullet, HiNumberedList } from "react-icons/hi2";
import { BsTextParagraph, BsTypeStrikethrough } from "react-icons/bs";
import { LuUndo2, LuRedo2, LuMinus } from "react-icons/lu";
import { Button } from '@/components/LexicalEditor/ui/Button';
import { MdFormatBold, MdAttachFile } from "react-icons/md";
import { FiItalic, FiUnderline } from "react-icons/fi";
import { IoCodeOutline } from "react-icons/io5";
import { FaRegCheckSquare } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TbPlusEqual } from "react-icons/tb";
import {
     CiTextAlignLeft,
     CiTextAlignCenter,
     CiTextAlignRight,
     CiTextAlignJustify,
     CiImageOn,
} from "react-icons/ci";
import { ReactNode, useState } from 'react';


export const ToolbarPlugin = () => {
     const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
     const [dropdownValue, SetDropdownValue] = useState<ReactNode>(<>
          <BsTextParagraph />
          <p>Normal</p>
     </>)

     const handleOnClickDropdown = (children: ReactNode) => {
          SetDropdownValue(children)
          setIsOpenDropdown(prev => !prev)
     }

     return <div className="flex flex-wrap items-center border-b-[1px] border-b-gray-600 px-2 py-2 gap-x-3">
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <LuUndo2 className='text-xl' />
               </Button>
               <Button>
                    <LuRedo2 className='text-xl' />
               </Button>
          </div>

          {/* block control */}
          <div className='border-r-[1px] border-r-gray-600 h-10'>
               <DropDown value={dropdownValue} isOpen={isOpenDropdown} onClick={(isOPen) => setIsOpenDropdown(isOPen)}>
                    <DropDownItem onClick={handleOnClickDropdown}>
                         <BsTextParagraph className='text-xl' />
                         <p>Normal</p>
                    </DropDownItem>

                    <DropDownItem onClick={handleOnClickDropdown}>
                         <BsTypeH1 className='text-xl' />
                         <p>Heading 1</p>
                    </DropDownItem>

                    <DropDownItem onClick={handleOnClickDropdown}>
                         <BsTypeH2 className='text-xl' />
                         <p>Heading 2</p>
                    </DropDownItem>

                    <DropDownItem onClick={handleOnClickDropdown}>
                         <BsTypeH3 className='text-xl' />
                         <p>Heading 3</p>
                    </DropDownItem>
               </DropDown>
          </div>

          {/* Font format */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <MdFormatBold className='text-2xl' />
               </Button>

               <Button>
                    <FiItalic className='text-xl' />
               </Button>

               <Button>
                    <FiUnderline className='text-xl' />
               </Button>

               <Button>
                    <BsTypeStrikethrough className='text-xl' />
               </Button>

               <Button>
                    <IoCodeOutline className='text-xl' />
               </Button>
          </div>

          {/* resize font */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <GoPlus className='text-xl' />
               </Button>

               <input type="text" className='border-gray-600 bg-transparent w-10 p-0 text-center rounded' value={"85"} />

               <Button>
                    <LuMinus className='text-xl' />
               </Button>
          </div>

          {/* align text */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <CiTextAlignLeft className='text-xl' />
               </Button>

               <Button>
                    <CiTextAlignCenter className='text-xl' />
               </Button>

               <Button>
                    <CiTextAlignRight className='text-xl' />
               </Button>

               <Button>
                    <CiTextAlignJustify className='text-xl' />
               </Button>
          </div>

          {/* order and quote  */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <HiListBullet className='text-2xl' />
               </Button>

               <Button>
                    <HiNumberedList className='text-xl' />
               </Button>

               <Button>
                    <BsChatSquareQuote className='text-lg' />
               </Button>

               <Button>
                    <FaRegCheckSquare className='text-xl' />
               </Button>
          </div>

          {/* attach file and image */}
          <div className='flex flex-row items-center gap-x-2'>
               <Button>
                    <MdAttachFile className='text-xl' />
               </Button>

               <Button>
                    <CiImageOn className='text-2xl' />
               </Button>

               <Button>
                    <TbPlusEqual className='text-xl' />
               </Button>
          </div>
     </div>
}