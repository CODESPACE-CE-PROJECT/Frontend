"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationTab from "@/components/Tab/NavigationTab";
import ScoreAssignTable from "@/components/Table/ScoreAssignTable";
import {
  getAssignmentscore,
} from "@/actions/assignment";
import { IAssignmentScore } from "@/types/assignment";
import { SearchBar } from "@/components/Input/SerachBar";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";
import ScoreStdTable from "@/components/Table/ScoreStdTable";
import ExportButton from "@/components/Button/ExportButton";
import { Dropdown } from "@/components/Input/Dropdown";
import { AssignmentType } from "@/enum/enum";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assignments, setAssignments] = useState<IAssignmentScore[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<IAssignmentScore[]>([]);
  const [search, setSearch] = useState<string>("");
  const [profile, setProfile] = useState<IProfile>();
  const [selectedView, setSelectedView] = useState<"แบบฝึกหัด" | "ผู้เรียน">(
    "แบบฝึกหัด"
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      if (courseId) {
        const profile: IProfile = await getProfile();
        setProfile(profile);

        const data: IAssignmentScore[] = await getAssignmentscore(courseId);
        const filteredAssignments = data.filter((item) => item.type === AssignmentType.EXERCISE)
        setAssignments(filteredAssignments)
        setFilteredAssignments(filteredAssignments)
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  useEffect(() => {
    if(selectedView === "แบบฝึกหัด") {
      setFilteredAssignments(assignments.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredAssignments(assignments.filter((item) => item.scores.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase())).length > 0))
    }
  }, [search, selectedView, assignments])

  return (
    <>
      {isLoading ? (
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
            <p>คะแนน</p>
          </TopNav>

          <div className="mt-4 flex items-center gap-4">
            <NavigationTab
              courseId={courseId}
              basePath={`/teacher/course/${courseId}/score`}
            />

            <div className="flex flex-col">
              <Dropdown
                name="viewSelector"
                options={["แบบฝึกหัด", "ผู้เรียน"]}
                value={selectedView}
                onChange={(value) =>
                  setSelectedView(value as "แบบฝึกหัด" | "ผู้เรียน")
                }
                className="w-48 z-10"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <SearchBar onChange={(value) => setSearch(value)} />
            <ExportButton assignments={assignments} />{" "}
          </div>

          {selectedView === "แบบฝึกหัด" ? (
            <ScoreAssignTable
              assignments={filteredAssignments}
              courseId={courseId}
            />
          ) : (
            <ScoreStdTable assignments={filteredAssignments} />
          )}
        </>
      )}
    </>
  );
}
