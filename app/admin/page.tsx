"use client";
import React, { useState } from "react";
// import Heading from '../utils/Heading'
import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import DashBoard from "@/components/adminComponents/DashBoard";

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex">
        <AdminSidebar active={1} />

        <div className="w-full">
          <DashBoard open={open} />
        </div>
      </div>
    </div>
  );
};

export default Page;
