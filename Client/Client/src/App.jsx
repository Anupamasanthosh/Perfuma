import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import ProtectedRoute from "../Utils/ProtectedRoutes";
import Brand from "./Pages/Brand";
import Category from "./Pages/Category";
import ProductDetails from "./Pages/ProductDetails";
import Payment from "./Pages/Payment";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route
            path="/category/:id"
            element={<Category/>}
          />
          <Route
            path="/brand/:id"
            element={<Brand />}
          />
           <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/payment"
            element={<Payment />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
