"use client";

import { FC, ReactNode, useRef, useState } from "react";
import { MenuToOpenIcon } from "@/ui/icons/Menu";
import { CancelIcon } from "@/ui/icons/CancelIcon";
import NavbarMenu from "./NavbarMenu";

interface IMobileNavbarProps {
  children: ReactNode;
}

const MobileNavbar: FC<IMobileNavbarProps> = ({ children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    if (menuRef.current) {
      if (isNavOpen) {
        menuRef?.current.classList.remove("slide-in");
        menuRef?.current.classList.add("slide-out");
      }

      if (!isNavOpen) {
        menuRef?.current.classList.remove("slide-out");
        menuRef?.current.classList.add("slide-in");
      }
    }

    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <section className="md:hidden">
      <span
        onClick={() => toggleMenu()}
        className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
      >
        {isNavOpen ? (
          <CancelIcon className="w-6 h-6 text-slate-900 dark:text-slate-300" />
        ) : (
          <MenuToOpenIcon className="w-6 h-6 text-slate-900 dark:text-slate-300" />
        )}
      </span>

      <div
        ref={menuRef}
        className="mobile--menu backdrop-blur-sm bg-white dark:bg-slate-900 border-t border-l border-slate-300 dark:border-slate-700 shadow-sm absolute right-0 top-full w-60 translate-x-full z-10"
      >
        {children}
      </div>

      {isNavOpen && (
        <div
          onClick={() => toggleMenu()}
          className="backdrop w-screen  fixed top-full left-0 -z-10"
        />
      )}
    </section>
  );
};

export default MobileNavbar;
