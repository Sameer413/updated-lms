"use client";
import React, { useState } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { MaxWidthWrapper } from "@/components/layout/MaxWidthWrapper";
import ProfileSidebar from "@/components/profileComponents/ProfileSidebar";
import MyAccount from "@/components/profileComponents/MyAccount";
import EnrolledComponent from "@/components/profileComponents/EnrolledComponent";
import CoursesCertificates from "@/components/profileComponents/CoursesCertificates";
import Leaderboard from "@/components/profileComponents/Leaderboard";
import MyTickets from "@/components/profileComponents/MyTickets";
import ChangedPassword from "@/components/profileComponents/ChangedPassword";

const Page = () => {
  const [active, setActive] = useState("my-account");

  const Component = () => {
    switch (active) {
      case "my-account":
        return <MyAccount />;
      case "enrolled-courses":
        return <EnrolledComponent />;
      case "changed-password":
        return <ChangedPassword />;
      case "courses-certificate":
        return <CoursesCertificates />;
      case "leaderboard":
        return <Leaderboard />;
      case "my-tickets":
        return <MyTickets />;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <MaxWidthWrapper className="my-20 flex w-full">
        <div className="w-3/12">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="flex-1">
          <Component />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default Page;
