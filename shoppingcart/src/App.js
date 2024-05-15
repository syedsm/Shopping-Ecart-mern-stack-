import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Reg from './Auth/Reg';
import Dashboard from './Admin/Dashboard';
import Header from './Header';
import { useEffect, useState } from 'react';
import Adminproduct from './Admin/Adminproduct';
import Productadd from './Admin/Productadd';
import Productupdate from './Admin/Productupdate';
import Usersmanag from './Admin/Usersmanagement';
import Usersproduct from './User/Productpage';
import Cart from './Cart';
import './index.css';
import { createContext } from "react";
import Productdetail from './User/Productdetail';

// import Productdelete from './productdelete';

function App() {

  const [loginname, setloginname] = useState(localStorage.getItem('loginname'))
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  // const [cart, setCart] = useState('')

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart || []; // Initialize with an empty array if there's no cart in localStorage
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // console.log('Cart State:', cart);
  // console.log('Local Storage Cart:', JSON.parse(localStorage.getItem('cart')));

  return (
    <>
      <Router>
        <Contextapi.Provider value={{ loginname, setloginname, cart, setCart }}>
          <Header />
          <Routes>
            {loginname ? (
              <>
                {/* <Route path='/delete/:id' element={<Cartdelete />}></Route> */}
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/adminproducts' element={<Adminproduct />}></Route>
                <Route path='/adminproductadd' element={<Productadd />}></Route>
                <Route path='/productupdate/:id' element={<Productupdate />}></Route>
                <Route path='/usermanagment' element={<Usersmanag />}></Route>
                <Route path='/userproduct' element={<Usersproduct />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/productdetail/:id' element={<Productdetail />}></Route>

              </>
            ) : (
              <>
                <Route path='/productdetail/:id' element={<Productdetail />}></Route>
                <Route path='/' element={<Login />}></Route>
                <Route path='/reg' element={<Reg />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/userproduct' element={<Usersproduct />}></Route>
              </>
            )}
          </Routes>
        </Contextapi.Provider>
      </Router>
    </>
  );
}
export let Contextapi = createContext(null)

export default App;