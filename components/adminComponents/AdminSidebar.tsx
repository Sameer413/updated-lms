"use client";
import { useLazySignOutQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { CiLogout } from "react-icons/ci";
import { FaRegMap, FaUserCircle, FaUsers, FaUsersCog } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOndemandVideo, MdVideoCall } from "react-icons/md";
import {
  RiBarChartFill,
  RiQuestionAnswerFill,
  RiUserSettingsLine,
} from "react-icons/ri";
import { TbFileInvoice } from "react-icons/tb";

interface ItemProps {
  Icon: IconType;
  title: string;
  to?: string;
  open: boolean;
  active?: boolean;
}
const Item: React.FC<ItemProps> = ({ Icon, title, to, open, active }) => {
  return (
    <Link
      href={to || ""}
      className={`flex items-center my-2 gap-2 ${
        active
          ? "text-[#868dfb] font-medium"
          : "hover:ml-1 transition-all duration-150 ease-linear"
      }`}
    >
      <Icon className={open ? "text-lg" : "text-2xl"} />
      {open && <span className="text-base">{title}</span>}
    </Link>
  );
};

const AdminSidebar = ({ active }: { active: number }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [signOutTrigger, {}] = useLazySignOutQuery();

  const img = false;
  return (
    <div
      className={`${
        open ? "w-1/6 px-2 min-w-[220px]" : "w-[5%]"
      } bg-[#111C43] py-6 overflow-scroll transition-all duration-200 ease-in-out h-screen sticky top-0`}
    >
      <div
        className={`flex items-center px-2 ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        {open && (
          <span className="text-2xl font-medium cursor-default">
            E-Learning
          </span>
        )}
        <IoIosArrowBack
          onClick={() => setOpen(!open)}
          className={`${
            open ? "text-2xl" : "rotate-180 text-3xl"
          } cursor-pointer transition-transform duration-300 ease-linear`}
        />
      </div>
      <div
        className={`${
          open ? "flex" : "pl-5"
        } justify-center items-center flex-col mt-5`}
      >
        {img ? (
          <Image
            src=""
            alt=""
            className={`object-contain h-full ${open ? "w-20" : "w-7"}`}
          />
        ) : (
          <FaUserCircle
            className={` h-full object-contain border-[3px] p-[2px] rounded-full border-purple-900 ${
              open ? "w-20" : "w-7"
            }`}
          />
        )}

        {open && (
          <>
            <div className="text-lg font-medium">Sameer Nimje</div>
            <div className="text-lg">- Admin</div>
          </>
        )}
      </div>

      {/* Dashboard Navigation Items */}
      <div className="mt-5 pl-5">
        <Item
          Icon={IoHomeOutline}
          title="Dashboard"
          open={open}
          active={active === 1}
          to="/admin"
        />

        <div className="mt-5">
          <div className="font-bold">{open && "Data"}</div>
          <Item
            Icon={FaUsers}
            title="Users"
            open={open}
            active={active === 2}
            to="/admin/users"
          />
          <Item
            Icon={LiaFileInvoiceSolid}
            title="Invoices"
            open={open}
            active={active === 3}
          />
        </div>
        <div className="mt-5">
          <div className="font-bold">{open && "Content"}</div>
          <Item
            Icon={MdVideoCall}
            title="Create Course"
            open={open}
            active={active === 4}
            to="/admin/create-course"
          />
          <Item
            Icon={MdOndemandVideo}
            title="Live Courses"
            open={open}
            active={active === 5}
            to="/admin/courses"
          />
        </div>
        <div className="mt-5">
          <div className="font-bold">{open && "Customizaton"}</div>
          <Item
            Icon={RiQuestionAnswerFill}
            title="FAQ"
            open={open}
            to="/admin/faq"
            active={active === 6}
          />
          <Item
            Icon={TbFileInvoice}
            title="Categories"
            open={open}
            to="/admin/categories"
            active={active === 7}
          />
        </div>
        <div className="mt-5">
          <div className="font-bold">{open && "Controllers"}</div>
          <Item
            Icon={FaUsersCog}
            title="Manage Teams"
            open={open}
            active={active === 8}
            to="/admin/teams"
          />
        </div>
        <div className="mt-5">
          <div className="font-bold">{open && "Analytics"}</div>
          <Item
            Icon={RiBarChartFill}
            title="Courses Analytics"
            open={open}
            active={active === 9}
            to="/admin/courses-analytics"
          />
          <Item
            Icon={FaRegMap}
            title="Orders Analytics"
            open={open}
            active={active === 10}
            to="/admin/orders-analytics"
          />
          <Item
            Icon={RiUserSettingsLine}
            title="Users Analytics"
            open={open}
            active={active === 11}
            to="/admin/users-analytics"
          />
        </div>
        <div className="mt-5" onClick={signOutTrigger}>
          <div className="font-bold">{open && "Ohters"}</div>
          <Item Icon={CiLogout} title="Log Out" open={open} />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
