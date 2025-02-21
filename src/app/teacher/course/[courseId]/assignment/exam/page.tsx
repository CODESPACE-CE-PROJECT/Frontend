"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import {
  IAssignment,
  ICreateAssignment,
  IUpdateLock,
} from "@/types/assignment";
import AssignmentTableTeacher from "@/components/Table/AssignmentTableTeacher";
import NavigationTab from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { CreateAssignmentModal } from "@/components/Modals/CreateAssignmentModal";
import { createAssignment } from "@/actions/assignment";
import { AssignmentType } from "@/enum/enum";

import { UpdatedLockAssignment } from "@/actions/assignment";

export default function Assignment() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<IAssignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<ICreateAssignment>({
    title: "",
    type: AssignmentType.EXAMONSITE,
    announceDate: new Date(""),
    startAt: new Date(""),
    expireAt: new Date(""),
    courseId: courseId,
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      const data = await getAssignment(courseId);

      const filteredAssignments = data.data.filter(
        (assignment: IAssignment["assignment"][number]) =>
          assignment.type === AssignmentType.EXAMONLINE ||
          assignment.type === AssignmentType.EXAMONSITE
      );
      if (filteredAssignments.length > 0) {
        setAssignments({ assignment: filteredAssignments });
      } else {
        console.error("No assignments of type EXAM.");
      }

      setLoading(false);
    };

    fetchAssignments();
  }, [courseId, param.courseId]);

  const handleInputChange = (value: string | number, name: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      } as ICreateAssignment;
    });
  };

  const handleSubmit = async () => {
    const assignmentData = {
      ...formData,
      courseId,
    };

    try {
      const result = await createAssignment(assignmentData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleToggle = async (assignmentData: IUpdateLock) => {
    await UpdatedLockAssignment(assignmentData);
    setAssignments((prevAssignments) => {
      if (!prevAssignments) return prevAssignments;
      const updatedAssignments = prevAssignments.assignment.map((assignment) =>
        assignment.assignmentId === assignmentData.assignmentId
          ? { ...assignment, isLock: assignmentData.isLock }
          : assignment
      );
      return { assignment: updatedAssignments };
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            className="mb-6"
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            role={profile?.role}
          >
            <p>แบบฝึกหัด</p>
          </TopNav>

          <div className="flex justify-between items-center">
            <NavigationTab
              courseId={courseId}
              basePath={`/teacher/course/${courseId}/assignment`}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5572FA] text-white px-4 py-3 rounded-[6px] text-center h-14 text-nowrap"
            >
              สร้างแบบฝึกหัด/การทดสอบ
            </button>
          </div>

          <div className="mt-4">
            {assignments && (
              <AssignmentTableTeacher
                assignments={assignments}
                onToggle={handleToggle}
              />
            )}
          </div>

          {/* CreateAssignmentModal - Add to bottom of the page */}
          <CreateAssignmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            handleInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
}
