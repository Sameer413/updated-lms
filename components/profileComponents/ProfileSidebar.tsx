import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlineLeaderboard, MdLockPerson } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { IconType } from "react-icons";
import { cn } from "@/utils/utils";

const sidebarMap = [
  { title: "My Account", Icon: FaRegUserCircle, qp: "my-account" },
  { title: "Changed Password", Icon: MdLockPerson, qp: "changed-password" },
  { title: "Enrolled Courses", Icon: SiCoursera, qp: "enrolled-courses" },
  {
    title: "Courses Certificate",
    Icon: LiaCertificateSolid,
    qp: "courses-certificate",
  },
  { title: "Leaderboard", Icon: MdOutlineLeaderboard, qp: "leaderboard" },
  { title: "My Tickets", Icon: RiCustomerService2Fill, qp: "my-tickets" },
  //   { title: "Log Out", Icon: HiOutlineLogout },
];

const ProfileSidebar = ({
  active,
  setActive,
}: {
  active: string;
  setActive: (active: string) => void;
}) => {
  return (
    <div className="border border-[rgba(255,255,255,0.11)] rounded-lg shadow-xl">
      {sidebarMap.map(
        ({
          title,
          Icon,
          qp,
        }: {
          title: string;
          Icon: IconType;
          qp?: string;
        }) => {
          return (
            <div
              onClick={() => setActive(qp!)}
              key={title}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-500 hover:bg-opacity-20 transition-colors ease-linear duration-150",
                active === qp && "bg-slate-500 bg-opacity-20",
                active === "my-account" && "rounded-t-lg"
              )}
            >
              <Icon size={20} /> <span className="font-medium">{title}</span>
            </div>
          );
        }
      )}
      <div
        // onClick={() => setActive(qp!)}
        // key={title}
        className={cn(
          "flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-500 hover:bg-opacity-20 transition-colors ease-linear duration-150"
        )}
      >
        <HiOutlineLogout size={20} />{" "}
        <span className="font-medium font-Poppins">Log Out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
