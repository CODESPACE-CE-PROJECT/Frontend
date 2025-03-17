import { IAssignment } from "@/types/assignment";
import { AssignmentType } from "@/enum/enum";

interface Props {
  assignment: IAssignment;
  
  isStudentOnSite: boolean;
}

const AssignmentBox: React.FC<Props> = ({ assignment,  isStudentOnSite }) => {
  const isExam = assignment.type ===  AssignmentType.EXAMONLINE || assignment.type ===  AssignmentType.EXAMONSITE;
  const isExamActive = !assignment.isLock; // ถ้าการสอบไม่ถูกล็อก แสดงว่ากำลังเปิดสอบ
  const showWarning = isExam && isExamActive && !isStudentOnSite; // นักเรียนไม่ได้อยู่ที่สถานที่สอบ
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
