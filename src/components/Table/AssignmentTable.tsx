import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";
import { AssignmentType } from "@/enum/enum";
import { AssignmentBoxExam } from "@/components/Assignment/AssignmentBoxExam";

interface Props {
  data: IAssignment[];
  titleTable: string;
}

const AssignmentList: React.FC<Props> = ({ data, titleTable }) => {
  return (
    <table className="w-full border-separate border-spacing-4">
      <thead className="text-lg font-medium">
        <tr>
          <th className="py-4 rounded-md bg-table-header">{titleTable}</th>
          <th className="py-4 rounded-md bg-table-header">ข้อย่อย</th>
          <th className="py-4 rounded-md bg-table-header">คะแนน</th>
          <th className="py-4 rounded-md bg-transparent"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.assignmentId}>
            <td>
              <div className="flex flex-row gap-x-4 items-center">
                <p>
                  {index + 1}. {item.title}
                </p>
              </div>
            </td>
            <td>
              {item.type === AssignmentType.EXAMONSITE ? (
                <AssignmentBoxExam data={item} />
              ) : (
                <AssignmentBox data={item.problem} isLock={item.isLock} />
              )}
            </td>
            <td className="text-center">{item.totalScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssignmentList;
