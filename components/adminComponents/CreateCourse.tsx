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
import { useLazyGetRefreshTokenQuery } from "@/redux/features/auth/authApi";
import { useUploadFile } from "@/hooks/useUpload";

export interface courseStateType {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  categories: string;
  tags: string;
  level: string;
  thumbnail: {
    file: File | null;
    preview: string | null;
  };
  benefits?: { title: string }[];
  prerequisites?: { title: string }[];
}

const CreateCourse = () => {
  const [createCourseHandler, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  const [refreshToken, {}] = useLazyGetRefreshTokenQuery();

  const { uploadFile, progress, uploading } = useUploadFile();
  const [active, setActive] = useState(0);

  const [courseInformation, setCourseInformation] = useState({
    name: "name",
    description: "description",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "Beginner",
    categories: "",
    thumbnail: {
      file: null,
      preview: "",
    },
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      // redirect("/admin/courses");
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
      name: courseInformation.name,
      description: courseInformation.description,
      price: courseInformation.price,
      estimatedPrice: courseInformation.estimatedPrice,
      tags: courseInformation.tags,
      thumbnail: courseInformation.thumbnail.preview,
      file: courseInformation.thumbnail.file,
      level: courseInformation.level || "Beginner",
      benefits: formattedBenefits,
      categories: courseInformation.categories,
      prerequisites: formattedPrerequisites,
    };

    setCourseData((prev) => {
      console.log("Updated Data before sending:", data);
      return data;
    });
  };

  const handleCourseCreate = async () => {
    await refreshToken();

    const {
      success,
      path,
      url,
      error: uplerr,
    } = await uploadFile({
      bucket: "thumbnails",
      file: courseData.file,
      fileName: "temp",
    });

    if (uplerr) {
      return console.log(uplerr);
    }
    if (!success) {
      return alert("Not success");
    }
    // console.log(path, " ", url, " ", fileUrl);

    const payload = {
      name: courseData.name,
      description: courseData.description,
      benefits: courseData.benefits,
      prerequisites: courseData.prerequisites,
      url: url, // ✅ Ensure url is passed correctly
      path: path, // ✅ Ensure path is passed correctly
      categories: "fsdfdsf",
      level: courseData.level,
      price: courseData.price,
      estimatedPrice: courseData.estimatedPrice,
    };
    console.log(payload);

    await createCourseHandler(payload);
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
            courseInfo={courseInformation}
            setCourseInfo={setCourseInformation}
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
        {/* {uploading && <div>uploading...</div>} */}
      </div>
    </div>
  );
};

export default CreateCourse;
