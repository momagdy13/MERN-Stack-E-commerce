import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ShopContext = createContext(null);

const getDefultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefultCart());
  const [all_product, setAllProduct] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("token")) {
      axios
        .post(
          "http://localhost:4000/addtocart",
          { itemId: itemId },
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("token")) {
      axios
        .post(
          "http://localhost:4000/deletefromcart",
          { itemId: itemId },
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/allproduct`)
      .then((response) => {
        setAllProduct(response.data);
        if (localStorage.getItem("token")) {
          axios
            .post(
              "http://localhost:4000/getcart",
              {},
              {
                headers: { "auth-token": `${localStorage.getItem("token")}` },
              }
            )
            .then((response) => {
              setCartItems(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contxtValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contxtValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
