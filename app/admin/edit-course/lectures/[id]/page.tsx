import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import LectureSection from "@/components/adminComponents/Edit/LectureSection";
// import Heading from '@/app/utils/Heading'
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="">
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex">
        <AdminSidebar active={5} />

        <div className="w-full mt-10">
          <LectureSection id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
