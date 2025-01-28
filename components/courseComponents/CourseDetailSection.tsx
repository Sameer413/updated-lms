import React from "react";
import { RiCheckDoubleFill } from "react-icons/ri";
import Ratings from "../ui/Ratings";
import CourseContentList from "./CourseContentList";

const CourseDetailSection = ({ data }) => {
  const { name, ratings, reviews, purchased, description } = data;

  return (
    <div className="flex flex-col gap-6 pr-10">
      <div className="text-2xl font-Poppins font-semibold">{name}</div>
      <div className="flex items-center justify-between text-base font-Poppins">
        <div className="flex items-center">
          <Ratings rating={ratings} />{" "}
          <div className="ml-1 mt-0.5">{reviews?.length} Reviews</div>
        </div>
        <div>{purchased} Students</div>
      </div>

      {/* benefits */}
      <div>
        <div className="text-xl font-Poppins font-semibold mb-2">
          What you will learn from this course?
        </div>
        <div className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
        <div className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
        <div className="flex items-center gap-2 font-Poppins dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
      </div>
      {/* prerequisites */}
      <div className="">
        <div className="text-xl font-Poppins font-semibold mb-2">
          What are the prerequisites for starting this course?
        </div>
        <div className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
        <div className="flex items-center gap-2 font-Poppins mb-1 dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
        <div className="flex items-center gap-2 font-Poppins dark:text-white/80">
          <RiCheckDoubleFill className="text-xl" />
          <div className="">
            You Will be able to build a full stack LMS Platform
          </div>
        </div>
      </div>

      {/* Course Overview */}

      <div className="flex flex-col gap-6">
        <div className="text-xl font-Poppins font-medium">Course Overview</div>
        <div className="mt-4">{description}</div>
      </div>

      <CourseContentList />
    </div>
  );
};

export default CourseDetailSection;
