import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Brandvise() {
  const brands = useSelector((state) => state.Home.Brand);

  const navigate=useNavigate()
  const handleBrand = (brandId) => {
    navigate(`/brand/${brandId}`)
  };
  return (
    <div class="p-8 bg-white rounded-lg ">
      <p class="text-3xl font-bold text-center text-black">Shop By Brand</p>
      <p class="mb-12 text-xl font-normal text-center text-gray-500 dark:text-gray-300">
        Meat the best team in wolrd
      </p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
              <div class="flex-shrink-0">
                <a href="#" class="relative block">
                  <img
                    alt="profil"
                    src={brand.image}
                    class="mx-auto  rounded-full h-20 w-30 object-fill "
                    onClick={() => handleBrand(brand._id)}
                  />
                </a>
              </div>
              <div class="mt-2 text-center flex flex-col">
                <a
                  class="text-xs text-gray-400 cursor-pointer"
                  onClick={() => handleBrand(brand._id)}
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brandvise;
