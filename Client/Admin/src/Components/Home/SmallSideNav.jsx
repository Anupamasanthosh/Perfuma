import React from "react";

function SmallSideNav({ list, handleLogout }) {
  return (
    <div>
      <div className=" italic absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-1 "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="xl:hidden">
            {list.map((list) => (
              <a
                className="text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white block px-4 py-2 rounded-md text-base "
                href={list.link}
              >
                {list.name}
              </a>
            ))}
          </div>
          <a
            className="block  px-4 py-2 text-md hover:bg-black hover:text-gray-900 dark:text-gray-500 dark:hover:text-black dark:hover:bg-white"
            role="menuitem"
            onClick={handleLogout}
          >
            <span className="flex flex-col">
              <span>Logout</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SmallSideNav;
