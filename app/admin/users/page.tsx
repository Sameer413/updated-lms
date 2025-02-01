import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import AllUsers from "@/components/adminComponents/AllUsers";
// import Heading from '@/app/utils/Heading'
import React from "react";

const page = () => {
  // const rows: any = [];

  return (
    <div className="">
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex">
        <AdminSidebar active={2} />

        <div className="w-full">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default page;
