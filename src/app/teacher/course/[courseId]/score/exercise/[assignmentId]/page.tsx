"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignmentscore, getAssignment } from "@/actions/assignment";
import { IAssignmentScore, IAssignment } from "@/types/assignment";
import { SearchBar } from "@/components/Input/SerachBar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreUserTable from "@/components/Table/ScoreUserTable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation"; 

type AssignmentItem = IAssignmentScore["data"][number] & { totalScore: number };

export default function Score() {
  const { courseId, assignmentId } = useParams<{
    courseId: string;
    assignmentId: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); 
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<AssignmentItem[]>([]); 
  const [search, setSearch] = useState<string>(""); 
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);

  const router = useRouter(); 

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setIsLoading(true);

        
        const profileData = await getProfile();
        setProfile(profileData);

        
        const data = await getAssignmentscore(courseId);
        const assignmentsArray: IAssignmentScore["data"] = data.data;

        if (data?.data && Array.isArray(data.data)) {
          const filteredAssignments = assignmentsArray.filter(
            (assignment) => assignment.type === "EXERCISE"
          );

          const transformedAssignments: AssignmentItem[] = filteredAssignments.map((assignment) => ({
            ...assignment,
            totalScore: assignment.scores?.[0]?.totalScore || 0,
          }));

          setAssignments(transformedAssignments);
          setFilteredAssignments(transformedAssignments); 

          
          const assignment = transformedAssignments.find(
            (assignment) => assignment.assignmentId === assignmentId
          );
          setSelectedAssignment(assignment || null); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId, assignmentId]);

  useEffect(() => {
    if (assignments && Array.isArray(assignments)) {
      const newFilteredAssignments = assignments.filter((assignment) =>
        assignment.scores.some((score) => {
          const firstName = score.firstName ? score.firstName.toLowerCase() : "";
          const lastName = score.lastName ? score.lastName.toLowerCase() : "";
          const searchTerm = search.toLowerCase().trim();
          return (
            firstName.includes(searchTerm) || lastName.includes(searchTerm)
          );
        })
      );
      setFilteredAssignments(newFilteredAssignments);
    }
  }, [search, assignments]);

  const assignmentTitle = selectedAssignment?.title || "ไม่พบชื่อแบบฝึกหัด";

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
            <div className="flex items-center gap-2 ">
              <ArrowBackIosIcon className="" onClick={() => router.back()} />
              <p className="font-semibold">{assignmentTitle}</p>
            </div>
          </TopNav>

          <div className="mt-4 flex items-center gap-4">
            <SearchBar onChange={(value) => setSearch(value)} />

            <button className="bg-white text-[#5572FA] font-bold text-lg text-nowrap flex items-center justify-center gap-2 w-[160px] px-4 py-2 rounded-lg shadow-md hover:bg-[#f1f5ff] transition-all duration-200">
              <NoteAddIcon className="text-[#5572FA]" />
              ส่งออกไฟล์
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

      
          <ScoreUserTable assignments={filteredAssignments} assignmentId={assignmentId} />
        </>
      )}
    </>
  );
}
