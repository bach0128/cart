import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../asset/cart.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { productSlice } from "../redux/slice/products";

const { restart } = productSlice.actions;

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [isCheckCart, setIsCheckCart] = useState(true);
  const [count, setCount] = useState(cart.length);

  useEffect(() => {
    if (count > 0) {
      setIsCheckCart(false);
    }
  }, []);

  let x = 0;
  if (!isCheckCart) {
    cart.forEach(({ price }) => (x += price));
  }
  const handleNavHome = () => {
    navigate("/");
  };

  const handlePayment = () => {
    localStorage.setItem("cart", []);
    toast.success("Thanh toán thành công");
    setIsCheckCart(true);
    setCount(0);
    dispatch(restart());
  };

  return (
    <div>
      <div className="header">
        <button className="home" onClick={handleNavHome}>
          <i className="fa-solid fa-house"></i>
        </button>
        <button className="cart">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <span className="count">{count}</span>
      </div>
      <h2 className="heading">SHOPPING CART</h2>

      {isCheckCart ? (
        <h1>Không có sản phẩm nào trong giỏ :(</h1>
      ) : (
        <>
          {cart.map(({ brand, category, image, price, quantity }, index) => (
            <div className="container item p-2" key={index}>
              <div className="row">
                <div className="col-3 info">
                  <img src={image} alt="" />
                  <div className="btn">
                    <button>-</button>
                    <button className="count disabled">{1}</button>
                    <button>+</button>
                  </div>
                </div>

                <div className="col-9 detail">
                  <p>{brand}</p>
                  <p>{category}</p>
                  <p>
                    <span>$</span>
                    {price}
                  </p>
                  <p>Còn lại: {quantity}</p>
                  <span className="total-item">
                    <span>$</span>
                    {price}
                  </span>
                  <button className="delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h2 className="total-price">
            Total Price: <span className="money">$</span> <span>{x}</span>
          </h2>
          <div className="btn-bot">
            <button className="btn go-home" onClick={handleNavHome}>
              Go home
            </button>
            <button className="btn payment" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
