import React, { useState } from "react";
import SmallSideNav from "./SmallSideNav";


function Nav({ menu ,handleLogout}) {
  const [visible, setVisible] = useState(false);

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
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div className="flex items-center">
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
                    </div>
                    {visible && <SmallSideNav list={menu} handleLogout={handleLogout} />}
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
