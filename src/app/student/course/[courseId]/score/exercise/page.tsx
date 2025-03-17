"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignmentByCourseId } from "@/actions/assignment";
import { IAssignmentStudent, IAssignment } from "@/types/assignment";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreTable from "@/components/Table/ScoreTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { AssignmentType } from "@/enum/enum";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;
  const [loading, setIsLoading] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<IAssignment[]>();
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      if (courseId) {
          const profile: IProfile = await getProfile();
          setProfile(profile);

          const data:IAssignmentStudent = await getAssignmentByCourseId(courseId);
          const exerciseAssignments = data.assignment.filter((item) => item.type === AssignmentType.EXERCISE)
          setAssignments(exerciseAssignments)
          const overallTotalScore = exerciseAssignments.reduce((acc: number, assignment) => acc + (assignment.totalScore ?? 0), 0)
          setTotalScore(overallTotalScore)
          const overallMaxTotalScore = exerciseAssignments.reduce((acc: number, assignment) => acc + (assignment.problem.reduce((sum: number, problem) => sum + problem.score, 0) ?? 0),0)
          setMaxTotalScore(overallMaxTotalScore)
          
          setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  return (
    <>
      {loading ? (
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
            คะแนน
          </TopNav>
          <NavigationTab
            courseId={courseId}
            basePath={`/student/course/${courseId}/score`}
          />
          <ScoreTable
            assignments={assignments}
            isLoading={loading}
          />

          <div className="flex justify-between items-center rounded-lg mt-6">
            <p className="flex-1 text-white text-lg rounded-md text-end mr-4">
              คะแนนรวม
            </p>
            <p className="flex w-36 text-white text-lg px-4 py-3 rounded-md text-center items-center justify-center">
              {totalScore} / {maxTotalScore}
            </p>
          </div>
        </>
      )}
    </>
  );
}
