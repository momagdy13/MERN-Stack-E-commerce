import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Contexs/ShopContext";
import axios from "axios";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { setCart, cart } = useContext(ShopContext);
  const [count, setCount] = useState(3);
  const counter = setInterval(() => {
    setCount((count) => {
      if (count === 1) {
        clearInterval(counter);
        window.location.href = "/";
      }
      return count - 1;
    });
  }, 1000);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "100px",
      }}
    >
      <h1>Payment Successful!</h1>
      <p>
        Your cart has been cleared and your order is being processed....
        Redirect in {count} Second.
      </p>
    </div>
  );
};

export default PaymentSuccessPage;
