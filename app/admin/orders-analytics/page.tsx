import AdminSidebar from "@/components/adminComponents/AdminSidebar";
import OrderAnalytics from "@/components/adminComponents/Analytics/OrderAnalytics";
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
        <AdminSidebar active={10} />

        <div className="w-full">
          <OrderAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
