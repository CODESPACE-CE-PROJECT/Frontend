import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

export const ToolbarPlugin = () => {
     return <div className="flex flex-row border-b-[1px] border-b-gray-600 px-2 py-2 gap-x-3">
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600'>
               <div className='hover:bg-gray-600 p-1 rounded-md'>
                    <UndoIcon fontSize='medium' />
               </div>
               <div className='hover:bg-gray-600 p-1 rounded-md'>
                    <RedoIcon fontSize='medium' />
               </div>
          </div>
     </div>
}