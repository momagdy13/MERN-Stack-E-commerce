import axios from "axios";

const PayButtom = ({ cart }) => {
  // const url = "https://mern-stack-e-commerce-50uh.onrender.com";  TO DO
  const url = "http://localhost:4000";

  const handleCheckout = () => {
    try {
      axios
        .post(
          `${url}/stripe/create-checkout-session`,
          { items: cart },
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        )
        .then(async (response) => {
          if (response.data.url) {
            await axios
              .post(
                "http://localhost:4000/cart/doneorder",
                { cart },
                {
                  headers: { "auth-token": localStorage.getItem("token") },
                }
              )
              .then((res) => {
                console.log("Order Response:", res);
              });
            await axios
              .post(
                "http://localhost:4000/cart/deleteall",
                {},
                {
                  headers: { "auth-token": localStorage.getItem("token") },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });

            window.location.href = response.data.url;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        onClick={() => handleCheckout()}
        type="button"
        className="btn btn-outline-success btn-lg"
      >
        Check Out
      </button>
    </>
  );
};

export default PayButtom;
