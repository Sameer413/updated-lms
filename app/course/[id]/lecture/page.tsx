"use client";
import CourseContentList from "@/components/courseComponents/CourseContentList";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import { useGetCourseByIdQuery } from "@/redux/features/course/courseApi";
import {
  useGetAllCourseDataQuery,
  useLazyRetrieveCourseDataQuery,
} from "@/redux/features/courseData/courseDataApi";
import { cn } from "@/utils/utils";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [active, setActive] = useState<number>(0);
  const [content, setContent] = useState<string>();
  const [link, setLink] = useState(null);
  const { data } = useGetCourseByIdQuery(
    { courseId: params.id },
    { refetchOnMountOrArgChange: true }
  );
  const [retrieveData, {}] = useLazyRetrieveCourseDataQuery();

  useEffect(() => {
    const resp = async () => {
      const { data: courseData } = await retrieveData({ id: content });

      setLink(courseData?.data?.courseData?.videoUrl); // Updates state asynchronously
    };

    if (content) resp();
  }, [content]);

  return (
    <div className="">
      <Header />
      <MaxWidthWrapper className="my-4">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-3 h-screen">
          <div className="">
            <div className="">
              <iframe
                src={link || ""}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Vedio Player"
                className="aspect-video w-full border"
              ></iframe>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-Poppins font-semibold">
                {data?.course?.name}
              </div>

              <div className="mt-4 flex p-4 justify-between dark:bg-slate-50 dark:bg-opacity-20 bg-slate-900 bg-opacity-10 rounded-md">
                {["Overview", "Resources", "Q&A", "Reviews"].map(
                  (item: string, idx: number) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => setActive(idx)}
                        className={cn(
                          "font-Poppins text-base font-medium",
                          active === idx && "text-red-500 font-semibold"
                        )}
                      >
                        {item}
                      </button>
                    );
                  }
                )}
              </div>

              {active === 0 && (
                <p className="text-base whitespace-pre-line mt-4 font-Poppins ">
                  {data?.course.description}
                </p>
              )}

              {active === 1 && (
                <div className="text-base whitespace-pre-line mt-4 font-Poppins">
                  link
                </div>
              )}

              {active === 2 && (
                <div className="text-base whitespace-pre-line mt-4 font-Poppins">
                  comming soon
                </div>
              )}

              {active === 3 && (
                <div className="text-base whitespace-pre-line mt-4 font-Poppins">
                  reviews
                </div>
              )}
            </div>
          </div>
          <div className="h-full">
            <div className="font-Poppins text-2xl font-semibold">Playlist</div>
            <CourseContentList
              courseId={params.id}
              setContent={setContent}
              activeContent={content}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
