import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";

interface Props {
  data: IAssignment;
}

export const AssignmentBoxExam: React.FC<Props> = ({ data }) => {

  return (
    <div className="text-white text-lg text-center">
      {
        data.checkOutside && !data.isLock ? 
        <div className="text-white border border-dotted rounded-md py-5 bg-[#FF9811] bg-opacity-50">อนุญาตทำการทดสอบในพื้นที่ที่กำหนด</div>
        : data.checkOutside && data.isLock ? <div className="text-white border border-dotted rounded-md py-5 bg-opacity-50">อนุญาตทำการทดสอบในพื้นที่ที่กำหนด</div>:
        <AssignmentBox data={data.problem} isLock={data.isLock} />
      }
    </div>
  );
};


