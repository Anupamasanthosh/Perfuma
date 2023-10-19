import React from 'react'
import Nav from '../Components/Home/Nav'
import { MenuItems } from '../utils/MenuItems'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import SideNav from '../Components/Home/SideNav';
import CategoryView from '../Components/Category/CategoryView';

function Category() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.clear("AdminToken");
    dispatch(clearAdmin());
    navigate("/");
  };
  return (
    <div className="h-screen flex flex-col">
      <div>
        <Nav menu={MenuItems} handleLogout={handleLogout} />
      </div>
      <div className="flex flex-grow">
        <div className="xl:w-1/4">
          <SideNav menu={MenuItems} />
        </div>
        <div className="w-screen xl:w3/4">
          <CategoryView/>
        </div>
      </div>
    </div>
  )
}

export default Category
