import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { blockUser, getUsers, deleteUser } from "../../utils/constants";
import { editUsers, setUsers } from "../../Redux/userReducer";
// import primeReact themes
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function UserDisplay() {
  const [usersInfo, setUsersInfo] = useState();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [user, setuser] = useState();
  const [dialog, setDialog] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const users = useSelector((state) => state.User.Users);

  const dispatch = useDispatch();
  // setting users on loading
  useEffect(() => {
    axios.get(`${getUsers}?token=${token}`).then((res) => {
      dispatch(setUsers(res.data.users));
      setUsersInfo(users);
    });
  }, [users]);
  // editing users
  const editUser = (user) => {
    axios
      .post(blockUser, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(editUsers(res.data.updatedUser));
      });
  };
  // deleting users
  const deleteUsers = () => {
    axios
      .post(deleteUser, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.updatedUser) {
          setDialog(false);
        }
      });
  };
  // delete dialog
  const confirmDeleteUser = (user) => {
    setuser(user);
    setDialog(true);
  };
  //block ,ubblock icons
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={rowData.blocked ? "pi pi-lock" : "pi pi-lock-open"}
          rounded
          outlined
          className="mr-2"
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </React.Fragment>
    );
  };

  //search filter
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

  //delete user footer
  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        style={{ color: "black", margin: "3px" }}
        onClick={() => setDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        style={{ color: "red", margin: "3px" }}
        onClick={deleteUsers}
      />
    </React.Fragment>
  );

  return (
    <div className="card mt-5 ms-5 me-5">
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
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
      {/* delete user */}
      <Dialog
        visible={dialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUserDialogFooter}
        onHide={() => setDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3 "
            style={{ fontSize: "2rem", color: "red" }}
          />
          {user && (
            <span className="">Are you sure you want to delete the user</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default UserDisplay;
