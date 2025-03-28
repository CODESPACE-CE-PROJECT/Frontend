"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserBySchoolId } from "@/actions/school";
import { SearchBar } from "@/components/Input/SerachBar";
import { ICreateUser, IProfile, IUpdateUser } from "@/types/user";
import {
  createUserBySchoolId,
  getProfile,
  getUserByUsername,
  importFileExel,
  setAllowLoginByUsername,
  setEnableUserByUsername,
  updateUserByUsername,
} from "@/actions/user";
import { TopNav } from "@/components/Navbar/TopNav";
import { Loading } from "@/components/Loading/Loading";
import { ISchool } from "@/types/school";
import { Gender, NotifyType, Role } from "@/enum/enum";
import { UserTable } from "@/components/Table/UserTable";
import { notify, updateNotify } from "@/utils/toast.util";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { InpuFileButton } from "@/components/Button/InputFileButton";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUserModal } from "@/components/Modals/CreateUserModal";
import { UpdateUserModal } from "@/components/Modals/UpdateUserModal";
import { ImportFileModal } from "@/components/Modals/ImportFileModal";

export default function People() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<IProfile>();
  const [school, setSchool] = useState<ISchool>();
  const [teachers, setTeachers] = useState<IProfile[]>();
  const [students, setStudents] = useState<IProfile[]>();
  const [search, setSearch] = useState<string>("");
  const [isOpenCreateUserForm, setIsOpenCreateUserForm] =
    useState<boolean>(false);
  const [isOpenUpdateUserForm, setIsOpenUpdateUserForm] =
    useState<boolean>(false);
  const [isOpenImportFileModal, setIsOpenImportFileModal] =
    useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [createForm, setCreateForm] = useState<ICreateUser>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    gender: Gender.MALE,
    role: Role.STUDENT,
  });
  const [updateForm, setUpdateForm] = useState<IUpdateUser>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    gender: Gender.MALE,
    role: Role.STUDENT,
  });

  const handleInputChangeCreateForm = (
    value: string | number,
    name: string
  ) => {
    setCreateForm((prev) => {
      return {
        ...prev,
        [name]:
          name !== "role"
            ? value
            : value === "ผู้สอน"
              ? Role.TEACHER
              : Role.STUDENT,
      };
    });
    if (name === "role" && value === "ผู้สอน") {
      setCreateForm((prev) => {
        return {
          ...prev,
          studentNo: "",
        };
      });
    }
  };

  const clearDataCreateForm = () => {
    setCreateForm({
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      gender: Gender.MALE,
      role: Role.STUDENT,
      studentNo: "",
    });
  };

  const handleInputChangeUpdateForm = (
    value: string | number,
    name: string
  ) => {
    setUpdateForm((prev) => {
      return {
        ...prev,
        [name]:
          name !== "role"
            ? value
            : value === "ผู้สอน"
              ? Role.TEACHER
              : Role.STUDENT,
      };
    });
    if (name === "role" && value === "ผู้สอน") {
      setUpdateForm((prev) => {
        return {
          ...prev,
          studentNo: "",
        };
      });
    }
  };

  const handleFileInputChangeUpdateForm = (file: File) => {
    setUpdateForm((prev) => {
      return {
        ...prev,
        picture: file,
      };
    });
  };

  const clearDataUpdateForm = async (username: string) => {
    const { status, data } = await getUserByUsername(username);
    console.log(data);
    if (status === 200) {
      setUpdateForm({
        ...data,
        picture: null,
        pictureUrl: data.pictureUrl || "none",
      });
    }
  };

  const handleOnClickOption = async (
    name: string,
    username: string,
    allowLogin: boolean | null
  ) => {
    if (!profile || !profile.schoolId) {
      notify(NotifyType.ERROR, "ข้อมูลโรงเรียนไม่ถูกต้อง");
      return;
    }

    if (name === "allowLogin" && allowLogin !== null) {
      const id = notify(NotifyType.LOADING, "กำลังแก้ไข");
      const { status } = await setAllowLoginByUsername(username, !allowLogin);
      if (id) {
        if (status === 200) {
          updateNotify(id, NotifyType.SUCCESS, "แก้ไขเสร็จสิ้น");
          const { data } = await getUserBySchoolId(profile.schoolId);
          const response: ISchool = data;
          setSchool(response);
          setTeachers(
            response.users.filter((user) => user.role === Role.TEACHER)
          );
          setStudents(
            response.users.filter((user) => user.role === Role.STUDENT)
          );
        } else {
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขข้อมูล");
        }
      }
    } else if (name === "delete") {
      const id = notify(NotifyType.LOADING, "กำลังลบบัญชีผู้ใช้ไปถังขยะ");
      const { status } = await setEnableUserByUsername(username, false);
      if (id) {
        if (status === 200) {
          updateNotify(id, NotifyType.SUCCESS, "ลบบัญชีผู้ใช้เสร็จสิ้น");
          const { data } = await getUserBySchoolId(profile.schoolId);
          const response: ISchool = data;
          setSchool(response);
          setTeachers(
            response.users.filter((user) => user.role === Role.TEACHER)
          );
          setStudents(
            response.users.filter((user) => user.role === Role.STUDENT)
          );
        } else {
          updateNotify(
            id,
            NotifyType.ERROR,
            "เกิดข้อผิดผลาดในการลบบัญชีผู้ใช้"
          );
        }
      }
    } else if (name === "edit") {
      setIsOpenUpdateUserForm(true);
      const { status, data } = await getUserByUsername(username);
      if (status === 200) {
        setUpdateForm(data);
      }
    }
  };

  const handleSubmitCreateUser = async (createFrom: ICreateUser) => {
    if (!profile || !profile.schoolId) {
      notify(NotifyType.ERROR, "ข้อมูลโรงเรียนไม่ถูกต้อง");
      return;
    }
    const id = notify(NotifyType.LOADING, "กำลังสร้างบัญชีผู้ใช้งาน");
    if (profile?.schoolId && id) {
      const { status, data } = await createUserBySchoolId(
        profile?.schoolId,
        createFrom
      );
      if (status === 201) {
        updateNotify(id, NotifyType.SUCCESS, "สร้างบัญชีผู้ใช้เสร็จสิ้น");
        const { data } = await getUserBySchoolId(profile.schoolId);
        const response: ISchool = data;
        setProfile(profile);
        setSchool(response);
        setTeachers(
          response.users.filter((user) => user.role === Role.TEACHER)
        );
        setStudents(
          response.users.filter((user) => user.role === Role.STUDENT)
        );
        setIsOpenCreateUserForm(false);
      } else if (status === 406) {
        updateNotify(
          id,
          NotifyType.ERROR,
          "มีชื่อผู้ใช้งานหรืออีเมลนี้อยู่ในระบบแล้ว หรือคุณไม่มีสิทธิ์ในการสร้างบัญชีผู้ใช้"
        );
      } else if (status === 400 && data.message.includes('Over Limit Create Teacher')) {
        updateNotify(id, NotifyType.ERROR, `ไม่สามารถสร้างเกินจำนวนครู ${data.message.split(" ").pop()} คนได้`)
      } else if (status === 400 && data.message.includes('Over Limit Create Student')) {
        updateNotify(id, NotifyType.ERROR, `ไม่สามารถสร้างเกินจำนวนนักเรียน ${data.message.split(" ").pop()} คนได้`)
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการสร้างบัญชี");
      }
    }
  };

  const handleSubmitUpdateUser = async (updateForm: IUpdateUser) => {
    if (!profile || !profile.schoolId) {
      notify(NotifyType.ERROR, "ข้อมูลโรงเรียนไม่ถูกต้อง");
      return;
    }
    const id = notify(NotifyType.LOADING, "กำลังแก้ไขข้อมูลบัญชีผู้ใช้งาน");
    if (profile?.schoolId && id) {
      const { status } = await updateUserByUsername(updateForm);
      if (status === 200) {
        updateNotify(id, NotifyType.SUCCESS, "แก้ไขข้อมูลบัญชีผู้ใช้เสร็จสิ้น");
        const { data } = await getUserBySchoolId(profile.schoolId);
        const response: ISchool = data;
        setProfile(profile);
        setSchool(response);
        setTeachers(
          response.users.filter((user) => user.role === Role.TEACHER)
        );
        setStudents(
          response.users.filter((user) => user.role === Role.STUDENT)
        );
        setIsOpenUpdateUserForm(false);
      } else if (status === 406) {
        updateNotify(id, NotifyType.ERROR, "มีอีเมลนี้อยู่ในระบบแล้ว");
      } else {
        updateNotify(
          id,
          NotifyType.ERROR,
          "เกิดข้อผิดผลาดในการแก้ไขข้อมูลผู้ใช้งาน"
        );
      }
    }
  };

  const handleFileImport = async () => {
    if (!profile || !profile.schoolId) {
      notify(NotifyType.ERROR, "ข้อมูลโรงเรียนไม่ถูกต้อง");
      return;
    }
    if (file) {
      const id = notify(NotifyType.LOADING, "กำลังประมวลผลไฟล์");
      const { status, data } = await importFileExel(file);
      if (id) {
        if (status === 201) {
          updateNotify(id, NotifyType.SUCCESS, "ประมวลผลไฟล์เสร็จสิ้น");
          sessionStorage.setItem(
            `dataFile-${profile.schoolId}`,
            JSON.stringify(data)
          );
          setIsOpenImportFileModal(false);
          router.push(`/teacher/school/file`);
        } else if (status === 400) {
          updateNotify(id, NotifyType.ERROR, "รูปแบบไฟล์ไม่ถูกต้อง");
          data.errors.map((item: string) => {
            notify(NotifyType.WARNING, item);
          });
        } else {
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการประมวลผลไฟล์");
        }
      }
    }
  };

  useEffect(() => {
    const fetchSchool = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      const { status, data } = await getUserBySchoolId(profile.schoolId);
      if (status === 200) {
        const response: ISchool = data;
        setSchool(response);
        setTeachers(
          response.users.filter((user) => user.role === Role.TEACHER)
        );
        setStudents(
          response.users.filter((user) => user.role === Role.STUDENT)
        );
      } else {
      }
      setLoading(false);
    };
    fetchSchool();
  }, []);

  useEffect(() => {
    setTeachers(
      school?.users.filter(
        (user) =>
          user.role === Role.TEACHER &&
          (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()))
      )
    );
    setStudents(
      school?.users.filter(
        (user) =>
          user.role === Role.STUDENT &&
          (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, school?.users]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            disableNotification={true}
            imageUrl={profile?.pictureUrl}
            role={profile?.role}
            gender={profile?.gender}
            className="mb-5"
          >
            <div className="flex flex-row items-center gap-x-3">
              <div
                className="cursor-pointer hover:text-primary"
                onClick={() => router.back()}
              >
                <ArrowBackIosNewRoundedIcon />
              </div>
              <p>รายชื่อสมาชิกในโรงเรียน</p>
            </div>
          </TopNav>

          <div className="flex flex-col gap-9">
            <div className="flex flex-row items-center gap-x-4">
              <SearchBar onChange={(value) => setSearch(value)} />
              <InpuFileButton
                className="flex flex-row font-semibold items-center justify-center w-36"
                onClick={() => setIsOpenImportFileModal(true)}
              />
              <ConfirmButton
                className="px-3"
                onClick={() => setIsOpenCreateUserForm(true)}
              >
                <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
              </ConfirmButton>
            </div>
            <div className="flex flex-col xl:flex-row md:gap-y-6 gap-x-9">
              <UserTable
                title="บัญชีผู้สอน"
                data={teachers}
                onClickOption={handleOnClickOption}
              />
              <UserTable
                title="บัญชีผู้เรียน"
                data={students}
                onClickOption={handleOnClickOption}
              />
            </div>
          </div>
          <CreateUserModal
            onSubmit={(createForm) => handleSubmitCreateUser(createForm)}
            handleInputChange={handleInputChangeCreateForm}
            createForm={createForm}
            isOpen={isOpenCreateUserForm}
            onClose={() => {
              setIsOpenCreateUserForm(false);
              clearDataCreateForm();
            }}
          />
          <UpdateUserModal
            onSubmit={(updateForm) => handleSubmitUpdateUser(updateForm)}
            isOpen={isOpenUpdateUserForm}
            handleFileInputChange={handleFileInputChangeUpdateForm}
            onClose={(username) => {
              setIsOpenUpdateUserForm(false);
              clearDataUpdateForm(username);
            }}
            updateForm={updateForm}
            handleInputChange={handleInputChangeUpdateForm}
          />
          <ImportFileModal
            isOpen={isOpenImportFileModal}
            onInput={(file) => setFile(file)}
            onClose={() => setIsOpenImportFileModal(false)}
            onClick={handleFileImport}
          />
        </>
      )}
    </>
  );
}
