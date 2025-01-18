"use client";
import { cn } from "@/utils/utils";
import React, { FC, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface AccordianProps {
  items: { title: string; subTitle: string }[];
}

const Accordian: FC<AccordianProps> = ({ items }) => {
  const [active, setActive] = useState<number | null>();

  const handleOpen = (idx: number) => {
    setActive(idx === active ? null : idx);
  };

  return items.map((item, idx: number) => (
    <div
      key={idx}
      onClick={() => handleOpen(idx)}
      className={cn(
        "py-4 my-2 cursor-pointer",
        idx === items.length - 1 ? "border-none" : "border-b"
      )}
    >
      <div className="flex justify-between items-center gap-2 ">
        <div className="">{item.title}</div>
        <div className="mr-1">{active === idx ? <FaMinus /> : <FaPlus />}</div>
      </div>
      {active === idx && <div className="mt-5">{item.subTitle}</div>}
    </div>
  ));
};

export default Accordian;
