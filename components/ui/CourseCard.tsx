import Image from "next/image";
import React from "react";
import tempThumbnail from "../../public/assests/thumbnail.webp";
import Link from "next/link";
import { IoListSharp } from "react-icons/io5";
import Ratings from "./Ratings";

const CourseCard = () => {
  return (
    <Link href={"/"}>
      <div className="bg-slate-500 p-2 backdrop-blur bg-opacity-20 rounded-lg">
        <Image
          src={tempThumbnail}
          alt=""
          objectFit="contain"
          className="w-full h-auto rounded-md"
        />
        <div className="my-3 px-1">
          <div className="capitalize text-lg font-normal font-Poppins">
            Build your mobile app development career with react native
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="">
              <Ratings rating={2.5}/>
            </div>
            <div className="">106 Students</div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <div className="">₹99.99</div>
              <div className="-mt-2 line-through text-sm">₹99.9</div>
            </div>
            <div className="flex items-center gap-1">
              <IoListSharp className="mt-1" size={18} />
              <span className="">15 Lectures</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
