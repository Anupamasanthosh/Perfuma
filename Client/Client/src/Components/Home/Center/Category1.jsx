import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Category1({ products }) {
  return (
    <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[200px] mx-auto flex justify-center items-center">
          <img
            src={products.image[0]}
            alt=""
            className="max-h-[160px] group-hover:scale-110 transition duration-300"
          />
        </div>
      </div>
      <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button>
          <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
            <FaPlus className="text-xl" />
          </div>
        </button>
        <Link
          to={"/"}
          className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
        >
          <FaEye className="text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default Category1;
