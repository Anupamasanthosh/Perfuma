import React from "react";
import { MenuItems } from "../utils/MenuItems";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Home/Nav";
import SideNav from "../Components/Home/SideNav";
import { clearAdmin } from "../Redux/adminReducer";
import UserDisplay from "../Components/User/UserDisplay";

function User() {
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
        <div className="w-full xl:w-3/4">
          <UserDisplay />
        </div>
      </div>
    </div>
  );
}

export default User;
