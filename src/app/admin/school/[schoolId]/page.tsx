'use client'

import { getSchoolById } from "@/actions/school";
import { Loading } from "@/components/Loading/Loading";
import { TopNav } from "@/components/Navbar/TopNav";
import { Gender, NotifyType, Role } from "@/enum/enum";
import { ISchool } from "@/types/school";
import { ICreateUser, IProfile, IUpdateUser } from "@/types/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SchoolCard } from "@/components/Card/SchoolCard";
import { getProfile, getUserByUsername, importFileExel, setAllowLoginByUsername, setEnableUserByUsername, updateUserByUsername } from "@/actions/user";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { SearchBar } from "@/components/Input/SerachBar";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { InpuFileButton } from "@/components/Button/InputFileButton";
import { UserTable } from '@/components/Table/UserTable'
import { notify, updateNotify } from "@/utils/toast.util";
import { CreateUserModal } from "@/components/Modals/CreateUserModal";
import { UpdateUserModal } from "@/components/Modals/UpdateUserModal";
import { createUserBySchoolId } from "@/actions/user";
import { ImportFileModal } from "@/components/Modals/ImportFileModal";

export default function Page() {
     const router = useRouter();
     const param = useParams<{ schoolId: string }>();
     const [school, setSchool] = useState<ISchool>();
     const [teachers, setTeachers] = useState<IProfile[]>();
     const [students, setStudents] = useState<IProfile[]>();
     const [search, setSearch] = useState<string>("");
     const [isLoading, setIsLoading] = useState<boolean>(true)
     const [profile, setProfile] = useState<IProfile>()
     const [isOpenCreateUserForm, setIsOpenCreateUserForm] = useState<boolean>(false)
     const [isOpenUpdateUserForm, setIsOpenUpdateUserForm] = useState<boolean>(false)
     const [isOpenImportFileModal, setIsOpenImportFileModal] = useState<boolean>(false)
     const [file, setFile] = useState<File>()
     const [createForm, setCreateForm] = useState<ICreateUser>({
          email: "",
          firstName: "",
          lastName: "",
          username: "",
          gender: Gender.MALE,
          role: Role.STUDENT
     })
     const [updateForm, setUpdateForm] = useState<IUpdateUser>({
          email: "",
          firstName: "",
          lastName: "",
          username: "",
          gender: Gender.MALE,
          role: Role.STUDENT
     })

     const handleInputChangeCreateForm = (value: string | number, name: string) => {
          setCreateForm(prev => {
               return {
                    ...prev,
                    [name]: name !== "role" ? value : value === "ผู้สอน" ? Role.TEACHER : Role.STUDENT
               }
          })
          if (name === "role" && value === "ผู้สอน") {
               setCreateForm(prev => {
                    return {
                         ...prev,
                         studentNo: ''
                    }
               })
          }
     }

     const clearDataCreateForm = () => {
          setCreateForm({
               email: "",
               firstName: "",
               lastName: "",
               username: "",
               gender: Gender.MALE,
               role: Role.STUDENT,
               studentNo: ""
          })
     }

     const handleInputChangeUpdateForm = (value: string | number, name: string) => {
          setUpdateForm(prev => {
               return {
                    ...prev,
                    [name]: name !== "role" ? value : value === "ผู้สอน" ? Role.TEACHER : Role.STUDENT
               }
          })
          if (name === "role" && value === "ผู้สอน") {
               setUpdateForm(prev => {
                    return {
                         ...prev,
                         studentNo: ''
                    }
               })
          }
     }

     const handleFileInputChangeUpdateForm = (file: File) => {
          setUpdateForm(prev => {
               return {
                    ...prev,
                    picture: file
               }
          })
     }

     const clearDataUpdateForm = async (username: string) => {
          const {status, data} = await getUserByUsername(username)
          console.log(data)
          if(status === 200){
               setUpdateForm({
                    ...data,
                    picture: null,
                    pictureUrl: data.pictureUrl || "none"
               })
          }
     }

     const handleOnClickOption = async (name: string, username: string, allowLogin: boolean | null) => {
          if (name === "allowLogin" && allowLogin !== null) {
               const id = notify(NotifyType.LOADING, "กำลังแก้ไข")
               const { status } = await setAllowLoginByUsername(username, !allowLogin)
               if (id) {
                    if (status === 200) {
                         updateNotify(id, NotifyType.SUCCESS, 'แก้ไขเสร็จสิ้น');
                         const { data } = await getSchoolById(param.schoolId);
                         const response: ISchool = data
                         setProfile(profile)
                         setSchool(response);
                         setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                         setStudents(response.users.filter((user) => user.role === Role.STUDENT));
                    } else {
                         updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการแก้ไขข้อมูล')
                    }
               }
          } else if (name === "delete") {
               const id = notify(NotifyType.LOADING, "กำลังลบบัญชีผู้ใช้ไปถังขยะ")
               const { status } = await setEnableUserByUsername(username, false)
               if (id) {
                    if (status === 200) {
                         updateNotify(id, NotifyType.SUCCESS, 'ลบบัญชีผู้ใช้เสร็จสิ้น');
                         const { data } = await getSchoolById(param.schoolId);
                         const response: ISchool = data
                         setProfile(profile)
                         setSchool(response);
                         setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                         setStudents(response.users.filter((user) => user.role === Role.STUDENT));
                    } else {
                         updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการลบบัญชีผู้ใช้')
                    }
               }
          } else if (name === "edit") {
               setIsOpenUpdateUserForm(true)
               const {status, data} = await getUserByUsername(username)
               if(status === 200){
                    setUpdateForm(data)
               } 
          }
     }

     const handleSubmitCreateUser = async (createFrom: ICreateUser) => {
          const id = notify(NotifyType.LOADING, "กำลังสร้างบัญชีผู้ใช้งาน")
          if (school?.schoolId && id) {
               const { status } = await createUserBySchoolId(school?.schoolId, createFrom)
               if (status === 201) {
                    updateNotify(id, NotifyType.SUCCESS, "สร้างบัญชีผู้ใช้เสร็จสิ้น")
                    const { data } = await getSchoolById(param.schoolId);
                    const response: ISchool = data
                    setProfile(profile)
                    setSchool(response);
                    setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                    setStudents(response.users.filter((user) => user.role === Role.STUDENT));
                    setIsOpenCreateUserForm(false)
               } else if (status === 406) {
                    updateNotify(id, NotifyType.ERROR, "มีชื่อผู้ใช้งานหรืออีเมลนี้อยู่ในระบบแล้ว")
               } else {
                    updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการสร้างบัญชี")
               }
          }
     }

     const handleSubmitUpdateUser = async (updateForm: IUpdateUser) => {
          const id = notify(NotifyType.LOADING, "กำลังแก้ไขข้อมูลบัญชีผู้ใช้งาน")
          if (school?.schoolId && id) {
               const { status } = await updateUserByUsername(updateForm)
               if (status === 200) {
                    updateNotify(id, NotifyType.SUCCESS, "แก้ไขข้อมูลบัญชีผู้ใช้เสร็จสิ้น")
                    const { data } = await getSchoolById(param.schoolId);
                    const response: ISchool = data
                    setProfile(profile)
                    setSchool(response);
                    setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                    setStudents(response.users.filter((user) => user.role === Role.STUDENT));
                    setIsOpenUpdateUserForm(false)
               } else if (status === 406) {
                    updateNotify(id, NotifyType.ERROR, "มีอีเมลนี้อยู่ในระบบแล้ว")
               } else {
                    updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขข้อมูลผู้ใช้งาน")
               }
          }
     }

     const handleFileImport = async () => {
          if(file){
               const id = notify(NotifyType.LOADING, 'กำลังประมวลผลไฟล์')
               const {status, data} = await importFileExel(file)
               if(id){
                    if(status === 201){
                         updateNotify(id, NotifyType.SUCCESS, 'ประมวลผลไฟล์เสร็จสิ้น')
                         sessionStorage.setItem(`dataFile-${param.schoolId}`, JSON.stringify(data))
                         setIsOpenImportFileModal(false)
                         router.push(`/admin/school/${param.schoolId}/file`)
                    } else if (status === 400){
                         updateNotify(id, NotifyType.ERROR, 'รูปแบบไฟล์ไม่ถูกต้อง')
                         data.errors.map((item:string) => {
                              notify(NotifyType.WARNING, item)
                         })
                    } else {
                         updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการประมวลผลไฟล์')
                    }
               }
          }
     }

     useEffect(() => {
          const fetchSchool = async () => {
               const profile: IProfile = await getProfile()
               setProfile(profile)
               const { status, data } = await getSchoolById(param.schoolId);
               if (status === 200) {
                    const response: ISchool = data
                    setSchool(response);
                    setTeachers(response.users.filter((user) => user.role === Role.TEACHER));
                    setStudents(response.users.filter((user) => user.role === Role.STUDENT));
               } else {

               }
               setIsLoading(false)
          };
          fetchSchool();
     }, [param]);

     useEffect(() => {
          setTeachers(
               school?.users.filter(
                    (user) =>
                         user.role === Role.TEACHER &&
                         (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                              user.email.toLowerCase().includes(search.toLowerCase())),
               ),
          );
          setStudents(
               school?.users.filter(
                    (user) =>
                         user.role === Role.STUDENT &&
                         (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                              user.email.toLowerCase().includes(search.toLowerCase())),
               ),
          );
     }, [search, school?.users]);

     return isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
               <Loading className="size-20" />
          </div>
     ) : (<div className="flex flex-col gap-y-12">
          <TopNav 
               disableNotification={true} 
               imageUrl={profile?.pictureUrl} 
               role={profile?.role} 
               gender={profile?.gender}
          >
               <div className="flex flex-row items-center gap-x-3">
                    <div className="cursor-pointer hover:text-primary" onClick={() => router.push('/admin/school')}>
                         <ArrowBackIosNewRoundedIcon />
                    </div>
                    <p>{school?.schoolName}</p>
               </div>
          </TopNav>

          <div className="flex flex-col gap-9">
               <SchoolCard data={school} />
               <div className="flex flex-row items-center gap-x-4">
                    <SearchBar onChange={(value) => setSearch(value)} />
                    <InpuFileButton className="flex flex-row font-semibold items-center justify-center w-36" onClick={() => setIsOpenImportFileModal(true)}/>
                    <ConfirmButton className="px-3" onClick={() => setIsOpenCreateUserForm(true)}>
                         <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
                    </ConfirmButton>
               </div>
               <div className="flex flex-col xl:flex-row md:gap-y-6 gap-x-9">
                    <UserTable title="บัญชีผู้สอน" data={teachers} onClickOption={handleOnClickOption} />
                    <UserTable title="บัญชีผู้เรียน" data={students} onClickOption={handleOnClickOption} />
               </div>
          </div>
          <CreateUserModal onSubmit={(createForm) => handleSubmitCreateUser(createForm)} handleInputChange={handleInputChangeCreateForm} createForm={createForm} isOpen={isOpenCreateUserForm} onClose={() => {setIsOpenCreateUserForm(false); clearDataCreateForm()}} />
          <UpdateUserModal onSubmit={(updateForm) => handleSubmitUpdateUser(updateForm)} isOpen={isOpenUpdateUserForm} handleFileInputChange={handleFileInputChangeUpdateForm} onClose={(username) => {setIsOpenUpdateUserForm(false); clearDataUpdateForm(username)}} updateForm={updateForm} handleInputChange={handleInputChangeUpdateForm}/>
          <ImportFileModal isOpen={isOpenImportFileModal} onInput={(file) => setFile(file)} onClose={() => setIsOpenImportFileModal(false)} onClick={handleFileImport}/>
     </div>)
}