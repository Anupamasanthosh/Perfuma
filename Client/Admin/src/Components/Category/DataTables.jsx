import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";

function DataTables({ categorys, imageBodyTemplate, actionBodyTemplate }) {
  return (
    <div>
      <DataTable
        value={categorys}
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
          header="Action"
          body={imageBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
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
