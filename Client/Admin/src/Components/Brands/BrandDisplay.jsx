import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";

function BrandDisplay() {
    const [brand, setBrand] = useState();
    const [brands, setbrands] = useState();
    const [globalFilter, setGlobalFilter] = useState();
    const [brandDialog, setBrandDialog] = useState(false);


    const openNav = () => {
        setBrand();
        setBrandDialog(true);
      };
      const handleChange = (e) => {
        setBrand({ ...brand, [e.target.name]: e.target.value });
      };
      const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-lock"
              rounded
              outlined
              className="mr-2"
              // onClick={() => editUser(rowData)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              // onClick={() => confirmDeleteUser(rowData)}
            />
          </React.Fragment>
        );
      };
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
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
            />
          </span>
        );
      };
      const brandDialogFooter = (
        <React.Fragment>
          <Button
            label="Cancel"
            icon="pi pi-times"
            style={{ margin: "5px" }}
            outlined
            onClick={() => setBrandDialog(false)}
          />
          <Button
            label="Save"
            style={{ margin: "5px" }}
            outlined
            icon="pi pi-check"
          />
        </React.Fragment>
      );
  return (
    <div className="card mt-5 me-5 ms-5">
    <Toolbar
      className="mb-4"
      left={leftToolbarTemplate}
      right={rightToolbarTemplate}
    ></Toolbar>
    {/* datatable */}
    <DataTable
      value={brand}
      dataKey="id"
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      globalFilter={globalFilter}
    >
      <Column
        field="name"
        header="Name"
        sortable
        style={{ minWidth: "16rem" }}
      ></Column>
      <Column
        field="image"
        header="Image"
        style={{ minWidth: "16rem" }}
      ></Column>

      <Column
        field="Description"
        header="Description"
        sortable
        style={{ minWidth: "10rem" }}
      ></Column>
      <Column
        header="Action"
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "12rem" }}
      ></Column>
    </DataTable>
    {/* add Category */}
    <Dialog
      visible={brandDialog}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Category Details"
      modal
      className="p-fluid"
      footer={brandDialogFooter}
      onHide={() => setBrandDialog(false)}
    >
      {brand && brand.image ? (
        <img
          src=""
          alt={brand.image}
          className="product-image block m-auto pb-3"
        />
      ) : (
        <div className="card flex flex-col justify-content-center">
          <div>image here</div>
          <div>uploader here</div>
        </div>
      )}
      <div className="field">
        <label htmlFor="name" className="font-bold p-3">
          Name
        </label>
        <InputText
          id="name"
          name="name"
          onChange={handleChange}
          required
          autoFocus
          className="p-3"
        />
      </div>
      <div className="field">
        <label htmlFor="description" className="font-bold p-3">
          Description
        </label>
        <InputTextarea
          id="description"
          name="description"
          className="p-3"
          onChange={handleChange}
          required
          rows={3}
          cols={20}
        />
      </div>
    </Dialog>
  </div>
  )
}

export default BrandDisplay
