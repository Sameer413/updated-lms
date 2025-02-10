"use client";

import React, { FC, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLiveTv } from "react-icons/md";
import { motion } from "motion/react";

import OptimizedAccordion from "../ui/OptimizedAccordian";
import { useGetAllCourseDataQuery } from "@/redux/features/courseData/courseDataApi";
import { cn } from "@/utils/utils";

const HeaderComponent: FC<{
  section: string;
  videoLength: number;
  lessons: number;
  isActive: boolean;
  toggle: () => void;
}> = ({ section, videoLength, lessons, isActive, toggle }) => (
  <div
    onClick={toggle}
    className="flex justify-between items-center cursor-pointer"
  >
    <div className="font-Poppins text-base">
      <div className="mb-2">{section}</div>
      <div className="flex text-xs gap-1 text-white/80">
        <div>{lessons} Lessons</div>
        <div>{"•"}</div>
        <div>{videoLength} mins</div>
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
  data: {
    id: number;
    title: string;
    duration: number;
    videoLength?: string;
    videoUrl: string;
  }[];
  setContent: (content: string) => void;
  activeContent?: string;
}> = ({ data, setContent, activeContent }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {data.map(({ id, title, videoLength, videoUrl }) => (
        <div
          onClick={() => {
            console.log(data);
            setContent(id.toString());
          }}
          key={id}
          className={cn(
            "mb-2 p-2 flex items-center gap-3 cursor-pointer",
            activeContent === id.toString() && "bg-slate-600/20"
          )}
        >
          <div className="">
            <MdOutlineLiveTv className="lg:text-2xl" />
          </div>
          <div className="">
            <div className="font-Poppins text-sm lg:text-base">{title}</div>
            <div className="font-Poppins text-xs lg:text-sm">
              {videoLength} mins
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const CourseContentList: React.FC<{
  courseId: string;
  activeContent?: string;
  setContent: (content: string) => void;
}> = ({ courseId, activeContent, setContent }) => {
  const { data, isLoading } = useGetAllCourseDataQuery({ courseId });
  const [organizedData, setOrganizedData] = useState<any[]>();

  useEffect(() => {
    if (data?.data?.courseData) {
      // @ts-expect-error
      const groupedDataMap = data.data.courseData.reduce<Record<string, any[]>>(
        (acc, item) => {
          const section = item.videoSection || "Uncategorized";
          if (!acc[section]) acc[section] = [];

          // Ensure correct data format for `BodyComponent`
          acc[section].push({
            id: item._id, // Convert MongoDB _id to id
            title: item.title,
            duration: item.videoLength, // videoLength is in minutes
          });

          return acc;
        },
        {}
      );

      // Convert object to array for rendering
      const groupedArray = Object.entries(groupedDataMap).map(
        ([section, items]) => ({
          section,
          data: items,
        })
      );

      setOrganizedData(groupedArray);
    }
  }, [data]);

  useEffect(() => {
    setContent(organizedData?.[0]?.data?.[0]?.id);
  }, [organizedData]);

  return (
    !isLoading && (
      <OptimizedAccordion
        items={organizedData || []}
        HeaderComponent={HeaderComponent}
        BodyComponent={({ data }) => (
          <BodyComponent
            setContent={setContent}
            data={data}
            activeContent={activeContent}
          />
        )}
        open
      />
    )
  );
};

export default CourseContentList;
