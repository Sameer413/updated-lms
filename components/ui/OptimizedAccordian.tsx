"use client";
import { cn } from "@/utils/utils";
import React, { FC, useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa6";

// interface OptimizedAccordianProps {
//   items: any[];
//   HeaderComponent: any;
//   BodyComponent: any;
// }

interface OptimizedAccordionProps<T> {
  items: T[];
  //   HeaderComponent: FC<T>;
  HeaderComponent: FC<T & { isActive: boolean; toggle: () => void }>;
  BodyComponent: FC<T>;
}

const OptimizedAccordion = <T extends Record<string, unknown>>({
  items,
  HeaderComponent,
  BodyComponent,
}: OptimizedAccordionProps<T>) => {
  const [active, setActive] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setActive(idx === active ? null : idx);
  };

  return (
    <div>
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleOpen(idx)}
          className={cn(
            "py-2 my-2",
            idx === items.length - 1 ? "border-none" : "border-b"
          )}
        >
          {/* Custom Header Component */}
          <HeaderComponent
            {...item}
            isActive={active === idx}
            toggle={() => handleOpen(idx)}
          />

          {/* Custom Body Component */}
          {active === idx && (
            <div className="mt-3">
              <BodyComponent {...item} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptimizedAccordion;
