"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { IAssignment } from "@/types/assignment";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreTable from "@/components/Table/ScoreTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignments, setAssignments] = useState<IAssignment["assignment"]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      if (courseId) {
        try {
          const data = await getAssignment(courseId);
          const profile: IProfile = await getProfile();
          setProfile(profile);
          if (data?.data?.assignment && Array.isArray(data.data.assignment)) {
            const exerciseAssignments = data.data.assignment.filter(
              (assignment: IAssignment["assignment"][number]) =>
                assignment.type === "EXAMONSITE" ||
                assignment.type === "EXAMONLINE"
            );

            setAssignments(exerciseAssignments ?? []);

            const overallTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: IAssignment["assignment"][number]) =>
                acc + (assignment.totalScore ?? 0),
              0
            );

            setTotalScore(overallTotalScore);

            const overallMaxTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: IAssignment["assignment"][number]) =>
                acc +
                (assignment.problem?.reduce(
                  (sum: number, problem) => sum + problem.score,
                  0
                ) ?? 0),
              0
            );

            setMaxTotalScore(overallMaxTotalScore);
          } else {
            setError(
              "Failed to fetch assignments or data is not in expected format."
            );
          }
        } catch (err) {
          setError("An error occurred while fetching assignments.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAssignments();
  }, [courseId]);

  return (
    <>
      <TopNav
        disableNotification={false}
        imageUrl={profile?.pictureUrl}
        role={profile?.role}
      >
        คะแนน
      </TopNav>
      <NavigationTab
        courseId={courseId}
        basePath={`/student/course/${courseId}/score`}
      />
      <ScoreTable
        assignments={assignments}
        isLoading={isLoading}
        error={error}
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
  );
}
