import React from "react";
import { useSelector } from "react-redux";

function BrandBanner({ id }) {
  const brands = useSelector((state) => state.Home.Brand);

  const filteredBrands = brands.filter((brand) => brand._id === id);

  return (
    <div className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6 text-black">
            <span className="text-black">{filteredBrands[0].name}</span>{" "}
            Collections
          </h1>
          <p className="max-w-[480px] mb-8 text-black">
            {filteredBrands[0].description}
          </p>
        </div>
        <div className="hidden flex-1 lg:flex justify-end items-end">
          <img src={filteredBrands[0].image} alt="" className="object-fill" />
        </div>
      </div>
    </div>
  );
}

export default BrandBanner;
