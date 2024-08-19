import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import Login from "@/Auth/Login.jsx";
import Reg from "./Auth/Reg.jsx";
import Dashboard from "@/Admin/Dashboard.jsx";
import Header from "@/Header.jsx";
import Adminproduct from "@/Admin/Adminproduct.jsx";
import Productadd from "@/Admin/Productadd.jsx";
import Productupdate from "@/Admin/Productupdate.jsx";
import Usersmanag from "@/Admin/Usersmanagement.jsx";
import Usersproduct from "@/User/Productpage.jsx";
import Cart from "@/Cart.jsx";
import Productdetail from "@/User/Productdetail.jsx";
import Forgotpage from "@/Auth/Forgotpage.jsx";

import ResetSentPage from "@/Auth/Resetpage.jsx";
import Userprofile from "@/Userprofile.jsx";
import { Contextapi } from "@/Contextapi.jsx";
import Buypage from "./User/Buypage.jsx";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme ? storedTheme : "light";
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginname, setloginname] = useState(
    localStorage.getItem("loginname" || "")
  );
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

  const [cartitem, setcartitem] = useState(() => {
    const storedCartitem = JSON.parse(localStorage.getItem("cartitem"));
    return storedCartitem || [];
  });

  const [buyitem, setbuyitem] = useState(() => {
    const storedBuyitem = JSON.parse(localStorage.getItem("buyitem"));
    return storedBuyitem || [];
  });

  useEffect(() => {
    localStorage.setItem("cartitem", JSON.stringify(cartitem));
  }, [cartitem]);
  useEffect(() => {
    localStorage.setItem("buyitem", JSON.stringify(buyitem));
  }, [buyitem]);

  // console.log('Cart State:', cart);
  // console.log('Local Storage Cart:', JSON.parse(localStorage.getItem('cart')));

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    if (themeMode === "dark") {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Router>
        <Contextapi.Provider
          value={{
            loginname,
            setloginname,
            cartitem,
            setcartitem,
            buyitem,
            setbuyitem,
            token,
            setToken,
            themeMode,
            toggleThemeMode,
          }}
        >
          <Header />
          <Routes>
            {loginname ? (
              <>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/adminproducts" element={<Adminproduct />}></Route>
                <Route path="/adminproductadd" element={<Productadd />}></Route>
                <Route
                  path="/productupdate/:id"
                  element={<Productupdate />}
                ></Route>
                <Route path="/usermanagment" element={<Usersmanag />}></Route>
                <Route path="/userproduct" element={<Usersproduct />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/buy" element={<Buypage />}></Route>
                <Route
                  path="/productdetail/:id"
                  element={<Productdetail />}
                ></Route>
                <Route path="/userprofile" element={<Userprofile />}></Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Login />}></Route>
                <Route path="/reg" element={<Reg />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route
                  path="/productdetail/:id"
                  element={<Productdetail />}
                ></Route>
                <Route
                  path="/resetsentpage/:email"
                  element={<ResetSentPage />}
                ></Route>
                <Route
                  path="/forgotpasswordpage"
                  element={<Forgotpage />}
                ></Route>
                <Route path="/userproduct" element={<Usersproduct />}></Route>
              </>
            )}
          </Routes>
        </Contextapi.Provider>
      </Router>
    </>
  );
}

export default App;
