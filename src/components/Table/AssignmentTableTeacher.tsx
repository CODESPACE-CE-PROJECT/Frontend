import { useState } from "react";
import { IAssignment, IUpdateLock } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";
import ToggleButton from "@/components/Button/ToggleButton";
import { OptionAssignment } from "@/components/Options/OptionAssignment";
import CampaignIcon from '@mui/icons-material/Campaign';
import AssignmentBoxTeacher from "../Assignment/AssignmentBoxTeacher";

interface Props {
    assignments: IAssignment;
    courseId: string;
    onToggle: (assignmentData: IUpdateLock) => void;
}

const AssignmentTableTeacher: React.FC<Props> = ({ assignments, courseId, onToggle }) => {
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
                <div className="text-white text-lg px-4 py-3 rounded-md text-center w-[10px]">
                </div>
            </div>

            {assignments.assignment?.map((assignment) => {
                const [isChecked, setIsChecked] = useState(assignment.isLock);

                const handleToggle = (newState: boolean) => {
                    setIsChecked(newState);
                    onToggle({ assignmentId: assignment.assignmentId, isLock: newState });
                };

                return (
                    <div key={assignment.assignmentId} className="flex justify-center items-center px-2 rounded-lg pt-3 gap-x-4">
                        <div className="text-white text-lg px-4 py-3 rounded-md  w-[500px] flex items-center">
                            <div className={`rounded-full p-0.5 mr-2 ${assignment.isLock ? "bg-[#EF4343] text-white" : "bg-white text-black"}`}>
                                <CampaignIcon />
                            </div>
                            {assignment.title}
                        </div>

                        {/* ToggleButton */}
                        <div className="text-white text-lg px-4 py-3 rounded-md  w-[140px] flex items-center justify-center">
                            <ToggleButton initialState={isChecked} onToggle={handleToggle} />
                            <span className="ms-3 text-sm font-medium text-white">
                                {isChecked ? "เปิด" : "ปิด"}
                            </span>
                        </div>

                        <div className="text-white text-lg px-4 py-3 rounded-md  w-[500px]">
                            <AssignmentBoxTeacher assignment={assignment} courseId={courseId} />
                        </div>

                        <div className="text-white text-lg px-4 py-3 rounded-md  text-center w-[140px]">
                            {assignment.totalScore}
                        </div>

                        <div className="text-white text-lg px-4 py-3 rounded-md  text-center w-[10px]">
                            <OptionAssignment assignmentId={assignment.assignmentId} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AssignmentTableTeacher;
