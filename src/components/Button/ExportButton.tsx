import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import NoteAddIcon from "@mui/icons-material/NoteAdd";


interface IStudentScore {
  firstName: string;
  lastName: string;
  totalScore: number;
}


interface Props {
  assignments: {
    title: string;
    scores: IStudentScore[];
  }[];
}

const ExportButton: React.FC<Props> = ({ assignments }) => {
  const exportToExcel = () => {
    if (assignments.length === 0) {
      alert("ไม่มีข้อมูลสำหรับส่งออก");
      return;
    }

    const studentScores: {
      [studentName: string]: { [title: string]: number; total: number };
    } = {};

    assignments.forEach((assignment) => {
      assignment.scores.forEach((score: IStudentScore) => { 
        const studentName = `${score.firstName} ${score.lastName}`;
        if (!studentScores[studentName]) {
          studentScores[studentName] = { total: 0 };
        }
        studentScores[studentName][assignment.title] = score.totalScore;
        studentScores[studentName].total += score.totalScore;
      });
    });

    const assignmentTitles = assignments.map((assignment) => assignment.title);
    const headerRow: string[] = ["ชื่อผู้เรียน", ...assignmentTitles, "รวม"];

    const dataToExport: (string | number)[][] = [headerRow];
    Object.entries(studentScores).forEach(([studentName, scores]) => {
      const row: (string | number)[] = [
        studentName,
        ...assignmentTitles.map((title) => scores[title] ?? 0),
        scores.total,
      ];
      dataToExport.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "คะแนนนักเรียน");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "คะแนนนักเรียน.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-white text-[#5572FA] font-bold text-lg text-nowrap flex items-center justify-center gap-2 w-[160px] px-4 py-2 rounded-lg shadow-md hover:bg-[#f1f5ff] transition-all duration-200"
    >
      <NoteAddIcon className="text-[#5572FA]" />
      ส่งออกไฟล์
    </button>
  );
};

export default ExportButton;
