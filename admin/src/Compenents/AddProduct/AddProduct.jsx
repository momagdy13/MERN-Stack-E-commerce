import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios";

export default function AddProduct() {
  const [image, setImage] = useState(false);
  const [product_details, setProduct_details] = useState({
    name: "",
    image: "",
    category: "Women",
    price: "",
    rate: "",
    descripe: "",
  });
  const changeHandler = (e) => {
    setProduct_details({ ...product_details, [e.target.name]: e.target.value });
  };
  const Add_product = async () => {
    let responseData;
    let product = product_details;
    let formData = new FormData();
    formData.append("product", image);
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/product/image/upload`, formData)
      .then((response) => {
        product.image = response.data.img_url;
        responseData = response.data.sucsses;
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
        alert("Fill out Fields");
      });
    if (responseData) {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/product/addproduct`, product)
        .then((response) => {
          console.log(response);
          alert("success");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed");
        });
    }
  };
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={product_details.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Descripe</p>
        <input
          value={product_details.descripe}
          onChange={changeHandler}
          type="text"
          name="descripe"
          placeholder="Type Here"
        />
      </div>
      <div className="price-fields">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={product_details.price}
            onChange={changeHandler}
            type="text"
            name="price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Rate</p>
          <input
            value={product_details.rate}
            onChange={changeHandler}
            type="text"
            name="rate"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Proudct Category</p>
        <select
          value={product_details.category}
          onChange={changeHandler}
          name="category"
          className="selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-img"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          onChange={imageHandler}
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_product();
        }}
        className="add-btn"
      >
        Add
      </button>
    </div>
  );
}
