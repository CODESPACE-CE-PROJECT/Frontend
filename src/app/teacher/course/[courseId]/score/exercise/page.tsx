"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreAssignTable from "@/components/Table/ScoreAssignTable";
import {
  getAssignmentscore,
  getAssignmentByCourseId,
} from "@/actions/assignment";
import { IAssignmentScore, IAssignment } from "@/types/assignment";
import { SearchBar } from "@/components/Input/SerachBar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreStdTable from "@/components/Table/ScoreStdTable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExportButton from "@/components/Button/ExportButton";

type AssignmentItem = IAssignmentScore["data"][number] & { totalScore: number };

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [profile, setProfile] = useState<IProfile>();
  const [selectedView, setSelectedView] = useState<"แบบฝึกหัด" | "ผู้เรียน">(
    "แบบฝึกหัด"
  );
  const [assignmentLock, setAssignmentLock] = useState<{
    [assignmentId: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchAssignments = async () => {
      if (courseId) {
        try {
          const profile: IProfile = await getProfile();
          setProfile(profile);

          const data = await getAssignmentscore(courseId);
          if (data?.data && Array.isArray(data.data)) {
            const assignmentsArray: IAssignmentScore["data"] = data.data;

            const filteredAssignments = assignmentsArray.filter(
              (assignment: IAssignmentScore["data"][number]) =>
                assignment.type === "EXERCISE"
            );

            const transformedAssignments: AssignmentItem[] =
              filteredAssignments.map((assignment) => ({
                ...assignment,
                totalScore:
                  assignment.scores && assignment.scores.length > 0
                    ? assignment.scores[0].totalScore
                    : 0,
              }));

            setAssignments(transformedAssignments);
          } else {
            setError(
              "Failed to fetch assignments or data is not in expected format."
            );
          }

          const assignmentData = await getAssignmentByCourseId(courseId);

          const lockStatus: { [assignmentId: string]: boolean } = {};

          assignmentData.data?.map((assignment: IAssignment) => {
            lockStatus[assignment.assignmentId] = assignment.isLock;
          });

          setAssignmentLock(lockStatus);
        } catch (err) {
          console.error("Fetch error:", err);
          setError("An error occurred while fetching assignments.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAssignments();
  }, [courseId]);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            role={profile?.role}
            gender={profile?.gender}
          >
            <p>คะแนน</p>
          </TopNav>

          <div className="mt-4 flex items-center gap-4">
            <NavigationTab
              courseId={courseId}
              basePath={`/teacher/course/${courseId}/score`}
            />

            <div className="flex flex-col">
              <select
                className="px-4 w-[160px] rounded-md border border-[#2A3A50] bg-[#0c121c] text-white my-2"
                value={selectedView}
                onChange={(e) =>
                  setSelectedView(e.target.value as "แบบฝึกหัด" | "ผู้เรียน")
                }
              >
                <option value="แบบฝึกหัด">แบบฝึกหัด</option>
                <option value="ผู้เรียน">ผู้เรียน</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <SearchBar onChange={(value) => setSearch(value)} />
            <ExportButton assignments={assignments} />{" "}
           
          </div>

          {selectedView === "แบบฝึกหัด" ? (
            <ScoreAssignTable
              assignments={filteredAssignments}
              assignmentLock={assignmentLock}
              courseId={courseId}
            />
          ) : (
            <ScoreStdTable assignments={filteredAssignments} />
          )}
        </>
      )}
    </>
  );
}
