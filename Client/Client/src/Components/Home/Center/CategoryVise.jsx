import React from 'react'
import { useSelector } from 'react-redux';

function CategoryVise() {
    const category = useSelector((state) => state.Home.Category);
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <div className='flex justify-center items-center text-[60px] leading-[1.1] font-light pb-6'>
            Pick One
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center">
          {category ? (
            category.map((cat) => (
                <div key={cat.id} className="flex items-center justify-center">
                <img
                  src={cat.image}
                  alt=""
                  className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-50 w-full sm:h-[400px] xl:w-1/3 lg:w-1/3 md:w-[50%] h-auto"
                />
              </div>
            ))
          ) : (
            <div>hello</div>
          )}
          <div>
            <img
              src="https://i.pinimg.com/564x/85/4f/38/854f38fc3a97c371f4d2614e97adae2c.jpg"
              alt=""
              className="hover:scale-150 hover:z-10 transform ease-in-out transition duration-50 mx-auto w-full sm:h-[400px] xl:w-1/3 lg:w-1/3 md:w-[50%] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryVise
