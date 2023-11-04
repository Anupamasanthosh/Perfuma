import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../Utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { getCategory } from "../../../../Utils/constants";
import { setBrand, setCategory } from "../../../Redux/HomePageReducer";
import { clearUser } from "../../../Redux/AuthReducer";

function Nav({ toggleSideNav }) {
  const [token, setToken] = useState();
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const user = useSelector((state) => state.Auth.User); 
  const category = useSelector((state) => state.Home.Category);

  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    const tk = localStorage.getItem("token");
    if (tk !== null) {
      setToken(tk);
      setUserInfo(user);
    }
  }, [token]);
  const handleLogOut = () => {
    localStorage.clear("token");
    dispatch(clearUser())
    setToken(false);
    setVisible(!visible);
  };
  const handleNav=(catId)=>
  {
    navigate(`/category/${catId}`)
  }

  useEffect(() => {
    axios.get(getCategory).then((res) => {
      if (res.data.categories) {
        dispatch(setCategory(res.data.categories));
      }
      if (res.data.brands) {
        dispatch(setBrand(res.data.brands));
      }
    });
  }, []);

  return (
    <div>
      <nav className="bg-white shadow py-4 ">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <a className="flex-shrink" href="/">
                <img
                  className="w-12 h-12"
                  src="https://i.pinimg.com/564x/bc/ac/22/bcac22e4a00f1efd1b0cd5adebd65a3c.jpg"
                  alt="Workflow"
                />
              </a>
              <span className="italic text-gray-500  hover:text-black dark:hover:text-black">
                Perfuma
              </span>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <a
                    className="text-gray-500 italic hover:text-black dark:hover:text-black px-3 py-2 rounded-md text-md "
                    href="/new"
                  >
                    New
                  </a>
                  {category &&
                    category.map((cat) => (
                      <a
                      key={cat._id}
                        onClick={() => handleNav(cat._id)}
                        className="text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white block px-4 py-2 rounded-md text-base cursor-pointer"
                      >
                        {cat.name}
                      </a>
                    ))}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6"> 
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div className="flex items-center">
                      {user ? (
                        <button
                          type="button"
                          className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm  text-gray-500 dark:text-gray-50"
                          id="options-menu"
                          onClick={() => setVisible(!visible)}
                        >
                          <svg
                            width="40"
                            fill="currentColor"
                            height="40"
                            className="text-gray-500"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                        </button>
                      ) : (
                        <div>
                          <a href="/auth">Login</a>
                        </div>
                      )}
                      <img
                        width="40"
                        height="40"
                        className="right-0 mx-5"
                        src="https://img.icons8.com/ios/50/shopping-cart--v1.png"
                        alt="shopping-cart--v1"
                        onClick={toggleSideNav}
                      />
                    </div>
                    {visible && (
                      <div className="italic absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="md:hidden">
                            <a
                              className="text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white block px-4 py-2 rounded-md text-base "
                              href="/new"
                            >
                              New
                            </a>

                            {category &&
                              category.map((cat) => (
                                <a
                                  className="text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white block px-4 py-2 rounded-md text-base cursor-pointer "
                                  onClick={()=>handleNav(cat._id)}
                                >
                                  {cat.name}
                                </a>
                              ))}
                          </div>
                          <a
                            onClick={handleLogOut}
                            className="block  px-4 py-2 text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
