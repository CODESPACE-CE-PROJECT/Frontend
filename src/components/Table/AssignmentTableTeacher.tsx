import { IAssignment, IUpdateLock } from "@/types/assignment";
import ToggleButton from "@/components/Button/ToggleButton";
import { OptionAssignment } from "@/components/Options/OptionAssignment";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentBoxTeacher from "../Assignment/AssignmentBoxTeacher";
import { AnnounceAssignmentType } from "@/enum/enum";

interface Props {
  data: IAssignment[];
  onToggle: (updateForm: IUpdateLock) => void;
  handleDelete: (assignmentId: string) => void;
}

const AssignmentTableTeacher: React.FC<Props> = ({ data, onToggle, handleDelete }) => { 
  const handleToggle = (assignmentId: string,isLock: boolean) => {
    const updateLock: IUpdateLock = {
      assignmentId: assignmentId,
      isLock:isLock
    }
    onToggle(updateLock)
  };

  return (
    <table className="w-full border-separate border-spacing-4">
      <thead className="text-lg font-medium">
        <tr>
          <th className="py-4 rounded-md bg-table-header">แบบฝึกหัด</th>
          <th className="py-4 rounded-md bg-table-header">สถานะ</th>
          <th className="py-4 rounded-md bg-table-header">ข้อย่อย</th>
          <th className="py-4 rounded-md bg-table-header">คะแนน</th>
          <th className="py-4 rounded-md bg-transparent"></th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => (
            <tr key={item.assignmentId}>
              <td>
                <div className="flex flex-row gap-x-4 items-center">
                  <div className={`p-2 ${item.announceType === AnnounceAssignmentType.ANNOUNCED ? 'bg-[#EF4343]': 'bg-white text-black'} rounded-full`}>
                    <CampaignIcon fontSize="medium" />
                  </div>
                  <p>{index + 1}. {item.title}</p>
                </div>
              </td>
              <td>
                <div className="flex flex-row text-white text-lg rounded-md items-center justify-center">
                  <ToggleButton isChecked={!item.isLock} onToggle={() => handleToggle(item.assignmentId, !item.isLock)} />
                  <p className="ms-3 text-sm font-medium text-white">
                    {item.isLock ? "ปิด" : "เปิด"}
                  </p>
                </div>
              </td>
              <td>
                <AssignmentBoxTeacher data={item.problem} />
              </td>
              <td className="text-center">{item.totalScore}</td>
              <td className="w-4">
                <div className="flex flex-row w-full justify-center">
                  <OptionAssignment assignmentId={item.assignmentId} courseId={item.courseId} />
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default AssignmentTableTeacher;
