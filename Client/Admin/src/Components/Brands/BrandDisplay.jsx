import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axios";
import {
  addBrand,
  deleteBrand,
  editBrand,
  getBrand,
} from "../../utils/constants";
import { setBrands } from "../../Redux/brandReducer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { showToastMessage, showToastMessageError } from "../../utils/toast";
import BrandHeader from "./BrandHeader";
import DataTables from "./DataTables";

function BrandDisplay() {
  const [brand, setBrand] = useState({ category: "" });
  const [brands, setbrandss] = useState();
  const [brandImage, setBrandImage] = useState();
  const [brandDialog, setBrandDialog] = useState(false);
  const [file, setFile] = useState();
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const imageRef = useRef();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Category.Category);
  const token = localStorage.getItem("AdminToken");
  const brandInfo = useSelector((state) => state.Brand.Brand);

  useEffect(() => {
    axios.get(`${getBrand}?token=${token}`).then((res) => {
      if (res.data.brands) {
        dispatch(setBrands(res.data.brands));
        setbrandss(brandInfo);
      }
    });
  }, [brands]);

  const openNav = () => {
    setBrand();
    setBrandDialog(true);
    setBrandImage();
  };
  const handleChange = (e) => {
    if (e.target.name === "category") {
      setBrand({ ...brand, category: e.target.value });
    } else {
      setBrand({ ...brand, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setBrandImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = () => {
    if (brand.name && brand.category) {
      const formData = new FormData();
      console.log(brand)
      formData.append("name", brand.name);
      formData.append("des", brand.description);
      formData.append("image", file);
      if (edit === false) {
        formData.append("cat", brand.category);
        axios
          .post(addBrand, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data.newBrand) {
              setBrandDialog(false);
              showToastMessage(res.data.message);
              setBrandImage();
              setBrand();
            } else {
              showToastMessageError(res.data.message);
            }
          });
      } else {
        formData.append("cat", brand.category);
        formData.append("id", brand._id);
        axios
          .post(editBrand, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(res);
            if (res.data.newBrand) {
              setBrandDialog(false);
              showToastMessage(res.data.message);
              setEdit(false);
            } else {
              showToastMessageError(res.data.message);
            }
          });
      }
    }
  };
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            openNav(true);
            setBrand(rowData);
            setEdit(true);
            setBrandImage(rowData.image);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            setBrand(rowData);
            setDeleteModal(true);
          }}
        />
      </React.Fragment>
    );
  };

  const deleteBrands = () => {
    axios
      .post(deleteBrand, JSON.stringify(brand), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.updatedBrand) {
          setDeleteModal(false);
          showToastMessage(res.data.message);
        } else {
          showToastMessageError(res.data.message);
        }
      });
  };
  const deleteBrandDialogFooter = (
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
        onClick={deleteBrands}
      />
    </React.Fragment>
  );

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
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      />
    </React.Fragment>
  );
  return (
    <div className="card mt-5 me-5 ms-5">
      <BrandHeader openNav={openNav} />
      <ToastContainer />
      {/* datatable */}
      <DataTables
        imageBodyTemplate={imageBodyTemplate}
        actionBodyTemplate={actionBodyTemplate}
        brands={brands}
      />
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
        {brandImage ? (
          <div>
            <img
              src={brandImage}
              alt="brand name"
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
            value={brand ? brand.name : ""}
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
            value={brand ? brand.description : ""}
            onChange={handleChange}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold p-3">
            Category
          </label>
          <select name="category" id="category" onChange={handleChange}>
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </Dialog>
      <Dialog
        visible={deleteModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteBrandDialogFooter}
        onHide={() => setDeleteModal(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3 "
            style={{ fontSize: "2rem", color: "red" }}
          />
          {brand && (
            <span className="">Are you sure you want to delete the brand</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default BrandDisplay;
