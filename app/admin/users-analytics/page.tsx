import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import UserAnalytics from "@/components/adminComponents/Analytics/UserAnalytics";
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
      <div className="flex">
        <AdminSidebar active={11} />

        <div className="w-full">
          <UserAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
