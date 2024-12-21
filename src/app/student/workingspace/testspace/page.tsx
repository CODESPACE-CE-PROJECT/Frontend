"use client";

import { useState } from "react";
import { CplusplusOriginal } from "devicons-react";
import { PythonOriginal } from "devicons-react";
import { COriginal } from "devicons-react";
import { JavascriptOriginal } from "devicons-react";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import WindowIcon from "@mui/icons-material/Window";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
  const [fileName, setFileName] = useState("");

  // Add a new file func
  const addFile = () => {
    if (!fileName.trim()) return alert("File name cannot be empty!");
    if (files.includes(fileName)) return alert("File already exists!");
    setFiles([...files, fileName]);
    setFileName("");
  };

  // Delete a file func
  const deleteFile = (fileToDelete: string) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  // Get the icon for the file type
  const getFileIcon = (file: string) => {
    const extension = file.slice(file.lastIndexOf("."));
    return fileIcons[extension] || <DescriptionIcon />; // Default icon
  };

  return (
    <div className="bg-gray-800 text-white w-1/6 h-screen p-5 space-y-4 rounded-lg">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center ">
          <WindowIcon fontSize="inherit" className="text-[#2A3A50] h-5 w-5" />
          <h1 className="text-sm font-semibold">Premium</h1>
        </div>
        <div className="flex flex-row items-center ">
          <PlayArrowIcon fontSize="inherit" />
          <NoteAddIcon fontSize="inherit" />
        </div>
      </div>

      {/* Add file input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="New file name..."
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addFile}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* File List */}
      <ul className="space-y-2">
        {files.length === 0 && (
          <p className="text-gray-400 text-sm">No files available</p>
        )}
        {files.map((file, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-sm bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            <div className="flex items-center space-x-2">
              {/* File Icon */}
              {getFileIcon(file)}
              <span>{file}</span>
            </div>
            <div
              onClick={() => deleteFile(file)}
              className="text-red-500 hover:text-red-700"
            >
              <DeleteIcon />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
