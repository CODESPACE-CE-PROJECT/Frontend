import { Role } from "@/enum/enum";
import { IPeople } from "@/types/course";
import { IProfile } from "@/types/user";
import { getAvatar } from "@/utils/gender.util";
import Image from "next/image";

interface CoursesRoleProps {
    data:IProfile
}

const CourseUser: React.FC<CoursesRoleProps> = ({ data }) => {
    return <>
        <div className="flex justify-between items-center py-6 rounded-lg" key={data.username}>
        <div className="flex text-white text-lg px-4 py-3 rounded-md text-center mr-4 w-2/3 space-x-4 items-center">
          <Image
            src={ data.pictureUrl || getAvatar(data.gender)}
            alt="Profile"
            className="w-16 h-16 rounded-full"
            width={100}
            height={100}
          />
          <div className="flex flex-col text-left">
            <div className="flex flex-row space-x-2">
              <div className="font-semibold">
                {data.firstName}
              </div>
              <div className="font-semibold">
                {data.lastName}
              </div>
            </div>

            <div className="text-sm text-gray-300">
              {data.email}
            </div>
          </div>
        </div>

        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
          {data.role === Role.TEACHER ? "ผู้สอน" : "ผู้เรียน"}
        </div>

        <div
          className={`flex text-white text-lg py-3 rounded-md border mx-6 w-36 space-x-2 text-center items-center justify-center ${
            data.isActived ? "border-green-l" : "border-white"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              data.isActived ? "bg-green-l" : "bg-white"
            }`}
          ></div>
          <div className={`${data.isActived ? "text-green-l": "text-white"}`}>{data.isActived ? "ออนไลน์" : "ออฟไลน์"}</div>
        </div>
      </div>
    </>
};

export default CourseUser;