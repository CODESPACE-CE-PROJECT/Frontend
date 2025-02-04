"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProblemById } from "../../../../../../services/problem.service";
import { useDispatch } from "react-redux";
import { setIsCloseCourseNav } from "@/app/store/slices/courseNavSlice";
import TextEditter from "@/app/components/TextEditter";
import { getCoursesById } from "../../../../../../services/announcement.service";
import { getAssignment } from "../../../../../../services/assignment.service";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

export default function AssignmentPage() {
  const params = useParams<{ courseId: string; problemId: string }>();
  const { problemId } = params;
  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const [problemDetails, setProblemDetails] = useState<any>(null);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("testAssigment");
  const dispatch = useDispatch();
  const [constraint, setProblemConstraint] = useState<any>(null);

  useEffect(() => {
    dispatch(setIsCloseCourseNav(true));

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const problemData = await getProblemById(problemId);
        setProblemDetails(problemData.data);

        const courseData = await getCoursesById(params.courseId);
        setCourseDetails(courseData.data);

        const assignment = await getAssignment(params.courseId);
        setAssignmentDetails(assignment.data);

        const constraintData = problemData?.data?.constraint || [];
        setProblemConstraint(constraintData);


        // Set selectedTitle based on problem's assignmentId
        const assignmentForProblem = assignment.data?.assignment?.find(
          (assignment: any) => assignment.assignmentId === problemData.data.assignmentId
        );
        if (assignmentForProblem) {
          setSelectedTitle(assignmentForProblem.title);
        }

      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [problemId, params.courseId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const courseTitle = courseDetails?.title || "N/A";
  const assignmentTitle =
    assignmentDetails?.assignment?.find(
      (assignment: any) => assignment.assignmentId === problemDetails?.assignmentId
    )?.title || "N/A";
  const problemTitle = problemDetails?.title || "N/A";

  const Header = ({ courseTitle, assignmentTitle, problemTitle }: any) => {
    const router = useRouter();

    const handleBack = () => {
      router.back();
     
    };

    return (
      <>
        <div className="flex flex-wrap gap-4 px-2 py-3 mb-5 ml-4 text-white">
          {assignmentDetails?.assignment
            ?.find((assignment: any) => assignment.title === selectedTitle)
            ?.problem?.map((problem: any, index: number) => {
              const isCurrentProblem = problem.problemId === problemDetails?.problemId;

              let bgColor;
              if (problem.stateSubmission === "NOTSEND") {
                bgColor = "bg-[#16233A]";
              } else if (problem.stateSubmission === "SUBMITTED") {
                bgColor = "bg-[#00DACC]";
              } else if (problem.stateSubmission === "WRONG_SUBMISSION") {
                bgColor = "bg-[#EF4343]";
              } else {
                bgColor = isCurrentProblem ? "bg-[#16233A]" : "bg-[#16233A]";
              }

              const displayText = problem.title || `${index + 1}`;

              return (
                <div
                  key={problem.problemId}
                  className={`px-4 py-2 rounded-lg ${bgColor} text-center`}
                  style={{ margin: "0.5rem" }}
                >
                  {isCurrentProblem ? problemDetails?.title : displayText}
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div className="mt-7 ml-4">
      <Header
        courseTitle={courseTitle}
        assignmentTitle={assignmentTitle}
        problemTitle={problemTitle}
      />
      <div className="flex flex-row">
        <div className="flex flex-col w-8/12 pl-4">
          <div className="p-2 pt-0 border border-[#2A3A50] text-xl text-[#C2C8CC] rounded-b-lg rounded-t-lg">
            <div className="text-white pt-5 pl-4 pr-4">
              <h2 className="font-bold mb-4 text-white text-center">{problemTitle}</h2>
              <p className="leading-7 mb-6">{problemDetails?.description}</p>
            </div>
          </div>
          <div className="bg-[#3A1617] mt-3 p-4 rounded-md flex">
            <div className="text-xl text-white font-bold mb-2">ข้อจำกัด</div>
            <ul className="text-white text-lg list-disc list-inside ml-3">

              {constraint?.map((constraintItem: any) => (

                <li key={constraintItem.constraintId}>{constraintItem.keyword}</li>
              ))}
            </ul>
          </div>

          <div className="pt-5">
            <div className="flex flex-col gap-y-5 max-h-[80vh] overflow-y-auto">
              {problemDetails?.testCases?.map((testCase: any, index: number) => (
                <div key={testCase.testCaseId}>
                  <div className="bg-[#161e2e] rounded-lg text-white pt-3 pl-2 pb-3 w-24 mb-3">
                    <div className="pl-2">ตัวอย่าง {index + 1}</div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <h1 className="font-bold mb-4 text-white">โจทย์ที่กำหนด</h1>
                      <div className="bg-[#29394f] rounded-lg p-4 mb-4">
                        <div className="text-gray-300 text-sm font-semibold">Input</div>
                        <div className="text-white mt-2">{testCase.input || "N/A"}</div>
                      </div>
                      <div className="bg-[#29394f] rounded-lg p-4">
                        <div className="text-gray-300 text-sm font-semibold">Output</div>
                        <div className="text-white mt-2">{testCase.output || "N/A"}</div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <h1 className="font-bold mb-4 text-white">ผลลัพธ์</h1>
                      <div className="bg-[#29394f] rounded-lg p-4 mb-4">
                        <div className="text-gray-300 text-sm font-semibold">Input</div>
                        <div className="text-white mt-2">Null</div>
                      </div>
                      <div className="bg-[#29394f] rounded-lg p-4">
                        <div className="text-gray-300 text-sm font-semibold">Output</div>
                        <div className="text-white mt-2">Null</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="ml-5">
          <TextEditter />
        </div>
      </div>
    </div>
  );
}
