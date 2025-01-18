"use client";
import React from "react";
// import { motion } from "motion/react";
import { cn } from "@/utils/utils";

const Marquee = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  //   const marqueeVariants = {
  //     animate: {
  //       x: [0, -100],
  //       transition: {
  //         x: {
  //           repeat: Infinity,
  //           repeatType: "loop",
  //           duration: 1500,
  //           ease: "linear",
  //         },
  //       },
  //     },
  //   };

  return (
    <div
      //   variants={marqueeVariants}
      className={cn(
        "flex text-6xl flex-nowrap overflow-hidden select-none",
        className
      )}
    >
      <div className="animate-marquee flex flex-shrink-0 flex-nowrap">
        {children}
      </div>

      <div className="animate-marquee flex flex-shrink-0 flex-nowrap">
        {children}
      </div>
    </div>
  );
};

export default Marquee;
