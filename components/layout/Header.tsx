"use client";
import React, { useState } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import Image from "next/image";
import defaultAvatar from "../../public/assests/avatar.png";
import { useModal } from "../ui/ModalProvider";
import LoginModal from "../Modals/LoginModal";

const Header = ({}) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const imageUrl = null;

  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(<LoginModal openModal={openModal} closeModal={closeModal} />);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  return (
    <div className="w-full h-20 z-50 border-b relative dark:border-[rgba(255,255,255,0.11)] shadow-xl transition duration-500">
      <div
        className={`border-b h-[80px] w-full ${
          active
            ? "bg-white dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 dark:border-[rgba(255,255,255,0.11)] shadow-xl transition duration-150"
            : "dark:border-[#ffffff1c] dark:shadow"
        }`}
      >
        <MaxWidthWrapper className="flex items-center justify-between">
          <Link href={"/"} className="font-Poppins text-2xl font-semibold">
            ELearning
          </Link>

          <div className="flex items-center gap-6">
            <div className="">
              <NavLinks
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>

            <div className="flex gap-3">
              <ThemeSwitcher />

              {/* <Link href={"/profile"}>
                <Image
                  className="rounded-full "
                  src={imageUrl ? imageUrl : defaultAvatar}
                  alt=""
                  width={40}
                  objectFit="cover"
                />
              </Link> */}
              <div className="" onClick={handleOpenModal}>
                <Image
                  className="rounded-full "
                  src={imageUrl ? imageUrl : defaultAvatar}
                  alt=""
                  width={40}
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Header;
