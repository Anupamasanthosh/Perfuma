import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCategory,
  deleteCat,
  editCategory,
  getCategory,
} from "../../utils/constants";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategorys,
  editCategorys,
  setCategorys,
} from "../../Redux/categoryReducer";
import { showToastMessage, showToastMessageError } from "../../utils/toast";
import CategoryHeader from "./CategoryHeader";
import DataTables from "./DataTables";

function CategoryView() {
  const [category, setCategory] = useState();
  const [categorys, setCategoryss] = useState();
  const [catImage, setCatImage] = useState();
  const [file, setFile] = useState();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const cat = useSelector((state) => state.Category.Category);
  const token = localStorage.getItem("AdminToken");

  useEffect(() => {
    axios.get(`${getCategory}?token=${token}`).then((res) => {
      if (res.data.categories) {
        dispatch(setCategorys(res.data.categories));
        setCategoryss(cat);
      }
    });
  }, [categorys]);

  const openNav = () => {
    setCategory();
    setCategoryDialog(true);
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setCatImage(URL.createObjectURL(file));
    }
  };
  const imageRef = useRef();
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            console.log(rowData);
            openNav(true);
            setCategory(rowData);
            setEdit(true);
            setCatImage(rowData.image);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            setCategory(rowData);
            setDeleteModal(true);
          }}
        />
      </React.Fragment>
    );
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("des", category.description);
    formData.append("image", file);
    formData.append("id", category._id);
    if (edit === false) {
      axios
        .post(addCategory, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.cat) {
            setCategoryDialog(false);
            showToastMessage(res.data.message);
            setCatImage();
            dispatch(addCategorys(res.data.res));
            setCategory();
          } else {
            showToastMessageError(res.data.message);
          }
        });
    } else {
      axios
        .post(editCategory, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.newCat) {
            setCategoryDialog(false);
            showToastMessage(res.data.message);
            dispatch(editCategorys(res.data.newCat));
            setEdit(false);
          } else {
            showToastMessageError(res.data.message);
          }
        });
    }
  };

  const deleteCategory = () => {
    axios
      .post(deleteCat, JSON.stringify(category), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.updatedCat) {
          setDeleteModal(false);
          showToastMessage(res.data.message);
        } else {
          showToastMessageError(res.data.message);
        }
      });
  };

  const deleteCatDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        style={{ color: "black", margin: "3px" }}
        onClick={() => setDeleteModal(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        style={{ color: "red", margin: "3px" }}
        onClick={deleteCategory}
      />
    </React.Fragment>
  );

  const categoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        style={{ margin: "5px" }}
        outlined
        onClick={() => {
          setCategoryDialog(false);
          setCatImage();
        }}
      />
      <Button
        label="Save"
        style={{ margin: "5px" }}
        outlined
        icon="pi pi-check"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      />
    </React.Fragment>
  );

  const imageBodyTemplate = (rowData) => {
    const imageUrl = rowData.image;

    return (
      <LazyLoadImage
        src={imageUrl}
        style={{ width: "100px", height: "auto" }}
        placeholderSrc={imageUrl}
        effect="blur"
        threshold={100}
      />
    );
  };
  return (
    <div className="card mt-5 me-5 ms-5">
      <CategoryHeader
        openNav={openNav}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <ToastContainer />
      {/* datatable */}
      <DataTables
        categorys={categorys}
        imageBodyTemplate={imageBodyTemplate}
        actionBodyTemplate={actionBodyTemplate}
      />
      {/* add Category */}
      <Dialog
        visible={categoryDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Category Details"
        modal
        className="p-fluid"
        footer={categoryDialogFooter}
        onHide={() => {
          setCategoryDialog(false);
          setCatImage();
        }}
      >
        {catImage ? (
          <div>
            <img
              src={catImage}
              alt="category name"
              onClick={() => {
                imageRef.current.click();
              }}
              className="product-image block m-auto pb-3"
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              ref={imageRef}
            />
          </div>
        ) : (
          <div className="card flex flex-col mx-auto w-1/3">
            <div>
              <img
                src="https://imgs.search.brave.com/D6uLs2bMq2JG4aN-CnAUnrkCdOtHlp0GNyyTTPSJx28/rs:fit:860:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc.svg"
                className="w-full"
                alt=""
                onClick={() => {
                  imageRef.current.click();
                }}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
                ref={imageRef}
              />
            </div>
          </div>
        )}
        <div className="field">
          <label htmlFor="name" className="font-bold p-3">
            Name
          </label>
          <InputText
            id="name"
            name="name"
            value={category ? category.name : ""}
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
            value={category ? category.description : ""}
            name="description"
            className="p-3"
            onChange={handleChange}
            required
            rows={3}
            cols={20}
          />
        </div>
      </Dialog>
      {/* delete cat */}

      <Dialog
        visible={deleteModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteCatDialogFooter}
        onHide={() => setDeleteModal(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3 "
            style={{ fontSize: "2rem", color: "red" }}
          />
          {category && (
            <span className="">
              Are you sure you want to delete the category
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default CategoryView;
