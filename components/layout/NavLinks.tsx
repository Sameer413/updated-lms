import Link from "next/link";
import React, { useMemo } from "react";

type NavLinkType = {
  title: string;
  href: string;
};

const navLinks: NavLinkType[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Courses", href: "/courses" },
  { title: "Resources", href: "/resources" },
  { title: "Support System", href: "/support" },
];

const NavLinks = ({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}) => {
  const memoizedLinks = useMemo(() => {
    return navLinks.map(({ href, title }: NavLinkType, idx: number) => (
      <Link
        key={idx}
        href={href}
        onClick={() => setActiveIndex(idx)}
        className={`text-lg font-medium hover:text-green-500 transition-colors ease-linear duration-150 ${
          activeIndex === idx && "text-green-500"
        }`}
      >
        {title}
      </Link>
    ));
  }, [activeIndex, setActiveIndex]);

  return <div className="flex lg:gap-6">{memoizedLinks}</div>;
};

export default NavLinks;
