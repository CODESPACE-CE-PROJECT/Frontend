import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

interface Props {
     onChange: (value: string) => void,
     className?: string
}

export const SearchBar: React.FC<Props> = ({ onChange, className }) => {
     return (
          <div className="relative w-full h-full">
               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchTwoToneIcon className="text-neutral-50" fontSize="medium" />    
               </div>
               <input 
                    type="search" 
                    id="default-search" 
                    className={`${className} block bg-transparent w-full p-2 ps-10 text-lg border border-blackground-text rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="ค้นหา" 
                    onChange={(e) => onChange(e.target.value)}
               />
          </div>
     );
};