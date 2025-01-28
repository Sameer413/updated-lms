"use client";
import CourseContentList from "@/components/courseComponents/CourseContentList";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import { cn } from "@/utils/utils";
import React, { useState } from "react";

const Page = () => {
  const [active, setActive] = useState<number>(0);

  return (
    <div className="">
      <Header />
      <MaxWidthWrapper className="my-4">
        <div className="grid grid-cols-[2fr_1fr] gap-3">
          <div className="">
            <div className="">
              <iframe
                src=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Vedio Player"
                className="aspect-video w-full border"
              ></iframe>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-Poppins font-semibold">
                Build Your Mobile App Development Career With React Native
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dignissimos, sapiente impedit voluptatum autem suscipit
                  aliquid perspiciatis eligendi, a commodi officiis earum
                  deserunt sint. Incidunt assumenda temporibus, libero quisquam
                  id necessitatibus hic iste dicta eum?
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
          <div className="">
            <div className="font-Poppins text-2xl font-semibold">Playlist</div>
            <CourseContentList />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
