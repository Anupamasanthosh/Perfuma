import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar'
import React from 'react'

function ProductHeader({openNav}) {
    const leftToolbarTemplate = () => {
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              label="New"
              icon="pi pi-plus"
              severity="success"
              style={{ color: "black", margin: "3px" }}
              onClick={openNav}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              style={{ color: "black", margin: "3px" }}
              severity="danger"
            />
          </div>
        );
      };
    
      const rightToolbarTemplate = () => {
        return (
          <span className="p-input-icon-left">
            <InputText
              className="p-3"
              type="search"
            //   onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </span>
        );
      };
  return (
    <div>
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
    </div>
  )
}

export default ProductHeader
