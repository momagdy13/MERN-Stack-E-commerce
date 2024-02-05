import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import axios from "axios";
export default function ListProduct() {
  const [allproducts, setProducts] = useState([]);

  const req = async () => {
    await axios
      .get("http://localhost:4000/allproduct")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteProduct = async (id) => {
    await axios
      .delete("http://localhost:4000/deleteproduct", { id: id })
      .then((response) => {
        alert("Deleted Success!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await req();
  };

  useEffect(() => {
    req();
  }, []);

  return (
    <div className="list-product" key={"list"}>
      <h1>All Products List</h1>
      <div className="listproduct-main">
        <p >Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Ctegory</p>
        <p>Remove</p>
      </div>
      <div className="all-products">
        <hr />

        {allproducts.map((product, index) => {
          return (
            <>
              <div key={index} className="listproduct-Main">
                <img src={product.image} alt="" className="product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    deleteProduct(product.id, product.name);
                  }}
                  style={{ cursor: "pointer" }}
                  src={cross_icon}
                  alt=""
                  className="remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
}
