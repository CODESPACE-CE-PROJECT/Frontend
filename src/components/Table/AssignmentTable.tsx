import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";

interface Props {
  data: IAssignment[];
}

const AssignmentList: React.FC<Props> = ({ data }) => {
  return (
    <table className="w-full border-separate border-spacing-4">
          <thead className="text-lg font-medium">
            <tr>
              <th className="py-4 rounded-md bg-table-header">แบบฝึกหัด</th>
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
                      <p>{index + 1}. {item.title}</p>
                    </div>
                  </td>
                  <td>
                    <AssignmentBox data={item.problem}  isLock={item.isLock} />
                  </td>
                  <td className="text-center">{item.totalScore}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    // <>
    //   <div className="flex justify-center items-center rounded-lg pt-3 space-x-4">
    //     <div className="flex-1 text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-6/12">
    //       แบบฝึกหัด
    //     </div>
    //     <p className="flex text-white text-lg py-3 rounded-md bg-[#161f2e] justify-center items-center w-4/12">
    //       ข้อย่อย
    //     </p>
    //     <div className="flex text-white text-lg py-3 rounded-md bg-[#161f2e] justify-center items-center w-2/12">
    //       คะแนน
    //     </div>
    //   </div>

    //   {data.assignment.map((assignment) => (
    //     <div
    //       key={assignment.assignmentId}
    //       className="flex justify-between items-center rounded-lg space-x-4"
    //     >
    //       <div className="flex-1 text-white text-lg px-4 py-3 rounded-md text-start w-6/12 my-5">
    //         {assignment.title}
    //       </div>

    //       <AssignmentBox assignment={assignment} />

    //       <div className="flex text-white text-lg px-4 py-3 justify-center text-center w-2/12">
    //         {assignment.totalScore}
    //       </div>
    //     </div>
    //   ))}
    // </>
  );
};

export default AssignmentList;
