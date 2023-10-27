import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";

function UserHeader({ setGlobalFilter }) {
  const rightToolbarTemplate = () => {
    return (
      <span className="p-input-icon-left">
        <InputText
          className="p-3"
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    );
  };
  return (
    <div>
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
    </div>
  );
}

export default UserHeader;
