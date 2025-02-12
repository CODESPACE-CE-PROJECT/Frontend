import { IAssignment } from "@/types/assignment";
// ใช้ Enum จาก IAssignment

interface Props {
  assignment: IAssignment["assignment"][number];
  
  isStudentOnSite: boolean;
}

const AssignmentBox: React.FC<Props> = ({ assignment,  isStudentOnSite }) => {
  const isExam = assignment.type ===  assignment.EXAMONLINE || assignment.type ===  assignment.EXAMONSITE;
  const isExamActive = !assignment.isLock; 
  const showWarning = isExam && isExamActive && !isStudentOnSite; 

  return (
    <div className="text-white text-lg">
      {showWarning ? (
        <div className="text-[#FAFAFA] border border-[#2A3A50] rounded-md">นักเรียนไม่ได้อยู่ในสถานที่สอบ</div>
      ) : isExam ? (
        <div className="border-2 border-[#2A3A50] p-2 rounded-md"> การสอบเปิดอยู่</div>
      ) : (
        <div className="bg-[#FF9811] py-4 px-8 border-dotted rounded-md">อนุญาตทำการทดสอบในพื้นที่ที่กำหนด</div>
      )}
    </div>
  );
};

export default AssignmentBox;
