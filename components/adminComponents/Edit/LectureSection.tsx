"use client";
import React, { FC, useEffect, useState } from "react";
import LectureSectionCard from "./LectureSectionCard";

import Loader from "@/components/layout/Loader";
import {
  // useAddCourseDataMutation,
  // useDeleteCourseDataMutation,
  useGetAllCourseDataQuery,
} from "@/redux/features/courseData/courseDataApi";
import AddLectureModal from "./AddLectureModal";

type LectureSectionProps = {
  id: string;
};

const LectureSection: FC<LectureSectionProps> = ({ id }: { id: string }) => {
  const deleteCourseData = () => {};
  const [organizedData, setOrganizedData] = useState<any[]>();
  const { data, isLoading } = useGetAllCourseDataQuery({ courseId: id });

  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("API Response:", data); // ✅ Check if API returns correct data

    if (data?.data?.courseData) {
      console.log("Course Data Received:", data.data.courseData); // ✅ Debugging API Data

      // @ts-expect-error
      const groupedDataMap = data.data.courseData.reduce<Record<string, any[]>>(
        (acc, item) => {
          const section = item.videoSection || "Uncategorized";
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(item);
          return acc;
        },
        {}
      );

      // Convert object to array
      const groupedArray = Object.entries(groupedDataMap).map(
        ([section, items]) => ({
          section,
          data: items,
        })
      );

      console.log(groupedArray);
      setOrganizedData(groupedArray);
    }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mx-auto w-full">
      {show && <AddLectureModal setShow={setShow} courseId={id} />}

      <div className="mb-10 w-[90%] flex justify-end">
        <button
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => setShow(true)}
        >
          Create Section
        </button>
      </div>

      <div className="flex flex-col items-center">
        {organizedData?.map((item) => (
          <LectureSectionCard
            key={item._id}
            id={item._id}
            sectionTitle={item.section}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
};

export default LectureSection;
