"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignmentByCourseId } from "@/actions/assignment";
import { IAssignmentStudent } from "@/types/assignment";
import AssignmentTable from "@/components/Table/AssignmentTable";
import NavigationTab from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { AssignmentType } from "@/enum/enum";

export default function Assignment() {
  const param = useParams<{ courseId: string }>();
  const [assignments, setAssignments] = useState<IAssignmentStudent>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile)

      const data: IAssignmentStudent = await getAssignmentByCourseId(param.courseId);
      const filteredAssignments = data.assignment.filter((item) => item.type === AssignmentType.EXERCISE);
      setAssignments({
        assignment: filteredAssignments,
        dashboard: data.dashboard
      })
      setLoading(false);
    };

    fetchAssignments();
  }, [param.courseId]);


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
            <p>แบบฝึกหัด</p>
          </TopNav>
          <NavigationTab
            courseId={param.courseId}
            basePath={`/student/course/${param.courseId}/assignment`}
          />

          <div className="mt-4">
            {assignments && (
              <AssignmentTable data={assignments.assignment} titleTable="แบบฝึกหัด" />
            )}
          </div>
        </>)}
    </>

  );
}
