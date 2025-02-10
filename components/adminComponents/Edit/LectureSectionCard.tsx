"use client";
import { useDeleteCourseDataMutation } from "@/redux/features/courseData/courseDataApi";
// import { useDeleteCourseDataMutation } from "@/redux/features/course/courseApi";
import React, { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface LectureSectionCardProps {
  id: string;
  courseDataId?: string;
  sectionTitle: string;
  data: any;
}

const LectureSectionCard: FC<LectureSectionCardProps> = ({
  sectionTitle,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteData, {}] = useDeleteCourseDataMutation();

  return (
    <div className="border w-[80%] p-4 rounded-md mb-4 ">
      <div
        className="w-full text-xl font-Poppins font-medium flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="text-xl cursor-pointer w-full mr-2">{sectionTitle}</div>
        <button className="" onClick={() => {}}>
          <MdDeleteOutline size={25} />
        </button>
      </div>

      {open && (
        <>
          {data.map((item, idx) => (
            <div key={idx} className="">
              <div className="flex justify-between items-center mt-3 px-2">
                <div className="text-lg">{item.title}</div>
                <button
                  onClick={() => deleteData({ courseDataId: item._id })}
                  className="hover:text-red-500 transition-colors duration-150"
                >
                  <MdDeleteOutline size={25} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-5 gap-2 w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer">
            Add Lecture <FaPlus />
          </div>
        </>
      )}
    </div>
  );
};

export default LectureSectionCard;
