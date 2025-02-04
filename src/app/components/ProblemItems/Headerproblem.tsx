import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface HeaderProps {
  assignmentDetails: any;
  selectedTitle: string;
  problemDetails: any;
  params: { courseId: string };  // Accept params directly
}

const Header: React.FC<HeaderProps> = ({
  assignmentDetails,
  selectedTitle,
  problemDetails,
  params
}) => {
  return (
    <>
      
      <div className="flex flex-wrap gap-4 py-3 mb-5 ml-4 text-white">
        {assignmentDetails?.assignment
          ?.find((assignment: any) => assignment.title === selectedTitle)
          ?.problem?.map((problem: any, index: number) => {
            const isCurrentProblem = problem.problemId === problemDetails?.problemId;

            let bgColor;
            if (problem.stateSubmission === 'NOTSEND') {
              bgColor = "bg-[#16233A]";
            } else if (problem.stateSubmission === 'PASS') {
              bgColor = "bg-[#00DACC]";
            } else if (problem.stateSubmission === 'FAILED') {
              bgColor = "bg-[#EF4343]";
            } else {
              bgColor = isCurrentProblem ? "bg-[#16233A]" : "bg-[#16233A]";
            }

            const displayText = problem.title || `${index + 1}`;

            return (
              <div
                key={problem.problemId}
                className={`px-4 py-2 rounded-lg ${bgColor} text-center cursor-pointer`}
                style={{ margin: "0.5rem" }}
                onClick={() =>
                  window.location.href = `/student/courses/${params.courseId}/assignment/homeworkassignment/${problem.problemId}` // Direct navigation
                }
              >
                {isCurrentProblem ? problemDetails?.title : displayText}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Header;
