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
    <div className="p-8 bg-white rounded-lg ">
      <p className="text-3xl font-bold text-center text-black">Shop By Brand</p>
      <p className="mb-12 text-xl font-normal text-center text-gray-500 dark:text-gray-300">
        Meat the best team in wolrd
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <div className="p-4" key={brand._id}>
            <div className="flex-col  flex justify-center items-center">
              <div className="flex-shrink-0">
                <a href="#" className="relative block">
                  <img
                    alt="profil"
                    src={brand.image}
                    className="mx-auto  rounded-full h-20 w-30 object-fill "
                    onClick={() => handleBrand(brand._id)}
                  />
                </a>
              </div>
              <div className="mt-2 text-center flex flex-col">
                <a
                  className="text-xs text-gray-400 cursor-pointer"
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
