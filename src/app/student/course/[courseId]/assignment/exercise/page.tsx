"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { getCoursesById } from "@/actions/announcement";
import Link from "next/link";
import { IAssignment } from "@/types/assignment";
import AssignmentTable from "@/components/Table/AssignmentTable";
import NavigationButton from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";

export default function Assignment() {
  const router = useRouter();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <TopNav
        disableNotification={false}
        imageUrl={profile?.pictureUrl}
        role={profile?.role}
        gender={profile?.gender}
      >
        <p>แบบฝึกหัด</p>
      </TopNav>
      <NavigationButton
        courseId={courseId}
        basePath={`/student/course/${courseId}/assignment`}
      />

      <div className="mt-4">
        {assignments && (
          <AssignmentTable assignments={assignments} courseId={courseId} />
        )}
      </div>
    </>
  );
}
