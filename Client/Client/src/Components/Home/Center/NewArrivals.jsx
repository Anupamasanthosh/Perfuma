import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

function NewArrivals() {
  const productinfo = useSelector((state) => state.Home.Products);
  const products = productinfo.slice(0, 4);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = isSmallScreen ? 1 : 3;

  const handleNext = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-16 container mx-auto">
      <header className="flex justify-center items-center text-[60px] leading-[1.1] font-light pb-6">
        New Arrivals
      </header>
      {isSmallScreen ? (
        <div className="container">
          <AwesomeSlider>
            {products.map((product) => (
              <div key={product._id} className="relative">
                <img
                  className="w-48 h-48 transform ease-in-out transition duration-150 hover:scale-110 hover:z-10"
                  src={product.image}
                  alt="Product"
                />
              </div>
            ))}
          </AwesomeSlider>
        </div>
      ) : (
        <div className="container">
          <div className="w-full flex justify-between">
            {currentIndex === 0 ? (
              <div></div>
            ) : (
              <button onClick={handlePrev}>&lt; Prev</button>
            )}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-60">
              {products
                .slice(currentIndex, currentIndex + productsPerPage)
                .map((product) => (
                  <div key={product._id}>
                    <img
                      className="w-48 h-48 mx-auto  rounded-full"
                      src={product.image[0]}
                      alt="Product"
                    />
                  </div>
                ))}
            </div>
            {currentIndex + productsPerPage >= products.length ? (
              <div></div>
            ) : (
              <button onClick={handleNext}>Next &gt;</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
