import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axios";
import {
  addProduct,
  deleteProducts,
  editproduct,
  getproducts,
} from "../../utils/constants";
import { setProductss } from "../../Redux/productReducer";
import { showToastMessage, showToastMessageError } from "../../utils/toast";
import ProductHeader from "./ProductHeader";
import DataTables from "./DataTables";

function ProductDisplay() {
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ category: "", brand: "" });
  const [products, setProducts] = useState();
  const [productImage, setProductImage] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();
  const [productDialog, setProductDialog] = useState(false);
  const [file, setFile] = useState([]);
  const [edit, setEdit] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [editImage, setEditImage] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const categories = useSelector((state) => state.Category.Category);
  const state = useSelector((state) => console.log(state));
  const brands = useSelector((state) => state.Brand.Brand);
  const productinfo = useSelector((state) => state.Product.Products);
  const openNav = () => {
    setProduct();
    setProductDialog(true);
    setProductImage();
  };
  useEffect(() => {
    axios.get(`${getproducts}?token=${token}`).then((res) => {
      if (res.data.products) {
        dispatch(setProductss(res.data.products));
        setProducts(productinfo);
      }
    });
  }, [products]);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setProduct({ ...product, category: e.target.value });
    } else if (e.target.name === "brand") {
      setProduct({ ...product, brand: e.target.value });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  const updateImages = (index, img, newFile) => {
    const updatedImages = [...productImage];
    updatedImages[index] = img;
    setProductImage(updatedImages);
    const updatedFiles = [...file];
    updatedFiles[index] = newFile;
    setFile(updatedFiles);
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (imageEdit) {
        const newFile = e.target.files[0];
        const imageFile = URL.createObjectURL(newFile);
        updateImages(editImage, imageFile, newFile);
      } else {
        const imageFiles = Array.from(e.target.files);
        setFile(imageFiles);
        const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
        setProductImage(imageUrls);
      }
    }
  };

  const handleSubmit = () => {
    if (product.name && product.category && product.brand) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("des", product.description);
      formData.append("stock", product.stock);
      for (let i = 0; i < file.length; i++) {
        formData.append("image", file[i]);
      }
      formData.append("id", product._id);

      if (edit === false) {
        formData.append("cat", product.category);
        formData.append("brand", product.brand);
        axios
          .post(addProduct, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data.createProduct) {
              setProductDialog(false);
              showToastMessage(res.data.message);
              setProductImage();
              setProduct();
            } else {
              showToastMessageError(res.data.message);
            }
          });
      } else {
        if (product.category && product.category._id) {
          formData.append("cat", product.category._id);
        } else {
          formData.append("cat", product.category);
        }
        if (product.brand && product.brand._id) {
          formData.append("brand", product.brand._id);
        } else {
          formData.append("brand", product.brand);
        }
        axios
          .post(editproduct, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.data.newProduct) {
              setProductDialog(false);
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
      <div className="flex space-x-4">
        {imageUrl.map((imageUrl, index) => (
          <LazyLoadImage
            key={index}
            src={imageUrl}
            style={{
              width: "100px",
              height: "auto",
            }}
            placeholderSrc={imageUrl}
            effect="blur"
            threshold={100}
          />
        ))}
      </div>
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
            setProduct(rowData);
            setEdit(true);
            setProductImage(rowData.image);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            setProduct(rowData);
            setDeleteModal(true);
          }}
        />
      </React.Fragment>
    );
  };

  const deleteProduct = () => {
    axios
      .post(deleteProducts, JSON.stringify(product), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.updatedProduct) {
          setDeleteModal(false);
          showToastMessage(res.data.message);
        } else {
          showToastMessageError(res.data.message);
        }
      });
  };
  const deleteProductDialogFooter = (
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
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        style={{ margin: "5px" }}
        outlined
        onClick={() => setProductDialog(false)}
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
    <div className="card mt-5 me-5">
      <ProductHeader openNav={openNav} />
      <ToastContainer />
      <DataTables
        products={products}
        globalFilter={globalFilter}
        imageBodyTemplate={imageBodyTemplate}
        actionBodyTemplate={actionBodyTemplate}
      />
      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Category Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={() => setProductDialog(false)}
      >
        {productImage && productImage.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 pb-4">
            {productImage.map((imageUrl, index) => (
              <div key={index} className="w-full h-64 relative">
                <div>
                  <img
                    src={imageUrl}
                    alt={`Product Image ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    ref={imageRef}
                  />
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => {
                      setEditImage(index);
                      setImageEdit(true);
                      imageRef.current.click();
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => {
                      const updatedImages = productImage.filter(
                        (_, i) => i !== index
                      );
                      setProductImage(updatedImages);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card flex flex-col mx-auto  w-1/3">
            <div className="text-center">
              <img
                src="https://imgs.search.brave.com/D6uLs2bMq2JG4aN-CnAUnrkCdOtHlp0GNyyTTPSJx28/rs:fit:860:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc.svg"
                className="w-full h-auto"
                alt=""
                onClick={() => {
                  imageRef.current.click();
                }}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
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
            value={product ? product.name : ""}
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
            value={product ? product.description : ""}
            onChange={handleChange}
            required
            rows={3}
            cols={20}
          />
        </div>
        <div className="field">
          <label htmlFor="name" className="font-bold p-3">
            Stock
          </label>
          <InputText
            id="stock"
            name="stock"
            value={product ? product.stock : ""}
            onChange={handleChange}
            required
            autoFocus
            className="p-3"
          />
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold p-3">
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            className="p-3"
          >
            <option value="">-- Select a category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold p-3">
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            onChange={handleChange}
            className="p-3"
          >
            <option value="">-- Select a brand --</option>
            {brands.map((bran) => (
              <option key={bran._id} value={bran._id}>
                {bran.name}
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
        footer={deleteProductDialogFooter}
        onHide={() => setDeleteModal(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3 "
            style={{ fontSize: "2rem", color: "red" }}
          />
          {product && (
            <span className="">
              Are you sure you want to delete the Product
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ProductDisplay;
