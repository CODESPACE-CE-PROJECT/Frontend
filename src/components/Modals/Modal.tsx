import React, { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    onClose?: () => void;
    children?: ReactNode | ReactNode[];
    isOpen: boolean;
}

export const Modal: React.FC<Props> = ({ onClose, isOpen, children }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center text-black ${
                isOpen ? 'visible bg-[#00000040]' : 'invisible' }`}
        >
            <div className="flex flex-col items-center gap-y-2">
                <div
                    className={`flex flex-col bg-white rounded-xl shadow-lg p-6 z-60 transition-shadow duration-300 ${
                        isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
                    }`}
                >
                    <div className="flex flex-row justify-end w-full">
                        <button className="hover:fill-[#b7b7b7]" onClick={onClose}>
                              <CloseIcon className='text-[#64748B] hover:text-gray-700' fontSize='medium'/>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
