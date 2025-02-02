"use client";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import Image from "next/image";
import Banner from "../public/assests/banner.png";
import { Button } from "@/components/ui/Button";
import CourseCard from "@/components/ui/CourseCard";
import Marquee from "@/components/ui/Marquee";
import { accordianData, marqueeItems } from "@/mappedData";
import Accordian from "@/components/ui/Accordian";
import Footer from "@/components/layout/Footer";
import { useLazyGetRefreshTokenQuery } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Link from "next/link";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import Loader from "@/components/layout/Loader";

export default function Home() {
  const [refreshToken, {}] = useLazyGetRefreshTokenQuery();
  const { data: courseData, isLoading } = useGetAllCoursesQuery({});

  const { data, error, refetch } = useLoadUserQuery();

  useEffect(() => {
    const doSomething = async () => {
      console.log("called");

      await refreshToken();
      await refetch();
    };

    if (error) {
      doSomething();
    }
  }, [data, error]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-full">
      <Header />
      <section>
        <MaxWidthWrapper className="flex items-center">
          <div className="flex-1">
            <div className=" text-6xl font-bold">
              Build Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
                Mobile App Development{" "}
              </span>
              Career With React Native
            </div>
            <div className="text-2xl my-4 font-semibold text-secondary">
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
            <div className="text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
              Popular{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
                Courses
              </span>
            </div>
            <div className="text-center text-xl text-secondary font-semibold relative">
              {" "}
              <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1" />{" "}
              our comprehensive project based courses
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 my-20 px-5">
            {courseData?.courses?.map(
              ({ _id, name, price, estimatedPrice, ratings, thumbnail }) => (
                <CourseCard
                  key={_id}
                  estimatedPrice={estimatedPrice}
                  price={price}
                  title={name}
                  rating={ratings}
                  thumbnail={thumbnail.url}
                />
              )
            )}
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
              ELearning{" "}
            </span>
            Trusted By
          </div>
          <div className="my-10">
            <Marquee className="">
              {marqueeItems.map((item: string, idx: number) => (
                <Image
                  key={idx}
                  src={item}
                  alt=""
                  objectFit="contain"
                  width={200}
                  height={200}
                  className="w-52 h-auto object-contain mx-6"
                />
              ))}
            </Marquee>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="text-5xl text-center font-medium tracking-wide mb-2 font-Poppins">
            Comman{" "}
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
