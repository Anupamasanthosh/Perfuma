import React from "react";
import Nav from "../Components/Home/Nav";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../Components/Home/SideNav";
import { clearAdmin } from "../Redux/adminReducer";
import { MenuItems } from "../utils/MenuItems";

function DashBoard() {
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
  );
}

export default DashBoard;
