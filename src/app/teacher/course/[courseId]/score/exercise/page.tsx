"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IAssignment } from "@/types/assignment";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreTable from "@/components/Table/ScoreTable";
import { getAssignmentscore } from "@/actions/assignment"

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignments, setAssignments] = useState<IAssignment["assignment"]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      if (courseId) {
        try {
          const data = await getAssignmentscore(courseId);
          console.log(data);

          if (data?.data?.assignment && Array.isArray(data.data.assignment)) {
            const exerciseAssignments = data.data.assignment.filter(
              (assignment: IAssignment["assignment"][number]) => assignment.type === "EXERCISE"
            );


            setAssignments(exerciseAssignments ?? []);

            const overallTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: IAssignment["assignment"][number]) => acc + (assignment.totalScore ?? 0),
              0
            );


            setTotalScore(overallTotalScore);

            const overallMaxTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: IAssignment["assignment"][number]) =>
                acc + (assignment.problem?.reduce((sum: number, problem) => sum + problem.score, 0) ?? 0),
              0
            );

            setMaxTotalScore(overallMaxTotalScore);
          } else {
            setError("Failed to fetch assignments or data is not in expected format.");
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
      <NavigationTab courseId={courseId} basePath={`/teacher/course/${courseId}/score`} />
      <ScoreTable assignments={assignments} isLoading={isLoading} error={error} />

      <div className="flex justify-end px-8 py-4">
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-8">
          คะแนนรวม {totalScore} / {maxTotalScore}
        </div>
      </div>
    </>
  );
}
