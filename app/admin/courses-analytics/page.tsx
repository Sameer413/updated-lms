import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import CourseAnalytics from "@/components/adminComponents/Analytics/CourseAnalytics";
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
        <AdminSidebar active={9} />

        <div className="w-full">
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
