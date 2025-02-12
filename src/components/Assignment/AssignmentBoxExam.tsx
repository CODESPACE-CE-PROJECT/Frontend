import { IAssignment } from "@/types/assignment";
import { AssignmentType } from "@/enum/enum";
// ใช้ Enum จาก IAssignment

interface Props {
  assignment: IAssignment["assignment"][number];
  
  isStudentOnSite: boolean;
}

const AssignmentBox: React.FC<Props> = ({ assignment,  isStudentOnSite }) => {
  // ตรวจสอบว่าการสอบเป็นรูปแบบ Online หรือ Onsite
  const isExam = assignment.type ===  AssignmentType.EXAMONLINE || assignment.type ===  AssignmentType.EXAMONSITE;
  const isExamActive = !assignment.isLock; // ถ้าการสอบไม่ถูกล็อก แสดงว่ากำลังเปิดสอบ
  const showWarning = isExam && isExamActive && !isStudentOnSite; // นักเรียนไม่ได้อยู่ที่สถานที่สอบ

  return (
    <div className="text-white text-lg">
      {showWarning ? (
        <p className="text-yellow-400">⚠️ นักเรียนไม่ได้อยู่ในสถานที่สอบ</p>
      ) : isExam ? (
        <p className="border-2 border-[#2A3A50] p-2 rounded-md">📌 การสอบเปิดอยู่</p>
      ) : (
        <p className="border border-[#2A3A50] py-4 px-8 border-dotted">อนุญาตทำการทดสอบในพื้นที่ที่กำหนด</p>
      )}
    </div>
  );
};

export default AssignmentBox;
