"use client";
import React, { useEffect, useState } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/course/courseApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

const CreateCourse = () => {
  const [createCourseHandler, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      // level: courseInfo.level,
      benefits: formattedBenefits,
      categories: courseInfo.categories,
      prerequisites: formattedPrerequisites,
    };

    setCourseData({ ...data });
    console.log(courseData);
  };

  const handleCourseCreate = async () => {
    await createCourseHandler(courseData);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full flex">
      <div className="w-[80%] mt-24">
        {active === 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 2 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            isEdit={false}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] fixed z-[-1] top-16 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
