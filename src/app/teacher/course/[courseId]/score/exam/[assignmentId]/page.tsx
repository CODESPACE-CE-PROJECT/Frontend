"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignmentscore } from "@/actions/assignment";
import { IAssignmentScore } from "@/types/assignment";
import { SearchBar } from "@/components/Input/SerachBar";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreUserTable from "@/components/Table/ScoreUserTable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation"; 
import ExportButtonScoreUser from "@/components/Button/ExportButtonScoreUser";

export default function Score() {
  const { courseId, assignmentId } = useParams<{
    courseId: string;
    assignmentId: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assignment, setAssignment] = useState<IAssignmentScore>();
  const [filterUserAssignments, setFilterUserAssignments] = useState<IAssignmentScore["scores"]>();
  const [search, setSearch] = useState<string>(""); 
  const [profile, setProfile] = useState<IProfile | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchAssignments = async () => {
        const profileData = await getProfile();
        setProfile(profileData);

        const data:IAssignmentScore[] = await getAssignmentscore(courseId);
        setAssignment(data.filter((item) => item.assignmentId === assignmentId)[0]);
        setFilterUserAssignments(data.filter((item) => item.assignmentId === assignmentId)[0].scores);
        setIsLoading(false);
    };

    fetchAssignments();
  }, [courseId, assignmentId]);

  useEffect(() => {
    setFilterUserAssignments(assignment?.scores.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase())))
  }, [search]);


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
              <ArrowBackIosIcon className="cursor-pointer hover:text-primary" onClick={() => router.back()} />
              <p className="font-semibold">{assignment?.title}</p>
            </div>
          </TopNav>

          <div className="mt-4 flex items-center gap-4">
            <SearchBar onChange={(value) => setSearch(value)} />
            <ExportButtonScoreUser assignment={assignment} />
          </div>
          <ScoreUserTable assignment={assignment && { ...assignment, assignmentId: assignment.assignmentId || "", scores: filterUserAssignments || [] }} />
        </>
      )}
    </>
  );
}
