import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";
import Auth from "./Pages/Auth";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./utils/PrivateRoutes";
import User from "./Pages/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dash" element={<DashBoard />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
