import { footerData } from "@/mappedData";
import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Button } from "../ui/Button";

const Footer = () => {
  return (
    <div className="border-t dark:border-[rgba(255,255,255,0.11)] shadow py-5">
      <MaxWidthWrapper>
        <div className="grid grid-cols-4">
          {footerData.map(({ title, links }) => {
            return (
              <div key={title} className="">
                <div className="mb-2 font-medium font-Poppins select-none">
                  {title}
                </div>
                {links.map((link) => (
                  <div
                    key={link}
                    className="text-secondary mb-1 font-Poppins hover:underline cursor-pointer"
                  >
                    {link}
                  </div>
                ))}
              </div>
            );
          })}
          <div className="">
            <div className="mb-2 font-medium font-Poppins select-none">
              Newsletter
            </div>
            <div className="text-secondary mb-1 font-Poppins">
              Stay up-to-date with everything related to our brand and gain
              invaluable insights for your programming journey by subscribing to
              our newsletter.
            </div>
            <div className="my-4">
              <input
                type="text"
                className="w-full dark:border-[rgba(255,255,255,0.11)] border-[#00000041] border rounded-md px-3 py-1 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <Button size={"lg"} className="rounded-full text-white">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="text-center mt-5">
          Copyright © 2023 - 2024 ELearning Private Ltd | All Rights Reserved
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
