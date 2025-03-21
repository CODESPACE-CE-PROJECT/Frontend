import { useRef } from "react";
import * as XLSX from "xlsx";
import { InpuFileButton } from "../Button/InputFileButton";

interface Props {
  onInput?: (selectedUsernames: string[]) => void;
  className?: string;
}

export const UploadFilePeople: React.FC<Props> = ({ onInput, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const extractedUsernames = jsonData.map((row: any) => row["username"]).filter(Boolean);

      onInput?.(extractedUsernames);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={`${className} flex items-center`}>
      <InpuFileButton
        onClick={() => inputRef.current?.click()}
        className="flex font-semibold items-center gap-x-2 px-4 py-2 rounded-md transition"
      />
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={inputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
