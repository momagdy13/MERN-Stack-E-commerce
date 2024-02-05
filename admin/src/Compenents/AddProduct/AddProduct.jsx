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
    new_price: "",
    old_price: "",
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
      .post("http://localhost:4000/upload", formData)
      .then((response) => {
        product.image = response.data.img_url;
        responseData = response.data.sucsses1;
        console.log(product);
      })
      .catch((error) => {
        console.log(error);
      });
    if (responseData) {
      await axios
        .post("http://localhost:4000/addproduct", product)
        .then((response) => {
          console.log(response);
          alert("success");
        })
        .catch((error) => {
          alert(error);
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
      <div className="price-fields">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={product_details.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={product_details.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
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
          <option value="kid">Kid</option>
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
