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
import { createAssignment, deleteAssignment } from "@/actions/assignment";
import { AssignmentType } from "@/enum/enum";
import { UpdatedLockAssignment } from "@/actions/assignment";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util"; // นำเข้า notify ฟังก์ชัน
import { NotifyType } from "@/enum/enum"; // นำเข้า NotifyType

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

  // Function to fetch assignments
  const fetchAssignments = async () => {
    const profile: IProfile = await getProfile();
    setProfile(profile);
    const data = await getAssignment(courseId);

    const filteredAssignments = data.data?.filter(
      (assignment: IAssignment["assignment"][number]) =>
        assignment.type === AssignmentType.EXAMONLINE ||
        assignment.type === AssignmentType.EXAMONSITE
    );
    if (filteredAssignments.length > 0) {
      setAssignments({ assignment: filteredAssignments });
    } else {
      console.log("No assignment:");
    }

    setLoading(false);
  };

  useEffect(() => {
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

    const id = notify(NotifyType.LOADING, "กำลังสร้างแบบฝึกหัด...");

    try {
      const result = await createAssignment(assignmentData);
      setIsModalOpen(false);
      if (id) {
        updateNotify(id, NotifyType.SUCCESS, "สร้างแบบฝึกหัดสำเร็จ!");
      }
      // Fetch assignments again after creating a new one
      await fetchAssignments(); // Re-fetch assignments after creation
    } catch (error) {
      console.log("Error creating assignment:", error);
      if (id) {
        updateNotify(id, NotifyType.ERROR, "ไม่สามารถสร้างแบบฝึกหัดได้");
      }
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

  const handleDelete = async (assignmentId: string) => {
    const id = notify(NotifyType.LOADING, "กำลังลบแบบฝึกหัด...");

    try {
      await deleteAssignment(assignmentId);
      setAssignments((prevAssignments) => {
        if (!prevAssignments) return prevAssignments;
        const updatedAssignments = prevAssignments.assignment.filter(
          (assignment) => assignment.assignmentId !== assignmentId
        );
        return { assignment: updatedAssignments };
      });

      if (id) {
        updateNotify(id, NotifyType.SUCCESS, "ลบแบบฝึกหัดสำเร็จ!");
      }
    } catch (error) {
      console.log("Error deleting assignment:", error);
      if (id) {
        updateNotify(id, NotifyType.ERROR, "ไม่สามารถลบแบบฝึกหัดได้");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            className="mb-6"
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            gender={profile?.gender}
            role={profile?.role}
          >
            <p>แบบฝึกหัด</p>
          </TopNav>

          <div className="flex justify-between items-center">
            <NavigationTab
              courseId={courseId}
              basePath={`/teacher/course/${courseId}/assignment`}
            />
            <ConfirmButton
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5572FA] text-white px-4 py-3 rounded-[6px] text-center h-14 text-nowrap"
            >
              สร้างแบบฝึกหัด/การทดสอบ
            </ConfirmButton>
          </div>

          <div className="mt-4">
            {assignments && (
              <AssignmentTableTeacher
                assignments={assignments}
                onToggle={handleToggle}
                handleDelete={handleDelete}
              />
            )}
          </div>

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
