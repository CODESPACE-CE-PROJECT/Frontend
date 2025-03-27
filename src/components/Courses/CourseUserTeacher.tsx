import { Role } from "@/enum/enum";
import { IProfile } from "@/types/user";
import { getAvatar } from "@/utils/gender.util";
import Image from "next/image";
import { OptionPeople } from "../Options/OptionPeople";

interface CoursesRoleProps {
  data: IProfile;
  onClickOption: (name: string, username: string) => void;
}

const CourseUserTeacher: React.FC<CoursesRoleProps> = ({
  data,
  onClickOption,
}) => {
  return (
    <>
      <div
        className="flex justify-between items-center rounded-lg gap-x-4"
        key={data.username}
      >
        <div className="flex text-white text-lg px-4 py-3 rounded-md text-center w-[65%] space-x-4 items-center">
          <Image
            src={data.pictureUrl || getAvatar(data.gender)}
            alt="Profile"
            className="w-16 h-16 rounded-full"
            width={100}
            height={100}
          />
          <div className="flex flex-col text-left">
            <div className="flex flex-row space-x-2">
              <div className="font-semibold">{data.firstName}</div>
              <div className="font-semibold">{data.lastName}</div>
            </div>

            <div className="text-sm text-gray-300">{data.email}</div>
          </div>
        </div>

        <div className="text-white text-lg px-4 py-3 rounded-md w-[15%] text-center">
          {data.role === Role.TEACHER ? "ผู้สอน" : "ผู้เรียน"}
        </div>

        <div className="flex justify-center w-[15%]">
          <div
            className={`flex text-white text-lg py-3 rounded-md border w-3/4 space-x-2 text-center items-center justify-center ${
              data.isActived ? "border-green-l" : "border-white"
            }`}
          >
            <p
              className={`w-3 h-3 rounded-full ${
                data.isActived ? "bg-green-l" : "bg-white"
              }`}
            ></p>
            <p className={`${data.isActived ? "text-green-l" : "text-white"}`}>
              {data.isActived ? "ออนไลน์" : "ออฟไลน์"}
            </p>
          </div>
        </div>
        <div className="text-white text-lg py-3 rounded-md text-center w-[5%]">
          <OptionPeople
            onClick={(name) => onClickOption(name, data.username)}
          />
        </div>
      </div>
    </>
  );
};

export default CourseUserTeacher;
