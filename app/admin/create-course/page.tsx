import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import CreateCourse from "@/components/adminComponents/CreateCourse";
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
        <AdminSidebar active={4} />

        <div className="w-full">
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
