import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import { aboutData } from "@/mappedData";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <MaxWidthWrapper>
        <div className="text-5xl text-center font-medium tracking-wide mb-2 font-Poppins py-10">
          What is{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">
            ELearning?
          </span>
        </div>

        {aboutData.map((item: string, idx: number) => {
          return (
            <div key={idx} className="mb-5 text-xl font-Josefin font-medium">
              {item}
            </div>
          );
        })}

        <div className="mb-10">
          <div className="italic underline text-3xl">S.r.nimje</div>
          <div className="mt-1">Founder and CEO of ELearning</div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default Page;
