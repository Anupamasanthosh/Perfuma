import React, { useState } from "react";
import Nav from "../Components/Home/Nav/Nav";
import SideNav from "../Components/Home/Nav/SideNav";
import BrandBanner from "../Components/Brand/BrandBanner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BrandDisplay from "../Components/Brand/BrandDisplay";

function Brand() {
  const [open, setOpen] = useState(false);
  const toggleSideNav = () => {
    setOpen(!open);
  };
  const { id } = useParams();
  const products = useSelector((state) => state.Home.Products);
  const filteredProducts = products.filter((product) => product.brand === id);
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Nav toggleSideNav={toggleSideNav} />
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          <BrandBanner id={id} />
        </div>
        <div className="container mx-auto p-4">
          <p class="text-3xl font-bold text-center text-gray-800 dark:text-black">
            Professional team
          </p>
          <p class="mb-12 text-xl font-normal text-center text-gray-500 dark:text-black">
            Meat the best team in wolrd
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px]">
            {filteredProducts.map((product) => (
              <BrandDisplay product={product} />
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-300 py-4 text-center">
        &copy; 2023 Perfuma
      </footer>
      {open && <SideNav open={open} toggleSideNav={toggleSideNav} />}
    </div>
  );
}

export default Brand;
