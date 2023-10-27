import React from "react";
import { IoMdArrowForward } from "react-icons/io";
function SideNav({ open,toggleSideNav }) {
  return (
    <div
      className={`${
        open ? "right-0" : "-right-full"
      } w-full bg-blue-300 fixed top-[96px] h-full shadow-2xl md:w-[35vw] transition-all duration-500 ease-in-out z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">shopping bag (0)</div>
        <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward className="text-2xl" onClick={toggleSideNav} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
