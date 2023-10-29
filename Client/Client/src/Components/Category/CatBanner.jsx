import React from "react";

function CatBanner({ cat }) {
  const category = cat.filter((item) => item !== undefined);
  return (
    <div className="h-full max-h-[640px] mb-8 xl:mb-24 bg-black">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6 text-white">
            <span className="text-white">{category[0].name}</span> Collections
          </h1>
          <p className="max-w-[480px] mb-8 text-white">
            {category[0].description}
          </p>
        </div>
        <div className="hidden flex-1 lg:flex justify-end items-end">
          {category[0].name === "Men" ? (
            <img
              src="https://i.pinimg.com/564x/eb/63/4f/eb634f35b0e4ed9ebcef7f6a269bd575.jpg"
              alt=""
              className="object-fill"
            />
          ) : (
            <img
              src="https://i.pinimg.com/564x/35/88/94/3588948422813d3424e45435b987b67e.jpg"
              alt=""
              className="object-fill"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CatBanner;
