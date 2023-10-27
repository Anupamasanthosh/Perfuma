import React from "react";
import CategoryVise from "./CategoryVise";
import Brandvise from "./Brandvise";
import NewArrivals from "./NewArrivals";

function Center() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow ">
        <NewArrivals />
      </div>
      <div className="flex-grow">
        <CategoryVise />
      </div>
      <div className="flex-grow bg-blue-400">
        <Brandvise />
      </div>
    </div>
  );
}

export default Center;
