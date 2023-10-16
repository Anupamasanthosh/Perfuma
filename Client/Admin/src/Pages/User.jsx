import React from 'react'
import { MenuItems } from '../utils/MenuItems'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Home/Nav';
import SideNav from '../Components/Home/SideNav';

function User() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.clear("AdminToken");
    dispatch(clearAdmin());
    navigate("/");
  };
  return (
    <div>
      <Nav menu={MenuItems} handleLogout={handleLogout} />
      <SideNav menu={MenuItems} />
    </div>
  )
}

export default User
