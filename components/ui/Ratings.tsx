import React from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

const Ratings = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <IoIosStar
          key={i}
          size={20}
          className="cursor-pointer fill-[#f6ba00]"
        />
      );
    } else if (i === Math.round(rating)) {
      stars.push(
        <IoIosStarHalf
          key={i}
          size={20}
          className="cursor-pointer fill-[#f6ba00]"
        />
      );
    } else {
      stars.push(
        <IoIosStarOutline
          key={i}
          size={20}
          className="cursor-pointer fill-[#f6ba00]"
        />
      );
    }
  }

  return <div className="flex items-center">{stars}</div>;
};

export default Ratings;
