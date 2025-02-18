import { FcFile } from "react-icons/fc";
import Link from "next/link";

interface Props {
     file?: File,
     src: string
}

export const FileEmbed: React.FC<Props> = ({ file, src }) => {
     function formatBytes(bytes:number | undefined, unit = "KB") {
          if (bytes && (isNaN(bytes) || bytes < 0)) return "Invalid input";
      
          switch (unit.toUpperCase()) {
              case "KB":
                  return bytes ? (bytes / 1024).toFixed(2) + " KB" : "0 KB";
              case "MB":
                  return bytes ? (bytes / (1024 * 1024)).toFixed(2) + " MB": "0 MB";
              default:
                  return bytes + " Bytes";
          }
      }

     return <Link
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row text-wrap w-44 justify-center items-center gap-x-4 mt-2 bg-primary bg-opacity-35 p-4 rounded-md cursor-pointer hover:bg-opacity-70"
     >
          <FcFile className="text-4xl" />
          <div className="flex flex-col">
               <p className="truncate w-24">{file?.name}</p>
               <p>{formatBytes(file?.size)}</p>
          </div>
     </Link>
}