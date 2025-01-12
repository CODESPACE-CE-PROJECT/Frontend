"use client";

import { useState } from "react";
import { CplusplusOriginal } from "devicons-react";
import { PythonOriginal } from "devicons-react";
import { COriginal } from "devicons-react";
import { JavascriptOriginal } from "devicons-react";
import DescriptionIcon from "@mui/icons-material/Description";
import ClearIcon from "@mui/icons-material/Clear";
import WindowIcon from "@mui/icons-material/Window";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

// Mapping type
const fileIcons: Record<string, JSX.Element> = {
  ".cpp": <CplusplusOriginal size="24" />,
  ".py": <PythonOriginal size="24" />,
  ".c": <COriginal size="24" />,
  ".js": <JavascriptOriginal size="24" />,
  ".txt": <DescriptionIcon fontSize="medium" />,
};

export default function FileExplorer() {
  const [files, setFiles] = useState<string[]>([]);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [focusedFile, setFocusedFile] = useState<string | null>(null);

  const createNewFile = () => { 
    let baseName = "untitled";
    let newFileName = baseName;
    let counter = 1;

    while (files.includes(newFileName)) {
      newFileName = `${baseName} (${counter})`;
      counter++;
    }

    setFiles([...files, newFileName]);
    setEditingFile(newFileName);
  };

  const renameFile = (oldName: string, newName: string) => {
    if (!newName.trim()) {
      alert("File name cannot be empty!");
      setEditingFile(null);
      return;
    }
    if (oldName !== newName && files.includes(newName)) {
      alert("File already exists!");
      setEditingFile(null);
      return;
    }
    setFiles(files.map((file) => (file === oldName ? newName : file)));
    setEditingFile(null);
  };

  const deleteFile = (fileToDelete: string) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  const getFileIcon = (file: string) => {
    const extension = file.slice(file.lastIndexOf("."));
    return fileIcons[extension] || <DescriptionIcon />;
  };

  return (
    <div className="bg-[#0B111B] text-white w-1/6 h-screen p-5 space-y-4 border-r-[0.5px] border-[#D7D7D71A]">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b-[0.5px] border-[#D7D7D71A]">
        <div className="flex flex-row items-center space-x-2">
          <WindowIcon className="text-[#2A3A50]" />
          <h1 className="text-sm font-semibold border-2 border-[#2A3A50] rounded-lg py-2 px-3">Premium</h1>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <PlayArrowIcon/>
          <NoteAddIcon
            className="cursor-pointer"
            onClick={createNewFile}
          />
        </div>
      </div>

      {/* File List */}
      <ul className="space-y-2">
        {files.length === 0 && (
          <p className="text-gray-400 text-sm">No files available</p>
        )}
        {files.map((file) => (
          <li
            key={file}
            className="flex justify-between items-center text-sm bg-[#2A3A50] p-2 rounded hover:bg-[#3C5271]"
            onMouseEnter={() => setFocusedFile(file)}
            onMouseLeave={() => setFocusedFile(null)}
          >
            <div className="flex items-center space-x-2">
              {/* File Icon */}
              {getFileIcon(file)}
              {editingFile === file ? (
                <input
                  autoFocus
                  type="text"
                  defaultValue={file}
                  onBlur={(e) => renameFile(file, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") renameFile(file, e.currentTarget.value);
                    if (e.key === "Escape") setEditingFile(null);
                  }}
                  className="p-0.5 bg-gray-600 text-white rounded focus:outline-none w-full"
                />
              ) : (
                <span
                  onDoubleClick={() => setEditingFile(file)}
                  className="cursor-pointer"
                >
                  {file}
                </span>
              )}
            </div>
            {focusedFile === file && (
              <div
                onClick={() => deleteFile(file)}
                className="text-[#D7D7D7] cursor-pointer"
              >
                <ClearIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
