import { NotificationPopup } from "@/components/Navbar/NotificationPopup";
import { ReactNode, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRole } from "@/utils/text.util";
import { Gender, Role } from "@/enum/enum";
import { getAvatar } from "@/utils/gender.util";

interface Props {
  children?: ReactNode;
  disableNotification?: boolean;
  imageUrl?: string;
  gender?: Gender;
  role?: Role;
  className?: string;
}

export const TopNav: FC<Props> = ({
  children,
  imageUrl,
  role,
  disableNotification,
  gender,
  className,
}) => {
  return (
    <div
      className={`${className} flex flex-row items-center w-full justify-between text-3xl font-semibold`}
    >
      {children}
      <div className="flex flex-row items-center gap-x-6">
        {!disableNotification && 
          <NotificationPopup />
        }
        <Link href={`/${getRole(role)}/profile`}>
          <Image
            src={imageUrl || (gender && getAvatar(gender))}
            alt="avatart"
            priority={true}
            width={100}
            height={100}
            className="w-12 h-12 object-cover border border-blackground-text rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};
