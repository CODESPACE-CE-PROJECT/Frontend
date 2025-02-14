"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { IAssignment, ICreateAssignment, IUpdateLock } from "@/types/assignment";
import AssignmentTableTeacher from "@/components/Table/AssignmentTableTeacher";
import NavigationTab from "@/components/Tab/NavigationTab";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import { CreateAssignmentModal } from "@/components/Modals/CreateAssignmentModal";
import { createAssignment } from "@/actions/assignment";
import { AssignmentType } from "@/enum/enum"

import { UpdatedLockAssignment } from "@/actions/assignment";

export default function Assignment() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<IAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [title, setTitle] = useState("");
  const [type, setType] = useState<"EXERCISE" | "EXAMONSITE" | "EXAMONLINE">("EXERCISE");
  const [announceDate, setAnnounceDate] = useState("");
  const [startAt, setStartAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [formData, setFormData] = useState<ICreateAssignment>({
    title: "",
    type: AssignmentType.EXERCISE,  // ใช้ค่าเริ่มต้นจาก enum
    announceDate: "",
    startAt: "",
    expireAt: "",
    courseId: courseId,
  });



  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        if (Array.isArray(data.data)) {
          const filteredAssignments = data.data.filter(
            (assignment: IAssignment["assignment"][number]) => assignment.type === "EXAMONLINE" || assignment.type === "EXAMONSITE"
          );
          if (filteredAssignments.length > 0) {
            setAssignments({ assignment: filteredAssignments });
          } else {
            console.error("No assignments of type EXERCISE.");
          }
        } else {
          console.error("Data.data is not an array.");
        }
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [courseId, param.courseId]);

  const handleCreateAssignment = () => {
    console.log("Creating assignment", { title, type, announceDate, startAt, expireAt });
    setIsModalOpen(false);
  };

  const handleInputChange = (value: string | number, name: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      } as ICreateAssignment
    })
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

          <div className="flex justify-between items-center pt-2 ">
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
                courseId={courseId}
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
