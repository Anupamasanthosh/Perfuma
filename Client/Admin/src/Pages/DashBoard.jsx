import React from "react";
import Nav from "../Components/Home/Nav";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNav from "../Components/Home/SideNav";
import { clearAdmin } from "../Redux/adminReducer";
import { MenuItems } from "../utils/MenuItems";
import Dash from "../Components/Dashboard/Dash";

function DashBoard() {
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
        <div className="w-1/4">
          <SideNav menu={MenuItems} />
        </div>
        <div className="w-3/4">
          <Dash />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
