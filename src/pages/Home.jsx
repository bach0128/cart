import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callApi } from "../client/callApi";

import "../asset/home.scss";
import { productSlice } from "../redux/slice/products";

const { add } = productSlice.actions;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [count, setCount] = useState(cart.length);

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data, response } = await callApi.get("/products?limit=9&page=1");

    if (response.ok) {
      setProducts(data.data.listProduct);
    } else {
      console.log("False");
    }
  };

  const handleAddCart = (id) => {
    const item = products.filter((product) => product._id === id);
    if (cart.length > 0) {
      if (cart.includes((item) => item._id === id)) {
      } else {
        dispatch(add(...item));
      }
    } else {
      dispatch(add(...item));
    }
  };

  const handleNavCart = () => {
    navigate("/cart");
  };

  const handleDetail = ({ _id }) => {
    navigate(`details/${_id}`);
  };

  useLayoutEffect(() => {
    setCount(cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useLayoutEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div className="header">
        <i className="fa-solid fa-house"></i>
        <button className="cart" onClick={handleNavCart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <span className="count">{count}</span>
      </div>

      <div className="container products mt-1">
        <div className="row">
          {products.map(({ name, price, image, _id }, index) => (
            <div key={index} className="product-item col-3 m-3">
              <div className="head">
                <img
                  src={image}
                  alt="image"
                  onClick={() => handleDetail({ _id })}
                />
                <h3>{name}</h3>
              </div>

              <div className="content">
                <p>
                  <span>$</span>
                  {price}
                </p>
                <button className="" onClick={() => handleAddCart(_id)}>
                  <i className="add-to-cart fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
