import { Modal } from "@/components/Modals/Modal";
import { DownLoadFileButton } from "@/components/Button/DownLoadFileButton";
import { UploadFilePeople } from "../Input/UploadFilePeople";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CancelButton } from "@/components/Button/CancelButton";
import { SearchBar } from "../Input/SerachBar";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IProfile } from "@/types/user";
import { getAvatar } from "@/utils/gender.util";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { IPeople } from "@/types/course";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: (selectedUsers: string[]) => void;
  users?: IProfile[];
  currentCourseUsers?: IPeople;
}

export const AddPeopleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onClick,
  users,
  currentCourseUsers,
}) => {
  const [search, setSearch] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usersInCourse, setUsersInCourse] = useState<string[]>([]);

  useEffect(() => {
    if (currentCourseUsers) {
      const teachersUsernames = currentCourseUsers.courseTeacher.map(
        (teacher) => teacher.user.username
      );
      const studentsUsernames = currentCourseUsers.courseStudent.map(
        (student) => student.user.username
      );
      setUsersInCourse([...teachersUsernames, ...studentsUsernames]);
    }
  }, [currentCourseUsers]);

  const filteredUsers = users?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserSelection = (username: string) => {
    if (selectedUsers.includes(username)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== username));
    } else {
      setSelectedUsers([...selectedUsers, username]);
    }
  };

  const handleUploadedUsernames = (uploadedUsernames: string[]) => {
    const matchedUsers = uploadedUsernames.filter((username) =>
      users?.some((user) => user.username === username)
    );
    setSelectedUsers([...new Set([...selectedUsers, ...matchedUsers])]);
  };

  const handleConfirm = () => {
    if (onClick && typeof onClick === "function") {
      onClick(selectedUsers);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mx-24 my-20 w-[40vw] min-h-60 rounded-lg">
        <div className="flex flex-col items-center w-full gap-y-6">
          <p className="text-2xl font-semibold text-center text-gray-800">
            เพิ่มสมาชิกในคอร์ส
          </p>

          <div className="flex items-center gap-x-4 justify-between w-full">
            <div className="flex items-center gap-x-2">
              <DownLoadFileButton className="font-semibold items-center gap-x-2 border-[1px] border-primary px-4 py-2 rounded-md transition" />
              <p className="text-lg text-gray-700">ดาวน์โหลดตัวอย่างไฟล์</p>
            </div>
            <UploadFilePeople onInput={handleUploadedUsernames} />
          </div>

          <SearchBar onChange={(value) => setSearch(value)} />

          <div className="flex flex-col w-full max-h-64 min-h-40 mx-10 overflow-auto overscroll-contain custom-scrollbar">
            {filteredUsers?.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-x-5">
                  <Image
                    src={
                      user.pictureUrl || (user.gender && getAvatar(user.gender))
                    }
                    alt="avatart"
                    priority={true}
                    width={100}
                    height={100}
                    className="w-10 h-10 object-cover border border-blackground-text rounded-full"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-xl">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <div
                  className="rounded-md border-2 border-border-text-light cursor-pointer p-1 mr-5"
                  onClick={() => handleUserSelection(user.username)}
                >
                  {usersInCourse.includes(user.username) ? (
                    <CheckIcon className="text-green-500" />
                  ) : selectedUsers.includes(user.username) ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <AddIcon className="text-[#64748B]" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-x-4 justify-center mt-6">
            <CancelButton
              className="px-12 py-3 bg-gray-100 text-[#64748B] border border-border-text-light rounded-md hover:bg-gray-200 transition"
              onClick={onClose}
            >
              <p>ยกเลิก</p>
            </CancelButton>
            <ConfirmButton
              className="py-3 px-12 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              onClick={handleConfirm}
            >
              <p>ตกลง</p>
            </ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
