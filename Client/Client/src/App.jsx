import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import ProtectedRoute from "../Utils/ProtectedRoutes";
import Categoryview from "./Components/Home/Center/Categoryview";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route
            path="/category/:id"
            element={<Categoryview/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
