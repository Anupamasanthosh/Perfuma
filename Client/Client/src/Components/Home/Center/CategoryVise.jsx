import React from "react";
import { useSelector } from "react-redux";
import Category1 from "./Category1";

function CategoryVise() {
  const category = useSelector((state) => state.Home.Category);
  const products = useSelector((state) => state.Home.Products);
  const filteredProducts = {};
  category.forEach((category) => {
    filteredProducts[category._id] = [];
  });
  products.forEach((product) => {
    if (filteredProducts[product.category]) {
      filteredProducts[product.category].push(product);
    }
  });
  return (
    <div className="py-16">
      <div className="container mx-auto">
        {category.map((category) => (
          <div>
            <div
              className="flex justify-between items-center text-[30px] leading-[1.1] font-light pb-6"
              key={category._id}
            >
              <span>Explore the latest Trends in {category.name}</span>
              <a href={`/category/${category._id}`} className="text-black hover:text-lg text-sm">
                View More
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px]">
              {filteredProducts[category._id].slice(0, 4).map((product) => (
                <Category1 products={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryVise;
