"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { IAssignment, IDashboard } from "@/types/assignment";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreTable from "@/components/Table/ScoreTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreChart from "@/components/Dashboard/ScoreChart";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignments, setAssignments] = useState<IAssignment["assignment"]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);
  const [profile, setProfile] = useState<IProfile>();
  const [dashboard, setDashboard] = useState<IDashboard>({
    maxScore: 0,
    minScore: 0,
    averageScore: 0,
    totalStudent: 0,
    range: [
      {
        range: "0-5",
        count: 0,
      },
      {
        range: "6-10",
        count: 0,
      },
      {
        range: "11-15",
        count: 0,
      },
      {
        range: "16-20",
        count: 0,
      },
      {
        range: "21-25",
        count: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
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
            setDashboard(data.data.dashboard);
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
          setLoading(false);
        }
      }
    };

    fetchAssignments();
  }, [courseId]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
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
            error={error}
          />

          <div className="flex justify-between items-center rounded-lg my-6">
            <p className="flex-1 text-white text-lg rounded-md text-end mr-4">
              คะแนนรวม
            </p>
            <p className="flex w-36 text-white text-lg px-4 py-3 rounded-md text-center items-center justify-center">
              {totalScore} / {maxTotalScore}
            </p>
          </div>

          {dashboard && (
            <div className="flex flex-row justify-evenly w-full space-x-2">
              <div className="relative flex flex-col items-center w-1/2">
                <p className="text-lg space-x-2 mb-6">
                  <span>ผู้เรียนภายในคอร์ส</span>
                  <span>{dashboard.totalStudent}</span>
                  <span>คน</span>
                </p>
                <ScoreChart data={dashboard.range} />
                <div className="absolute flex bottom-5 space-x-9">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#5572FA] rounded-full"></div>
                    <p className="text-sm">ผู้เรียน</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-[#2A3A50] rounded-full"></div>
                    <p className="text-sm">ทั้งหมด</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col items-center w-1/2 space-y-10">
                <p className="text-lg space-x-2">
                  <span>ผลรวมการทดสอบ</span>
                </p>
                <div className="w-full flex flex-row items-center justify-center space-x-4">
                  <div className="flex w-[10rem] h-[10rem] flex-col text-center justify-center bg-[#3049724D] rounded-md p-5">
                    <p className="text-lg pb-5">คะแนนสูงสุด</p>
                    <p className="text-4xl break-words">{dashboard.maxScore}</p>
                    <p className="text-sm">คะแนน</p>
                  </div>
                  <div className="flex w-[10rem] h-[10rem] flex-col text-center justify-center bg-[#3049724D] rounded-md p-5 ">
                    <p className="text-lg pb-5">คะแนนต่ำสุด</p>
                    <p className="text-4xl break-words">{dashboard.minScore}</p>
                    <p className="text-sm">คะแนน</p>
                  </div>
                  <div className="flex w-[10rem] h-[10rem] flex-col text-center justify-center bg-[#3049724D] rounded-md p-5">
                    <p className="text-lg pb-5">ค่าเฉลี่ยคะแนน</p>
                    <p className="text-4xl break-words">
                      {dashboard.averageScore}
                    </p>
                    <p className="text-sm">คะแนน</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
