import React, { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import "react-awesome-slider/dist/styles.css";
import axios from "../../../../Utils/axios";
import { getproducts } from "../../../../Utils/constants";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../Redux/HomePageReducer";

function Carousel() {
  const [products, setProducts] = useState([]);

  const dispatch=useDispatch()
  useEffect(() => {
    axios.get(getproducts).then((res) => {
      if (res.data.products) {
        dispatch(addProducts(res.data.products))
        setProducts(res.data.products);
      }
    });
  }, []);
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <div className="w-[700px] h-full">
      <AutoplaySlider 
      play={true}
      cancelOnInteraction={false}
      interval={2000}
      bullets={false}
      organicArrows={false}
      >
        {products.map((product) => (
          <div key={product._id}>
            <img
              key={product._id}
              src={product.image[0]}
              alt={`Image`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

export default Carousel;
