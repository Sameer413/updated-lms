import React from "react";
import { cn } from "@/utils/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Marquee: React.FC<Props> = ({ children, className }) => {
  return (
    <div
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
