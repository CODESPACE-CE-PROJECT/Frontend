import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const Option = () => {
     
     return <div className='relative'>
          <div className="z-0 flex text-center size-10 items-center justify-center border-[1px] rounded-md border-[#2A3A50] cursor-pointer">
               <MoreHorizOutlinedIcon className=" text-neutral-50" />
          </div>

          {/* <div className='z-10 absolute p-4 -left-24 top-12 rounded-xl bg-[#2A3A50]'>
               <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-row gap-x-2'>
                         <ModeOutlinedIcon fontSize='small' />
                         <p>แก้ไข</p>
                    </div>
                    <div className='flex flex-row gap-x-2'>
                         <DeleteOutlinedIcon fontSize='small' />
                         <p>ลบโรงเรียน</p>
                    </div>
               </div>
          </div> */}
     </div>
}