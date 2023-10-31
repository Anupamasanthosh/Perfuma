import React, { useState } from "react";
import { useParams } from "react-router-dom";


import { useSelector } from "react-redux";
import Nav from "../Components/Home/Nav/Nav";
import CatBanner from "../Components/Category/CatBanner";
import Category1 from "../Components/Home/Center/Category1";
import SideNav from "../Components/Home/Nav/SideNav";


function Category() {
    const [open, setOpen] = useState(false);
  const { id } = useParams();
  const toggleSideNav = () => {
    setOpen(!open);
  };
  const products = useSelector((state) => state.Home.Products);
  const category = useSelector((state) => state.Home.Category);
  const cat = category.map((cat) => {
    if (cat._id === id) {
      return cat;
    }
  });

  const filteredProducts = products.filter(
    (product) => product.category === id
  );
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Nav toggleSideNav={toggleSideNav} />
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          <CatBanner cat={cat} />
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
              <Category1 products={product} key={product._id} />
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

export default Category

