import { FcFile } from "react-icons/fc";
import Link from "next/link";

interface Props {
     file?: File,
     src: string
}

export const FileEmbed: React.FC<Props> = ({ file, src }) => {
     return <Link
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row text-wrap items-center gap-x-4 mt-2 bg-primary bg-opacity-35 p-4 rounded-md cursor-pointer hover:bg-opacity-70"
     >
          <FcFile className="text-4xl" />
          <div className="flex flex-col">
               <p>{file?.name}</p>
               <p>{file?.size}</p>
          </div>
     </Link>
}