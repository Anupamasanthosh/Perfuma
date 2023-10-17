import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { getUsers } from "../../utils/constants";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../Redux/userReducer";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";

function UserDisplay() {
  const [usersInfo, setUsersInfo] = useState();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [user, setuser] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const users = useSelector((state) => state.User.Users);

  const paginatorLeft = <Button label="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button label="button" icon="pi pi-download" text />;

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${getUsers}?token=${token}`).then((res) => {
      dispatch(setUsers(res.data.users));
      setUsersInfo(users);
    });
  }, []);

  const onInputChange=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
    console.log(user,'from hehe')
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
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
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-secondary"
          onClick={() => setViewDialog(true)}
        />
        <Button label="Delete" icon="pi pi-trash" severity="danger" />
      </div>
    );
  };
  const userDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={() => setViewDialog(false)}
      />
      <Button label="Save" icon="pi pi-check" />
    </React.Fragment>
  );
  return (
    <div className="card mt-5 me-5">
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        value={usersInfo}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        globalFilter={globalFilter}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column field="name" header="Name" style={{ width: "25%" }}></Column>
        <Column field="email" header="Email" style={{ width: "25%" }}></Column>
        <Column
          field="blocked"
          header="Status"
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>
      {/* add user */}
      <Dialog
        visible={viewDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="User Details"
        modal
        className="p-fluid"
        onHide={() => setViewDialog(false)}
        footer={userDialogFooter}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText
            id="name"
            name="name"
            onChange={(e) => onInputChange(e)}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !user.name })}
            style={{ padding: "10px", margin: "5px" }}
          />
          {submitted && !user.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Email
          </label>
          <InputText
            id="email"
            name="email"
            onChange={(e) => onInputChange(e)}
            required
            autoFocus
            style={{ padding: "10px", margin: "5px" }}
            className={classNames({ "p-invalid": submitted && !user.email })}
          />
          {submitted && !user.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default UserDisplay;
