import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import EditCourse from "@/components/adminComponents/Edit/EditCourse";
// import Heading from '@/app/utils/Heading'
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="">
      {/* <Heading
                title='E-Learning | Admin'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming,MERN,Redux,Machine Learning'
            /> */}
      <div className="flex">
        <AdminSidebar active={5} />

        <div className="w-full">
          <EditCourse id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
