"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { IAssignment } from "@/types/assignment";
import AssignmentTable from "@/components/Table/AssignmentTable";
import NavigationTab from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";

export default function Assignment() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<IAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);

      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        if (data) {
          const filteredAssignments = data.data.assignment.filter(
            (assignment: IAssignment["assignment"][number]) =>
              assignment.type === "EXERCISE"
          );

          setAssignments({ assignment: filteredAssignments });
        }
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [courseId, param.courseId]);


  if (error) return <div>Error: {error}</div>;

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
          >
            <p>แบบฝึกหัด</p>
          </TopNav>
          <NavigationTab
            courseId={courseId}
            basePath={`/student/course/${courseId}/assignment`}
          />

          <div className="mt-4">
            {assignments && (
              <AssignmentTable assignments={assignments}/>
            )}
          </div>
        </>)}
    </>

  );
}
