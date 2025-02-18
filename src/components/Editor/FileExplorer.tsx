"use client";

import { useState } from "react";
import {
  CplusplusOriginal,
  PythonOriginal,
  COriginal,
  JavaOriginal,
} from "devicons-react";
import DescriptionIcon from "@mui/icons-material/Description";
import ClearIcon from "@mui/icons-material/Clear";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { ICodeSpace, IUpdateCodeSpace } from "@/types/codeSpace";
import { Loading } from "@/components/Loading/Loading";
import { LanguageType } from "@/enum/enum";

interface FileExplorerProps {
  codeFile?: ICodeSpace[];
  isPremium: boolean;
  onCreateFile: () => void;
  onEditFile: (codespaceId: string, updatedFile: IUpdateCodeSpace) => void;
  onDeleteFile: (codespaceId: string) => void;
  editState: { isLoading: boolean; codeSpaceId?: string };
  onSelect: (file: ICodeSpace) => void;
  selectedFile?: ICodeSpace;
  onExecute: () => void
}

// Mapping file extensions to icons
const fileIcons: Record<string, JSX.Element> = {
  ".cpp": <CplusplusOriginal size="24" />,
  ".py": <PythonOriginal size="24" />,
  ".c": <COriginal size="24" />,
  ".java": <JavaOriginal size="24" />,
  "": <DescriptionIcon fontSize="medium" />,
};

const fileType: Record<string, LanguageType> = {
  ".cpp": LanguageType.CPP,
  ".py": LanguageType.PYTHON,
  ".c": LanguageType.C,
  ".java": LanguageType.JAVA,
};

export default function FileExplorer({
  codeFile,
  isPremium,
  onCreateFile,
  onEditFile,
  onDeleteFile,
  editState,
  onSelect,
  selectedFile,
  onExecute
}: FileExplorerProps) {
  const [focusedFile, setFocusedFile] = useState<string | null>(null);
  const [isEditingFile, setIsEditingFile] = useState<string | null>(null);

  const getFileIcon = (file: string) => {
    const extension = file?.slice(file.lastIndexOf("."));
    return fileIcons[extension] || <DescriptionIcon />;
  };

  const getFileType = (file: string) => {
    const extension = file?.slice(file.lastIndexOf("."));
    return fileType[extension] || undefined;
  };

  return (
    <div className="overflow-y-auto bg-[#0B111B] text-white w-2/12 h-screen px-5 py-4 space-y-4 border-r-[0.5px] border-[#D7D7D71A]">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b-[0.5px] border-[#2A3A50]">
        <div className="hidden xl:flex sm:text-sm flex-row items-center space-x-2">
          <h1 className="text-sm font-semibold border-2 border-[#2A3A50] rounded-lg py-2 px-3">
            {isPremium ? "Premium" : "Standard"}
          </h1>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button 
            disabled={codeFile?.length === 0}
            onClick={() => onExecute()}
          >
            <PlayArrowIcon
              fontSize="inherit"
              className={`text-3xl ${codeFile && codeFile?.length > 0 ? 'hover:text-primary': 'text-gray-500'}`}
            />
          </button>

          <button onClick={onCreateFile}>
            <NoteAddIcon
              fontSize="inherit"
              className="text-3xl hover:text-primary cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* File List */}
      <ul className="space-y-2">
        {codeFile?.length === 0 && (
          <p className="text-gray-400 text-sm">ไม่พบไฟล์</p>
        )}
        {codeFile?.map((file) => (
          <li
            key={file.codeSpaceId}
            className={`flex justify-between items-center cursor-pointer text-sm ${selectedFile && selectedFile.codeSpaceId === file.codeSpaceId
              ? "bg-[#2A3A50]"
              : "hover:bg-[#3C5271]"
              } p-2 rounded`}
            onMouseEnter={() => setFocusedFile(file.codeSpaceId)}
            onMouseLeave={() => setFocusedFile(null)}
            onClick={() => onSelect(file)}
          >
            <div className="flex items-center space-x-2">
              {/* File Icon */}
              {getFileIcon(file?.fileName)}

              {isEditingFile === file.codeSpaceId ? (
                <input
                  autoFocus
                  type="text"
                  defaultValue={file.fileName}
                  onBlur={(e) => {
                    onEditFile(file.codeSpaceId, {
                      filename: e.currentTarget.value,
                      language: getFileType(e.currentTarget.value),
                    });
                    setIsEditingFile(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onEditFile(file.codeSpaceId, {
                        filename: e.currentTarget.value,
                        language: getFileType(e.currentTarget.value),
                      });
                      setIsEditingFile(null);
                    }
                    if (e.key === "Escape") setIsEditingFile(null);
                  }}
                  className="p-0 bg-gray-600 text-white text-sm rounded focus:outline-none w-full"
                />
              ) : (
                <span
                  onDoubleClick={() => setIsEditingFile(file.codeSpaceId)}
                  className="truncate w-36"
                >
                  {file.fileName}
                </span>
              )}
            </div>

            {editState.isLoading &&
              editState.codeSpaceId === file.codeSpaceId ? (
              <div className="flex flex-col items-center justify-center">
                <Loading className="size-4" />
              </div>
            ) : (
              <>
                {focusedFile === file.codeSpaceId && (
                  <div
                    onClick={() => {
                      onDeleteFile(file.codeSpaceId);
                    }}
                    className="text-[#D7D7D7] cursor-pointer hover:text-red-l"
                  >
                    <ClearIcon />
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
