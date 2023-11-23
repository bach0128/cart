import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { callApi } from "../client/callApi";
import { productSlice } from "../redux/slice/products";
import { useLayoutEffect } from "react";

const { add } = productSlice.actions;

import "../asset/product.scss";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const { path } = useParams();

  const cart = useSelector((state) => state.cart.cart);
  const [count, setCount] = useState(cart.length);
  console.log(cart);

  const getProduct = async () => {
    const { data } = await callApi.get(`/products/${path}`);
    if (data.code === 200) {
      setProduct(data.data);
    }
  };

  const handleNavCart = () => {
    navigate("/cart");
  };

  const handleNavHome = () => {
    navigate("/");
  };

  const handleAddCart = (id) => {
    dispatch(add(product));
  };

  useEffect(() => {
    getProduct();
  }, []);

  useLayoutEffect(() => {
    setCount(cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <div className="header">
        <i className="fa-solid fa-house" onClick={handleNavHome}></i>
        <button className="cart" onClick={handleNavCart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <span className="count">{count}</span>
      </div>
      <div className="container m-3">
        <div className="row">
          <div className="col-4 border">
            <img src={product.image} alt="" />
          </div>
          <div className="col-8">
            <h1>{product.brand}</h1>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>
              <span>$</span>
              {product.price}
            </p>
            <div className="btn-product">
              <button className="go-home" onClick={handleNavHome}>
                Go home
              </button>
              <button
                className="add-to-cart"
                onClick={() => handleAddCart(product._id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
