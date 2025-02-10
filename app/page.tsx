"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/layout/Header";
import CourseCard from "../components/ui/CourseCard";
import { Button } from "../components/ui/Button";
import Marquee from "../components/ui/Marquee";
import Accordian from "../components/ui/Accordian";
import { MaxWidthWrapper } from "../components/layout/MaxWidthWrapper";
import Footer from "../components/layout/Footer";
import Loader from "../components/layout/Loader";

import Banner from "../public/assests/banner.png";
import { accordianData, marqueeItems } from "../mappedData";

import { useLazyGetRefreshTokenQuery } from "../redux/features/auth/authApi";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import { useGetAllCoursesQuery } from "../redux/features/course/courseApi";

import { courseType } from "@/types/types";

export default function Home() {
  const [refreshToken, {}] = useLazyGetRefreshTokenQuery();
  const { data: courseData, isLoading } = useGetAllCoursesQuery({});

  const { data, error, refetch } = useLoadUserQuery();

  useEffect(() => {
    const refreshAndCall = async () => {
      await refreshToken();
      await refetch();
    };

    if (error) {
      refreshAndCall();
    }
  }, [data, error]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-full">
      <Header />
      <section>
        <MaxWidthWrapper className="flex items-center flex-col lg:flex-row md:flex-row mt-4 lg:mt-0 md:mt-0">
          <div className="flex-1 flex flex-col items-center md:items-start lg:items-start">
            <div className="text-4xl lg:text-6xl font-bold text-center lg:text-start md:text-start">
              Build Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
                Mobile App Development{" "}
              </span>
              Career With React Native
            </div>
            <div className="text-xl lg:text-2xl my-4 lg:font-semibold text-secondary text-center lg:text-start md:text-start">
              Everything you need in one course to become a beginner to expert
              level mobile app developer.
            </div>
            <Link href={"/courses"}>
              <Button size={"lg"} className="rounded-full text-white">
                Expolre Now
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <Image src={Banner} alt="" objectFit="contain" />
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="w-full">
            <div className="text-4xl lg:text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
              Popular{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                Courses
              </span>
            </div>
            <div className="text-center lg:text-xl text-secondary font-semibold relative">
              {" "}
              <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1" />{" "}
              our comprehensive project based courses
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 lg:my-20 px-5">
            {courseData?.courses?.map(
              ({
                _id,
                name,
                price,
                estimatedPrice,
                ratings,
                thumbnail,
              }: courseType) => (
                <CourseCard
                  key={_id}
                  id={_id}
                  estimatedPrice={estimatedPrice || 0}
                  price={price}
                  title={name}
                  rating={ratings || 0}
                  thumbnail={thumbnail.url}
                />
              )
            )}
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="text-4xl lg:text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
              ELearning{" "}
            </span>
            Trusted By
          </div>
          <div className="my-5 lg:my-10">
            <Marquee className="">
              {marqueeItems.map((item: string, idx: number) => (
                <Image
                  key={idx}
                  src={item}
                  alt=""
                  objectFit="contain"
                  width={200}
                  height={200}
                  className="w-32 lg:w-52 h-auto object-contain mx-6"
                />
              ))}
            </Marquee>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="text-4xl lg:text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
            Common{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
              FAQ
            </span>
          </div>
          <div className="text-center text-xl text-secondary font-semibold relative">
            <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2" />
            Frequently asked questions
          </div>
          <div className="my-10">
            <Accordian items={accordianData} />
          </div>
        </MaxWidthWrapper>
      </section>
      <Footer />
    </div>
  );
}
