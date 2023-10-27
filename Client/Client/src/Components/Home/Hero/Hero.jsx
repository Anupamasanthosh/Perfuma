import React, { useEffect } from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-pink-200 h-[600px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>new trends
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            Autumn Sale
            <br />
            <span className="font-semibold">Womens</span>
          </h1>
          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 boder-primary"
          >
            Discover More
          </Link>
        </div>
        <div className="hidden lg:block">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Hero;
