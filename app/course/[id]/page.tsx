"use client";
import CourseDetailSection from "@/components/courseComponents/CourseDetailSection";
import CourseImageSection from "@/components/courseComponents/CourseImageSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loader from "@/components/layout/Loader";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import { useGetCourseByIdQuery } from "@/redux/features/course/courseApi";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetCourseByIdQuery(
    { courseId: params.id },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Header />
      <MaxWidthWrapper className="flex w-full py-5">
        <div className="w-[70%]">
          <CourseDetailSection data={data?.course} />
        </div>
        <div className="w-[30%]">
          <CourseImageSection data={data?.course} />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default Page;
