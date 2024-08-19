import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import Spinner from "./Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { Rating } from "@mui/material";
import fastion from "../Assest/77823e67a83e9846c7002085847bb64b.jpg";
import offer from "../Assest/R.jpeg";
import emptyCart from "../Assest/empty-cart-2130356-1800917.webp";

const CategoryResults = () => {
  const { all_product } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { catg } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    navigate(`/product-details`, { state: { product } });
  };
  const searchName = location.state;


  useEffect(() => {
    setTimeout(() => {
      const filtered = all_product.filter(
        (product) => product.category === catg
      );
      setFilteredProducts(filtered);

      if (searchName != null && searchName.item === "string") {
        const filteredProduct = all_product.filter((product) =>
          product.name.toLowerCase().includes(searchName.item.toLowerCase())
        );

        setFilteredProducts(filteredProduct);
      } else {
        console.warn("searchName.item is not a string");
      }

      setLoading(false);
    }, 1000);
  }, [catg, all_product]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="category-results-page">
      <h1>{catg} Products</h1>

      {filteredProducts.length === 0 ? (
        <>
          <h4 style={{ marginTop: "30px" }}>
            No products found in this category.
          </h4>
          <img src={emptyCart} alt="" />
        </>
      ) : (
        <div className="home">
          <div className="left-home">
            <img src={fastion} />
            <img src={offer} />
          </div>

          <div className={`products-display grid`}>
            {filteredProducts.map((product, index) => (
              <div>
                <div
                  className="product-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleProductClick(product);
                  }}
                >
                  <div className="product-image">
                    <img src={product.image} alt="Product Image" />
                    <div className="product-overlay">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-description">{product.descripe}</p>
                      <div className="product-details">
                        <span className="product-price">{product.price}$</span>
                        <button className="add-to-favorites">
                          <FiHeart size={"40"} />
                        </button>
                      </div>
                      <Rating
                        name="half-rating-read"
                        defaultValue={product.rate}
                        precision={0.5}
                        readOnly
                        size="large"
                      />
                      <button className="add-to-cart">Product Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryResults;
