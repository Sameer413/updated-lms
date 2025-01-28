"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Img from "../../../public/assests/CoursePoster.png";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Ratings from "@/components/ui/Ratings";
import {
  useDeleteCourseMutation,
  useGetAdminCoursesQuery,
} from "@/redux/features/course/courseApi";
import Loader from "@/components/layout/Loader";
import toast from "react-hot-toast";

type CourseCardProps = {
  name?: string;
  purchased?: number;
  ratings?: number;
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setCourseId: (id: string) => void;
  thumbnail: string;
};

const CourseCard: FC<CourseCardProps> = ({
  name,
  purchased,
  ratings,
  id,
  open,
  setOpen,
  setCourseId,
  thumbnail,
}) => {
  const ThumbnailImg = thumbnail;

  return (
    <div className="mb-4 bg-slate-500 rounded-lg p-2 border-[#ffffff1d] border bg-opacity-20 flex">
      <Image
        src={ThumbnailImg || Img}
        alt=""
        width={200}
        height={1}
        className="w-[200px] h-full object-contain rounded-lg"
      />

      <div className="w-[calc(100%-200px)] flex ml-3 mt-1">
        <div className="w-[75%]">
          <div className="font-Poppins opacity-80 mb-2">Course Id: {id}</div>
          <div className="text-lg font-medium truncate">{name}</div>

          <div className="flex justify-between mt-4">
            <Ratings rating={ratings || 0} />
            <span>Purchased: {purchased}</span>
          </div>
        </div>

        <div className="flex items-center w-[25%]">
          <div className="flex-1 flex justify-center items-center ">
            <Link
              className="flex items-center gap-2 text-lg font-medium hover:text-blue-500 transition-colors"
              href={`/admin/edit-course/${id}`}
            >
              Edit
              <FiEdit2 />
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center ">
            <button
              className="flex text-lg font-medium items-center gap-2 hover:text-[#FF6347] transition-colors"
              onClick={() => {
                setOpen(true);
                setCourseId(id);
              }}
            >
              Delete
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const AdminCourses = () => {
  const { data, isLoading, refetch } = useGetAdminCoursesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteCourse, { error, isSuccess }] = useDeleteCourseMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [courseId, setCouresId] = useState<string>();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("Course Deleted Successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleCoursedelete = (courseId: any) => {
    deleteCourse({ id: courseId });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mt-[120px] px-5 relative">
      {open && (
        <div className="absolute flex items-center justify-center w-full h-[60vh] z-10">
          <div className="bg-slate-900 p-5 rounded bg-opacity-100 shadow shadow-slate-600">
            <div className="mt-3 text-lg">
              Do you want to delete course?
              <div className="">Id: {courseId}</div>
            </div>
            <div className="flex justify-between my-5">
              <button
                className="hover:shadow hover:shadow-red-500 transition-colors px-3 py-2 text-lg rounded bg-red-500 font-medium"
                onClick={() => handleCoursedelete(courseId)}
              >
                Delete
              </button>
              <button
                className="hover:shadow hover:shadow-green-500 transition-colors px-3 py-2 text-lg rounded bg-green-500 font-medium"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {data?.courses.map((course: any) => {
        return (
          <div key={course._id}>
            <CourseCard
              name={course.name}
              purchased={course.purchased}
              ratings={course.ratings}
              id={course._id}
              open={open}
              setOpen={setOpen}
              setCourseId={setCouresId}
              thumbnail={course?.thumbnail?.url}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdminCourses;
