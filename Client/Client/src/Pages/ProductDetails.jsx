import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../Components/Home/Nav/Nav'
import { useSelector } from 'react-redux';
import ProductDetail from '../Components/Product/ProductDetail';
import Category1 from '../Components/Home/Center/Category1';

function ProductDetails() {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const toggleSideNav = () => {
      setOpen(!open);
    };
    const products=useSelector((state)=>state.Home.Products)
    const product=products.find((item)=>
    {
        return item._id===id
    })
    const sameBrand=products.filter(item=>item.brand===product.brand)
  return (
    <div className="bg-white min-h-screen flex flex-col">
    <header>
      <Nav toggleSideNav={toggleSideNav} />
    </header>
    <main className="flex-1 overflow-y-auto">
      <div className="container mx-auto p-4">
        <ProductDetail product={product}/>
      </div>
      {sameBrand.length >1?
      (
        <div className="container mx-auto p-4">
        <p class="text-3xl font-bold text-center text-gray-800 dark:text-black">
          More From same Brand
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-[30px]">
          {sameBrand.map((product) => (
            <Category1 products={product}/>
          ))}
        </div>
      </div>
      ):(
        <div>

        </div>
      )}
      
    </main>
    <footer className="bg-gray-300 py-4 text-center">
      &copy; 2023 Perfuma
    </footer>
    {open && <SideNav open={open} toggleSideNav={toggleSideNav} />}
  </div>
  )
}

export default ProductDetails
