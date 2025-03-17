"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignmentByCourseId } from "@/actions/assignment";
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
import { updatedLockAssignment } from "@/actions/assignment";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";

export default function Assignment() {
  const param = useParams<{ courseId: string }>();
  const [assignments, setAssignments] = useState<IAssignment[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<ICreateAssignment>({
    title: "",
    type: AssignmentType.EXERCISE,
    announceDate: new Date(""),
    startAt: new Date(""),
    expireAt: new Date(""),
    courseId: param.courseId,
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
      const filteredAssignments = data.filter((item) => item.type === AssignmentType.EXERCISE);
      setAssignments(filteredAssignments)
      setLoading(false);
    };
    fetchAssignments();
  }, [param.courseId]);

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
      courseId: param.courseId,
    };

    const id = notify(NotifyType.LOADING, "กำลังสร้างแบบฝึกหัด...");

    try {
      const result = await createAssignment(assignmentData);
      setIsModalOpen(false);
      if (id) {
        updateNotify(id, NotifyType.SUCCESS, "สร้างแบบฝึกหัดสำเร็จ!");
      }

    } catch (error) {
      console.log("Error creating assignment:", error);
      if (id) {
        updateNotify(id, NotifyType.ERROR, "ไม่สามารถสร้างแบบฝึกหัดได้");
      }
    }
  };

  const handleToggle = async (updateForm: IUpdateLock) => {
    const id = notify(NotifyType.LOADING, "กำลังแก้ไขแบบฝึกหัด")
    const { status } = await updatedLockAssignment(updateForm);
    if (id) {
      if (status === 200) {
        const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
        const filteredAssignments = data.filter((item) => item.type === AssignmentType.EXERCISE);
        setAssignments(filteredAssignments)
        updateNotify(id, NotifyType.SUCCESS, "แก้ไขแบบฝึกหัดสำเร็จ")
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขแบบฝึกหัด")
      }
    }
  };

  const handleDelete = async (assignmentId: string) => {
    const id = notify(NotifyType.LOADING, "กำลังลบแบบฝึกหัด");
    const {status} = await deleteAssignment(assignmentId);
    if (id) {
      if(status === 200){
        const data: IAssignment[] = await getAssignmentByCourseId(param.courseId);
        const filteredAssignments = data.filter((item) => item.type === AssignmentType.EXERCISE);
        setAssignments(filteredAssignments)
        updateNotify(id, NotifyType.SUCCESS, "ลบแบบฝึกหัดสำเร็จ");
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผลาดในการลบแบบฝึกหัด");
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
              courseId={param.courseId}
              basePath={`/teacher/course/${param.courseId}/assignment`}
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
                data={assignments}
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
