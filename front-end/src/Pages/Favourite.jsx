import React, { useContext, useEffect, useState } from "react";
import list from "../Components/Assest/list.png";
import axios from "axios";
import { ShopContext } from "../Contexs/ShopContext";
import item1 from "../Components/Assest/4a91a6b4f09c7df99a6352db06f7a701.jpg";
import item2 from "../Components/Assest/tomato.jpeg";
import item3 from "../Components/Assest/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg";
import item4 from "../Components/Assest/apple.jpeg";
import item5 from "../Components/Assest/shosee.jpeg";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Favourite() {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [favList, setFavList] = useState([]);
  const productImage = {
    5: item1,
    6: item4,
    7: item3,
    8: item5,
    9: item2,
  };

  const url = "https://mern-stack-e-commerce-50uh.onrender.com";
  useEffect(() => {
    const fetchFavouriteList = async () => {
      try {
        const res = await axios.post(
          `${url}/cart/favlist`,
          {},
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        const favourites = res.data.map((item) => {
          return item.product_id;
        });
        setFavList(favourites);
        setCount(favourites.length);
        console.log(favourites);

        console.log(res);
      } catch (err) {
        console.error("Error fetching favorite list:", err);
      }
    };

    fetchFavouriteList();
  }, []);

  const toggleFavorite = async (product_id) => {
    try {
      if (favList.includes(product_id)) {
        await axios.post(
          `${url}/cart/removefav`,
          { productId: product_id },
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        setFavList((prev) => prev.filter((id) => id !== product_id));
        setCount(count - 1);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product-details`, { state: { product } });
  };

  const favItem = all_product.filter((item) => {
    return favList.includes(item._id);
  });

  return (
    <>
      <div style={{margin:'30px'}}>
        <h2 style={{textAlign:'start'}}>My List</h2>
        <h4>
          You have <span style={{ color: "red", fontSize: "20px" }}>{count}</span>{" "}
          product in your List
        </h4>
      </div>
      <div className="favpage">
        {count === 0 ? (
          <img src={list} style={{ width: "250px", margin: "auto" }} />
        ) : (
          <>
            <div className="products-display">
              {favItem.map((item) => (
                <div
                  className="product-card"
                  id="fav"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(item)}
                >
                  <div className="product-image">
                    <img src={productImage[item.id]} alt="Product Image" />
                    <div className="product-overlay">
                      <h3 className="product-title">{item.name}</h3>
                      <p className="product-description">{item.descripe}</p>
                      <div className="product-details">
                        <span className="product-price">{item.price}$</span>
                      </div>
                      <Rating
                        name="half-rating-read"
                        defaultValue={item.rate}
                        precision={0.5}
                        readOnly
                        size="large"
                      />
                      <button className="add-to-cart">Product Details</button>
                      <button
                        className="favorite-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item._id);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          position: "absolute",
                          top: "10px",
                          left: "150px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={favList.includes(item._id) ? "red" : "white"}
                          width="30px"
                          height="30px"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
