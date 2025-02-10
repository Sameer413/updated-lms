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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSignOutQuery } from "@/redux/features/auth/authApi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = ({}) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const imageUrl = null;
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout, setLogout] = useState(false);
  const {} = useSignOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(<LoginModal openModal={openModal} closeModal={closeModal} />);
  };

  const handleSignOut = () => {
    setLogout(true);
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
    <div className="w-full h-16 lg:h-20 z-50 border-b relative dark:border-[rgba(255,255,255,0.11)] shadow-xl transition duration-500">
      <div
        className={`border-b h-16 lg:h-20 w-full ${
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
            <div className="hidden lg:block">
              <NavLinks
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>

            <div className="flex lg:gap-3">
              <ThemeSwitcher />
              {!user ? (
                <div className="" onClick={handleOpenModal}>
                  <Image
                    className="rounded-full w-8 lg:w-10"
                    src={imageUrl ? imageUrl : defaultAvatar}
                    alt=""
                    width={40}
                    objectFit="cover"
                  />
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      className="rounded-full w-8 lg:w-10 "
                      src={imageUrl ? imageUrl : defaultAvatar}
                      alt=""
                      width={40}
                      objectFit="cover"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href={"/admin"}>Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <button
                onClick={() => setShow(!show)}
                className="lg:hidden md:hidden ml-3"
              >
                <HiOutlineMenuAlt3 className="text-3xl" />
              </button>

              {show && (
                <NavLinks
                  isMobile
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Header;
