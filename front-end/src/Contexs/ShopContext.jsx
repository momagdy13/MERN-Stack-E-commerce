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
const getDefultFav = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefultCart());
  const [all_product, setAllProduct] = useState([]);
  const [favItems, setFavItem] = useState(getDefultFav());
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("token")) {
      axios
        .post(
          `${url}/cart/addtocart`,
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
          `${url}/cart/deletefromcart`,
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
  const addToFav = async (itemId) => {
    if (localStorage.getItem("token")) {
      await axios
        .post(
          `${url}/fav/addtofav`,
          { itemId: itemId },
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setFavItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const removeFromFav = async (itemId) => {
    setFavItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem("token")) {
      await axios
        .post(
          `${url}/fav/removefromfav`,
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

  const FavNumber = () => {
    let totalItem = 0;
    for (const item in favItems) {
      if (favItems[item] > 0) {
        totalItem += favItems[item];
      }
    }
    return totalItem;
  };
  const removeAllFromCart = () => {
    if (localStorage.getItem("token")) {
      axios
        .delete(
          `${url}/cart/deleteallfromcart`,

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
  useEffect(async () => {
    await axios
      .get(`${url}/product/allproduct`)
      .then((response) => {
        setAllProduct(response.data);
        if (localStorage.getItem("token")) {
          axios
            .post(
              `${url}/cart/getcart`,
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

          axios
            .post(
              `${url}/fav/getfav`,
              {},
              {
                headers: { "auth-token": `${localStorage.getItem("token")}` },
              }
            )
            .then((response) => {
              setFavItem(response.data);
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
    favItems,
    FavNumber,
    addToFav,
    removeFromFav,
    addToCart,
    removeFromCart,
    removeAllFromCart,
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
