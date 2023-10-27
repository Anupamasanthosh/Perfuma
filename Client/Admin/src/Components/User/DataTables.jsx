import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function DataTables({ usersInfo, globalFilter, actionBodyTemplate }) {
  return (
    <DataTable
      value={usersInfo}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "50rem" }}
      globalFilter={globalFilter}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
    >
      <Column field="name" header="Name" style={{ width: "25%" }}></Column>
      <Column field="email" header="Email" style={{ width: "25%" }}></Column>
      <Column
        field="blocked"
        header="Blocked"
        style={{ width: "25%" }}
      ></Column>
      <Column
        header="Action"
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "12rem" }}
      ></Column>
    </DataTable>
  );
}

export default DataTables;
