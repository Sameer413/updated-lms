import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import AllUsers from "@/components/adminComponents/AllUsers";
// import Heading from '@/app/utils/Heading'
import React from "react";

const page = () => {
  return (
    <div className="">
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex w-full">
        <AdminSidebar active={8} />

        <div className="w-[90vw]">
          <AllUsers isTeam />
        </div>
      </div>
    </div>
  );
};

export default page;
