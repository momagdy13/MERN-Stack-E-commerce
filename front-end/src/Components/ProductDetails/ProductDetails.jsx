import React, { useContext } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import { useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";
import item1 from "../Assest/4a91a6b4f09c7df99a6352db06f7a701.jpg";
import item2 from "../Assest/tomato.jpeg";
import item3 from "../Assest/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg";
import item4 from "../Assest/apple.jpeg";
import item5 from "../Assest/shosee.jpeg";

const Product = () => {
  const { addToCart, updateCartQuantity, cart } = useContext(ShopContext);
  const location = useLocation();
  const product = location.state.product;
  let itemId = product._id;
  const productImage = {
    5: item1,
    6: item4,
    7: item3,
    8: item5,
    9: item2,
  };

  const getItemQuantity = (productId) => {
    if (!localStorage.getItem("token")) {
      return 0;
    } else if (!cart && !cart.details) {
      return 0;
    } else {
      const item = cart.details.find((item) => item.productId === productId);
      return item ? item.quantity : 0;
    }
  };
  const quantity = getItemQuantity(itemId);

  const handleUpdateQntity = (itemId, quantity) => {
    updateCartQuantity(itemId, quantity);
  };

  const handleAdd = (itemId) => {
    addToCart(itemId);
  };

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={productImage[product.id]} alt="" />
          </div>
          <div className="right">
            <span className="name">{product.name}</span>
            <span className="price">{product.price}$</span>
            <span className="desc">{product.descripe}</span>
            <div>
              <Rating
                name="size-large"
                defaultValue={product.rate}
                precision={0.5}
                size="large"
                readOnly
              />
            </div>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <button
                  className="decrease"
                  onClick={() => handleUpdateQntity(itemId, quantity - 1)}
                >
                  -
                </button>
                <div className="qnt-num">
                  <h4>{quantity}</h4>
                </div>
                <button className="increase" onClick={() => handleAdd(itemId)}>
                  +
                </button>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => handleAdd(itemId)}
              >
                <FaCartPlus size={20} style={{ marginRight: "30px" }} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
