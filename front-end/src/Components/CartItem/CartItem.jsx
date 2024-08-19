import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Contexs/ShopContext";
import PayButtom from "../PayButtom/PayButtom";
import list from "../Assest/list.png";
import axios from "axios";

const CartPage = () => {
  const {
    cart,
    all_product,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    setCart,
  } = useContext(ShopContext);
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (cart.details && all_product) {
          const itemsWithDetails = cart.details.map((cartItem) => {
            const product = all_product.find(
              (p) => p._id === cartItem.productId
            );
            return {
              ...cartItem,
              product,
            };
          });

          setCartItems(itemsWithDetails);
        }
      } catch (error) {
        console.error("Error processing cart items:", error);
      }
    };
    const fetchCartData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.post(
            `${url}/cart/getcart`,
            {},
            {
              headers: { "auth-token": localStorage.getItem("token") },
            }
          );
          setCart(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCartData();
    fetchCartItems();
  }, [cart.details, all_product]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  let itemQnt = () => {
    for (const item of cartItems) {
      return item.quantity;
    }
  };

  const quantity = itemQnt() - 1;

  const handleUpdateQntity = (itemId, quantity) => {
    updateCartQuantity(itemId, quantity);
  };
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <>
            <img
              src={list}
              style={{ width: "300px", height: "300px", margin: "auto" }}
            />
            <h1>Your cart is empty.</h1>
          </>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="item-details">
                <div>
                  <img
                    src={item.product.image}
                    alt={item.product ? item.product.name : "Product"}
                    className="item-image"
                  />
                  <button
                    onClick={() => {
                      removeFromCart(item.productId);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="item-info">
                  <h2>
                    {item.product ? item.product.name : "Unknown Product"}
                  </h2>
                  <p>
                    Price: $
                    {item.product ? item.product.price.toFixed(2) : "N/A"}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => {
                    addToCart(item.productId);
                  }}
                >
                  Increase
                </button>
                <button
                  onClick={() => {
                    handleUpdateQntity(item.productId, quantity);
                  }}
                >
                  Decrease
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
        <PayButtom cart={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
