import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

function DataTables({ imageBodyTemplate, actionBodyTemplate, brands }) {
  return (
    <div>
      <DataTable
        value={brands}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        // globalFilter={globalFilter}
      >
        <Column
          field="name"
          header="Name"
          sortable
          style={{ minWidth: "16rem" }}
        ></Column>
        <Column
          header="Image"
          body={imageBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="category.name"
          header="Category"
          sortable
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="description"
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
    </div>
  );
}

export default DataTables;
