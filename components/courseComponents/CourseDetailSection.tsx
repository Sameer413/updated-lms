import React from "react";
import { RiCheckDoubleFill } from "react-icons/ri";
import Ratings from "../ui/Ratings";
import CourseContentList from "./CourseContentList";
import { courseType } from "@/types/types";

const CourseDetailSection = ({ data }: { data: courseType }) => {
  const {
    _id,
    name,
    ratings,
    reviews,
    purchased,
    description,
    benefits,
    prerequisites,
  } = data;

  return (
    <div className="flex flex-col gap-6 pr-4 lg:pr-10">
      <div className="text-2xl font-Poppins font-semibold hidden md:block lg:block">
        {name}
      </div>
      <div className="flex items-center justify-between text-base font-Poppins mt-6 lg:mt-0">
        <div className="flex items-center">
          <Ratings rating={ratings || 0} />{" "}
          <div className="ml-1 mt-0.5">{reviews?.length} Reviews</div>
        </div>
        <div>{purchased} Students</div>
      </div>

      {/* benefits */}
      <div>
        <div className="text-lg lg:text-xl font-Poppins font-semibold mb-2">
          What you will learn from this course?
        </div>
        {benefits?.map(({ title }, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80"
          >
            <RiCheckDoubleFill className="text-xl" />
            <div className="">{title}</div>
          </div>
        ))}
      </div>
      {/* prerequisites */}
      <div>
        <div className="text-lg lg:text-xl font-Poppins font-semibold mb-2">
          What are the prerequisites for starting this course?
        </div>
        {prerequisites?.map(({ title }, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80"
          >
            <RiCheckDoubleFill className="text-xl" />
            <div className="">{title}</div>
          </div>
        ))}
      </div>

      {/* Course Overview */}

      <div className="flex flex-col lg:gap-6">
        <div className="text-lg lg:text-xl font-Poppins font-medium">
          Course Overview
        </div>
        <div className="mt-4">{description}</div>
      </div>

      <CourseContentList courseId={_id} />
    </div>
  );
};

export default CourseDetailSection;
