import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import CourseBg from "@/assets/CoursesAssets/CourseBg.png";
import { getAvatar } from "@/utils/gender.util";
import { ICourse } from "@/types/course";

interface Props {
  data: ICourse;
}

export const CoursesCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCourseClick = (courseId: string) => {
    const role = pathname.startsWith("/teacher") ? "teacher" : "student";
    router.push(`/${role}/course/${courseId}/general`);
  };

  return (
    <div
      key={data.courseId}
      onClick={() => handleCourseClick(data.courseId)}
      className="relative flex w-72 h-[320px] flex-col text-[#0B111B] cursor-pointer border-border-page border-[1px] rounded-2xl"
    >
      {data.backgroundUrl ? (
        <Image
          className="self-center rounded-t-2xl max-w-[286px] max-h-[169px] object-cover"
          src={data.backgroundUrl}
          alt={data.title}
          width={500}
          height={500}
          priority={true}
        />
      ) : (
        <Image
          className="self-center rounded-t-2xl w-full h-full object-cover"
          src={CourseBg}
          alt={data.title}
          width={500}
          height={500}
          priority={true}
        />
      )}
      <Image
        className="absolute inset-y-32 left-4 w-16 rounded-full border-[#FAFAFA] border-2 "
        src={data.user?.pictureUrl || getAvatar(data.user?.gender || "other")}
        alt={data.title}
        width={100}
        height={100}
        priority={true}
      />

      <div className="px-7 py-3 bg-[#FAFAFA] rounded-b-xl pt-10 h-full flex flex-col gap-y-3">
        <p className=" text-xl font-semibold text-pretty truncate">
          {data.title}
        </p>
        <p className="text-sm text-pretty truncate">
          {data.user?.firstName} {data.user?.lastName}
        </p>
      </div>
    </div>
  );
};
