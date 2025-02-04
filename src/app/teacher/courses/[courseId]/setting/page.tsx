"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CourseBg from "@/app/assets/CoursesAssets/CourseBg.png";
import { useParams } from "next/navigation";
import {
  getCoursesById,
  editCourse,
  uploadCoursePicture,
} from "@/app/services/course.service";

export default function Setting() {
  const param = useParams<{ courseId: string }>();
  const courseId = param?.courseId;

  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await getCoursesById(courseId);
        // console.log("Fetched data:", response?.data);

        if (response?.data) {
          setCourseDetails(response.data);
          setEditData({
            title: response.data.title || "",
            description: response.data.description || "",
          });
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      }
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

  const handleEditClick = async () => {
    if (!editData || !courseId) return;
    console.log("handle Edit Click");
    try {
      const response = await editCourse(courseId, editData);
      setCourseDetails((prev: any) => ({
        ...prev,
        ...response,
      }));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleFileChange = async (e: any) => {
    const file: File = e.target.files[0];
    if (file) {
      await uploadCoursePicture(courseId, file);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="justify-self-center ">
        <div className="flex flex-row space-x-16 mb-80">
          <div className="items-center justify-items-center space-y-5">
            {courseDetails?.backgroundUrl ? (
              <Image
                className="self-center rounded-2xl w-[25rem] min-h-48 max-h-64 object-cover"
                src={courseDetails?.backgroundUrl}
                alt={courseDetails?.title || "course"}
                width={500}
                height={500}
                priority={true}
              />
            ) : (
              <Image
                className="self-center rounded-2xl w-[280px] min-h-48 max-h-64 object-cover"
                src={CourseBg}
                alt={courseDetails?.title || "course"}
                width={500}
                height={500}
                priority={true}
              />
            )}
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="font-semibold border-[1px] border-[#2A3A50] rounded-xl px-4 py-3"
            >
              <p>เลือกรูปภาพพื้นหลังของคอร์สเรียน</p>
              <input
                type="file"
                id="fileInput"
                onInput={handleFileChange}
                style={{ display: "none" }}
                accept="image/png, image/jpg"
              />
            </button>
          </div>

          {/* right details */}
          <div className="space-y-3 ">
            <div>ชื่อชั้นเรียน</div>
            <input
              id="title"
              type="text"
              value={editData?.title || ""}
              placeholder="ชื่อชั้นเรียน"
              onChange={handleChange}
              className="w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent py-2 px-4"
              required
            ></input>

            <div>รายละเอียด</div>
            <div>
              <textarea
                id="description"
                value={editData?.description}
                placeholder="รายละเอียด"
                onChange={handleChange}
                className="min-h-28 max-h-48 w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent py-2 px-4"
                maxLength={200}
              ></textarea>
              <div className="text-right text-xs">
                {editData?.description.length}/200
              </div>
            </div>
          </div>
        </div>
        {/* space */}
        <div className="flex flex-row justify-self-end space-x-4">
          <button className="text-[#EF4343] text-center font-semibold leading-[120%] tracking-[0.08px] border-[1px] border-[#EF4343] bg-transparent rounded-xl px-8 py-4">
            ลบคอร์สเรียน
          </button>
          <button
            onClick={handleEditClick}
            className="text-center font-semibold leading-[120%] tracking-[0.08px] bg-[#5572FA] rounded-xl px-8 py-4"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </div>
    </>
  );
}
