import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import AdminCourses from "@/components/adminComponents/Content/AdminCourses";
// import Heading from '@/app/utils/Heading'
import React from "react";

const page = () => {
  return (
    <div>
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex">
        <AdminSidebar active={5} />

        <div className="w-full">
          <AdminCourses />
        </div>
      </div>
    </div>
  );
};

export default page;
