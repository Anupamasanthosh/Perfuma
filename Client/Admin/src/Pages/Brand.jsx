import React from 'react'
import Nav from '../Components/Home/Nav'
import { MenuItems } from '../utils/MenuItems'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAdmin } from '../Redux/adminReducer';
import SideNav from '../Components/Home/SideNav';
import BrandDisplay from '../Components/Brands/BrandDisplay';

function Brand() {
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
          <BrandDisplay/>
        </div>
      </div>
    </div>
  )
}

export default Brand
