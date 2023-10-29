import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

function ProductDetail({ product }) {
  const [images, setImages] = useState(product.image);
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className='flex flex-col lg:flex-row gap-16 lg:items-center'>
      <div className="flex flex-wrap gap-6 lg:w-2/4">
        <img
          src={activeImage}
          alt=""
          className='w-[560px] aspect-square object-cover rounded-xl'
        />
        <div className="flex flex-row justify-between">
          {images.map((image) => (
            <img src={image} alt="" className='w-24 h-24 p-4 rounded-md cursor-pointer' onClick={() => setActiveImage(image)} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className="text-gray-900 font-semibold">{product.name}</span>
          <h1 className="text-3xl font-bold">{product.price}</h1>
        </div>
        <p className="text-gray-700">{product.description}</p>
        <h6 className="text-2xl font-semibold"></h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button className="py-4 px-6 rounded-lg text-violet-400 text-3xl">
              -
            </button>
            <span className="py-4 px-6 rounded-lg">1</span>
            <button className="py-4 px-6 rounded-lg text-violet-400 text-3xl">
              +
            </button>
          </div>
          <button className="bg-violet-600 text-white font-semibold py-3 px-16 rounded-xl h-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
