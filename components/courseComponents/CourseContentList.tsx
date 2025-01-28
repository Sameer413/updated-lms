"use client";
import React, { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import OptimizedAccordion from "../ui/OptimizedAccordian";
import { courseContentData } from "@/mappedData";
import { MdOutlineLiveTv } from "react-icons/md";

const HeaderComponent: FC<{
  title: string;
  duration: number;
  lessons: number;
  isActive: boolean;
  toggle: () => void;
}> = ({ title, duration, lessons, isActive, toggle }) => (
  <div
    onClick={toggle}
    className="flex justify-between items-center cursor-pointer"
  >
    <div className="font-Poppins text-base">
      <div className="mb-2">{title}</div>
      <div className="flex text-xs gap-1 text-white/80">
        <div>{lessons} Lessons</div>
        <div>{"•"}</div>
        <div>{duration} mins</div>
      </div>
    </div>
    <div>
      <IoIosArrowDown
        className={`transition-transform duration-150 ease-linear text-2xl ${
          isActive ? "rotate-180" : ""
        }`}
      />
    </div>
  </div>
);

const BodyComponent: FC<{
  data: { id: number; title: string; duration: number }[];
}> = ({ data }) => (
  <div>
    {data.map(({ id, title, duration }) => (
      <div key={id} className="mb-2 flex items-center gap-3 cursor-pointer">
        <div className="">
          <MdOutlineLiveTv className="text-2xl" />
        </div>
        <div className="">
          <div className="font-Poppins text-base">{title}</div>
          <div className="font-Poppins text-sm">{duration} mins</div>
        </div>
      </div>
    ))}
  </div>
);

const CourseContentList = () => {
  return (
    <OptimizedAccordion
      items={courseContentData}
      HeaderComponent={HeaderComponent}
      BodyComponent={({ data }) => <BodyComponent data={data} />}
    />
  );
};

export default CourseContentList;
