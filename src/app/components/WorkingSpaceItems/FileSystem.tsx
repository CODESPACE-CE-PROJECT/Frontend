import { useState } from 'react';

export default function FileSystem() {
  // State to store the file list
  const [files, setFiles] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');

  // Add a new file
  const addFile = () => {
    if (!fileName.trim()) return alert('File name cannot be empty!');
    if (files.includes(fileName)) return alert('File already exists!');
    setFiles([...files, fileName]);
    setFileName(''); // Clear input
  };

  // Delete a file
  const deleteFile = (fileToDelete: string) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">File System</h1>

      {/* Input to add new file */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={addFile}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add File
        </button>
      </div>

      {/* Display the file list */}
      <ul className="border rounded p-4 space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{file}</span>
            <button
              onClick={() => deleteFile(file)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
        {files.length === 0 && <p className="text-gray-500">No files available</p>}
      </ul>
    </div>
  );
}
