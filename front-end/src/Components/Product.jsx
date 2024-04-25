import React, { useContext } from "react";
import "./product.css";
import { ShopContext } from "../Contexs/ShopContext";
import { useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";


const Product = () => {
  const { addToCart, cartItems, addToFav, favItems } = useContext(ShopContext);
  const product = useLocation();
  const cartItemAmount = cartItems[product.state.id];
  const FavItem = favItems[product.state.id];
  return (
    <div className="details">
      <div className="details-left">
        <div className="details-image">
          <img className="main-image" src={product.state.image} alt="" />
        </div>
        <div className="img-list">
          <img src={product.state.image} alt="" />
          <img src={product.state.image} alt="" />
          <img src={product.state.image} alt="" />
          <img src={product.state.image} alt="" />
        </div>
      </div>
      <div className="details-right">
        <h1>{product.state.name}</h1>

        <div className="price">
          <div className="price-new">${product.state.price}</div>
        </div>
        <div className="drscription">{product.state.descripe}</div>
        <Rating
          name="half-rating-read"
          value={product.state.rate}
          precision={0.5}
          readOnly
        />
        <div className="size">
          <h1>Select Size</h1>
          <div className="Size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>

        <button
          onClick={() => {
            addToCart(product.state.id);
          }}
        >
          Add to cart
          {cartItemAmount > 0 && <>({cartItemAmount})</>}
        </button>
        <button className="favb"
          onClick={() => {
            addToFav(product.state.id);
          }}
        >
          Add to Favourite
          {FavItem > 0 && (
            <>{<FavoriteIcon sx={{ color: "red", ml: "7px" }} />}</>
          )}
        </button>
        <p className="category">
          <span>
            Category : <span>{product.state.category}</span>
          </span>
        </p>
        <p className="category">
          <span>
            Tags : <span></span>Modern, Latest
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;
