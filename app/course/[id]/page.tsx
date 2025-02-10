"use client";
import React from "react";

import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import Loader from "../../../components/layout/Loader";

import CourseDetailSection from "../../../components/courseComponents/CourseDetailSection";
import CourseImageSection from "../../../components/courseComponents/CourseImageSection";
import { MaxWidthWrapper } from "../../../components/layout/MaxWidthWrapper";

import { useGetCourseByIdQuery } from "../../..//redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetCourseByIdQuery(
    { courseId: params.id },
    { refetchOnMountOrArgChange: true }
  );
  const { user } = useSelector<RootState>((state) => state?.auth);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <MaxWidthWrapper className="flex flex-col-reverse lg:flex-row md:flex-row w-full py-5">
        <div className="md:w-[70%] lg:w-[70%]">
          <CourseDetailSection data={data?.course} />
        </div>
        <div className="md:w-[30%] lg:w-[30%]">
          <CourseImageSection data={data?.course} userCourses={user?.courses} />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default Page;
