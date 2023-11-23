import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details">
          <Route path=":path" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
