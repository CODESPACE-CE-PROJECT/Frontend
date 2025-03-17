"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignmentByCourseId } from "@/actions/assignment";
import { IAssignment, IAssignmentStudent, IDashboard } from "@/types/assignment";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreTable from "@/components/Table/ScoreTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreChart from "@/components/Dashboard/ScoreChart";
import { AssignmentType } from "@/enum/enum";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<IAssignment[]>();
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);
  const [profile, setProfile] = useState<IProfile>();
  const [dashboard, setDashboard] = useState<IDashboard>();

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      if (courseId) {
        const profile: IProfile = await getProfile();
        setProfile(profile);
        const data: IAssignmentStudent = await getAssignmentByCourseId(courseId);
        const exerciseAssignments = data.assignment.filter((item) => item.type !== AssignmentType.EXERCISE)
        setAssignments(exerciseAssignments)
        const overallTotalScore = exerciseAssignments.reduce((acc: number, assignment) => acc + (assignment.totalScore ?? 0), 0)
        setTotalScore(overallTotalScore)
        const overallMaxTotalScore = exerciseAssignments.reduce((acc: number, assignment) => acc + (assignment.problem.reduce((sum: number, problem) => sum + problem.score, 0) ?? 0), 0)
        setMaxTotalScore(overallMaxTotalScore)
        setDashboard(data.dashboard)
        setLoading(false)
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
