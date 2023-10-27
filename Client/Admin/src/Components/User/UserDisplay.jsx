import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { blockUser, getUsers, deleteUser } from "../../utils/constants";
import { showToastMessage, showToastMessageError } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUsers, setUsers } from "../../Redux/userReducer";
import UserHeader from "./UserHeader";
import DataTables from "./DataTables";

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
        if (res.data.updatedUser) {
          showToastMessage(res.data.message);
          dispatch(editUsers(res.data.updatedUser));
        } else {
          showToastMessage(res.data.message);
        }
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
          showToastMessage(res.data.message);
          setDialog(false);
        } else {
          showToastMessageError(res.data.message);
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
      <UserHeader setGlobalFilter={setGlobalFilter} />
      <ToastContainer />
      <DataTables
        usersInfo={usersInfo}
        globalFilter={globalFilter}
        actionBodyTemplate={actionBodyTemplate}
      />
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
