"use client";
import { styles } from "@/app/styles/styles";
import Ratings from "@/components/ui/Ratings";
import { useGetCourseByIdQuery } from "@/redux/features/course/courseApi";
import Image from "next/image";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Loader from "@/components/layout/Loader";
import Link from "next/link";

type EditCourseProps = {
  id: string;
};

const EditCourse: FC<EditCourseProps> = ({ id }) => {
  // const [price, setPrice] = useState();
  const { data, isLoading } = useGetCourseByIdQuery(
    { courseId: id },
    { refetchOnMountOrArgChange: true }
  );

  // console.log(typeof data.course.price);

  const percentageOff = (estimatedPrice: number, currentPrice: number) => {
    return Math.floor(((estimatedPrice - currentPrice) / estimatedPrice) * 100);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          {/* Later we set the player for demo vedio */}
          <Image
            src={data.course?.thumbnail.url}
            className="w-2/3 aspect-video"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {data.course?.price === 0 ? "Free" : data.course?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {data.course?.price === 0 ? "" : data.course?.estimatedPrice + "$"}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {data?.price === undefined ||
            data?.price === null ||
            data?.price <= 0
              ? "100% Off"
              : percentageOff(data?.course.estimatedPrice, data?.course.price) +
                "% Off"}
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {data.course?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">• Source code included</p>
        <p className="pb-1">• Full lifetime access</p>
        <p className="pb-1">• Certificate of completion</p>
        <p className="pb-3 800px:pb-1 ">• Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {data.course?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data.course?.ratings} />
              <h5>0 Reviews</h5>
            </div>
            <h5>{data.course?.purchased} Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>
        {data.course?.benefits?.map(
          ({ title }: { title: string }, index: number) => (
            <div key={index} className="w-full flex 800px:items-center py-2">
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{title}</p>
            </div>
          )
        )}
        <br />
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What are the prerequisites for starting this course?
        </h1>
        {data?.course?.prerequisites?.map(
          ({ title }: { title: string }, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{title}</p>
            </div>
          )
        )}
        <br />
        <br />
        {/* course description */}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {data?.course?.description}
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className="w-full flex items-center justify-between">
        <Link
          href={`/admin/edit-course/lectures/${id}`}
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        >
          Add Lecture Sections
        </Link>
        {/* <Link
          href={`/admin/edit-course/information/${id}`}
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        >
          Update Information
        </Link> */}
        {/* <div
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => {}}
        >
          Update Course
        </div> */}
      </div>
    </div>
  );
};

export default EditCourse;
