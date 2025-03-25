"use client";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useParams } from "next/navigation";

interface IProblem {
  problemId: string;
  score: number;
  status: string;
}

interface IStudentScore {
  firstName: string;
  lastName: string;
  problems: IProblem[];
}

interface Props {
  assignments: {
    assignmentId: string;
    scores: IStudentScore[];
  }[];
}

const ExportButtonScoreUser: React.FC<Props> = ({ assignments }) => {
  const { assignmentId } = useParams();

  const exportToExcel = () => {
    if (!assignmentId) {
      alert("ไม่พบ assignmentId");
      return;
    }

    const currentAssignment = assignments.find(
      (assignment) => assignment.assignmentId === assignmentId
    );

    if (!currentAssignment) {
      alert("ไม่พบข้อมูลสำหรับส่งออก");
      return;
    }

    const studentScores: Record<string, Record<string, number> & { total: number }> = {};
    let allProblemIds: string[] = [];

    currentAssignment.scores.forEach((score: IStudentScore) => {
      const studentName = `${score.firstName} ${score.lastName}`;

      if (!studentScores[studentName]) {
        studentScores[studentName] = { total: 0 };
      }

      score.problems.forEach((problem) => {
        studentScores[studentName][problem.problemId] = problem.score;
        studentScores[studentName].total += problem.score;
      });

      allProblemIds = [...new Set([...allProblemIds, ...score.problems.map((p) => p.problemId)])];
    });

    allProblemIds.sort(); 

  
    const problemIndexMap: Record<string, number> = {};
    allProblemIds.forEach((problemId, index) => {
      problemIndexMap[problemId] = index + 1;
    });

   
    const headerRow: (string | number)[] = ["ชื่อผู้เรียน", ...allProblemIds.map((problemId) => problemIndexMap[problemId]), "รวม"];
    const dataToExport: (string | number)[][] = [headerRow];

    
    Object.entries(studentScores).forEach(([studentName, scores], index) => {
      const row: (string | number)[] = [
        `${index + 1}. ${studentName}`, 
        ...allProblemIds.map((problemId) => scores[problemId] ?? 0), 
        scores.total, 
      ];
      dataToExport.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "คะแนนนักเรียน");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, `คะแนนนักเรียน.xlsx`);
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

export default ExportButtonScoreUser;
