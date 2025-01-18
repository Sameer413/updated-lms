import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import CourseCard from "@/components/ui/CourseCard";
import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <MaxWidthWrapper>
        <div className="w-full mt-10">
          <div className="text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
              Courses
            </span>
          </div>
          <div className="text-center text-xl text-secondary font-semibold relative">
            {" "}
            <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1" />{" "}
            our comprehensive project based courses
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 my-20 px-5">
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default Page;
