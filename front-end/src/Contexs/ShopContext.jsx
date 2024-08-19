import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [new_product, setNewProduct] = useState([]);
  const [cart, setCart] = useState({ quantity: 0, details: {} });
  const [popular, setPopular] = useState([]);
  // const url = "https://mern-stack-e-commerce-50uh.onrender.com";  TO DO
  const url = "http://localhost:4000";

  const addToCart = async (productId, quantity = 1) => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          `${url}/cart/add`,
          { cartId: cart.cartId, productId, quantity },
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      if (quantity > 0) {
        const response = await axios.post(
          `${url}/cart/updatequantity`,
          { cartId: cart.cartId, productId, quantity },
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        setCart(response.data);
      } else {
        console.log("Item not found");
        setCart((prevCart) => {
          const updatedDetails = prevCart.details.filter(
            (item) => item.productId !== productId
          );
          return { ...prevCart, details: updatedDetails };
        });
      }
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        `${url}/cart/delete`,
        {
          cartId: cart.cartId,
          productId,
        },
        {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        console.log("Item successfully removed from cart on the server.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const removeAllFromCart = async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          `${url}/cart/deleteallfromcart`,
          {},
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        setCart({ quantity: 0, details: [] });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const allProductResponse = await axios.get(`${url}/product/allproduct`);
        setAllProduct(allProductResponse.data);

        const newCollectionResponse = await axios.get(
          `${url}/product/newcollection`
        );
        setNewProduct(newCollectionResponse.data);

        const popularResponse = await axios.get(`${url}/product/popular`);
        setPopular(popularResponse.data);
      } catch (error) {
        console.error(error);
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

    fetchAllData();
    fetchCartData();
  }, []); // Only run once on mount

  const contxtValue = {
    all_product,
    cart,
    new_product,
    popular,
    setCart,
    updateCartQuantity,
    addToCart,
    removeFromCart,
    removeAllFromCart,
  };

  return (
    <ShopContext.Provider value={contxtValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
