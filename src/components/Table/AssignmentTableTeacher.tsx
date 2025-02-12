import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";
import ToggleButton from "@/components/Button/ToggleButton"; // นำเข้าคอมโพเนนต์ใหม่
import { OptionUser } from "@/components/Options/OptionUser";

interface Props {
    assignments: IAssignment;
    courseId: string;
}

const AssignmentTableTeacher: React.FC<Props> = ({ assignments, courseId }) => {
    const handleToggle = (assignmentId: string, newState: boolean) => {
        console.log(`Assignment ID: ${assignmentId}, New state: ${newState}`);
        // คุณสามารถทำการอัปเดตสถานะนี้ในฐานข้อมูลหรือใน state ที่อื่นได้
    };

    return (
        <div>
            {/* Table Header */}
            <div className="flex justify-center items-center px-2 rounded-lg pt-3 gap-x-4">
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center w-[500px]">
                    แบบฝึกหัด
                </div>
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center w-[140px]">
                    สถานะ
                </div>
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center w-[500px]">
                    ข้อย่อย
                </div>
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center w-[140px]">
                    คะแนน
                </div>
                <div className="text-white text-lg px-4 py-3 rounded-md  text-center w-[10px]">
                    
                </div>
            </div>
            
            {assignments.assignment?.map((assignment) => (
                <div key={assignment.assignmentId} className="flex justify-center items-center px-2 rounded-lg pt-3 gap-x-4">
                    <div className="text-white text-lg px-4 py-3 rounded-md w-[500px]">
                        {assignment.title}
                    </div>

                    {/* ใช้ ToggleButton ที่นี่ */}
                    <ToggleButton
                        initialState={assignment.isLock}
                        onToggle={(newState) => handleToggle(assignment.assignmentId, newState)}
                    />

                    <AssignmentBox assignment={assignment} courseId={courseId} />

                    <div className="text-white text-lg px-4 py-3 rounded-md text-center w-[140px]">
                        {assignment.totalScore}
                    </div>

                    <div className="text-white text-lg px-4 py-3 rounded-md text-center w-[10px]">
                         <OptionUser onClick={() => {}}  allowLogin={true}/>
                    </div>
                    
                </div>
            ))}
           
               
            
            </div>
        
    );
};

export default AssignmentTableTeacher;
