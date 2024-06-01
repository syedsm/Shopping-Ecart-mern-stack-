import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import { useEffect, useState } from 'react';
import Login from './Auth/Login';
import Reg from './Auth/Reg';
import Dashboard from './Admin/Dashboard';
import Header from './Header';
import Adminproduct from './Admin/Adminproduct';
import Productadd from './Admin/Productadd';
import Productupdate from './Admin/Productupdate';
import Usersmanag from './Admin/Usersmanagement';
import Usersproduct from './User/Productpage';
import Cart from './Cart';
import Productdetail from './User/Productdetail';
import Forgotpage from './Auth/Forgotpage';

import ResetSentPage from './Auth/Resetpage';
import Userprofile from './Userprofile';
import { Contextapi } from './Contextapi';


function App() {

  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? storedTheme : 'light';
  });
  
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loginname, setloginname] = useState(localStorage.getItem('loginname' || ''))
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart || [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // console.log('Cart State:', cart);
  // console.log('Local Storage Cart:', JSON.parse(localStorage.getItem('cart')));

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    if (themeMode === 'dark') {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <>
      <Router>
        <Contextapi.Provider value={{ loginname, setloginname, cart, setCart, token, setToken, themeMode, toggleThemeMode }}>
          <Header />
          <Routes>
            {loginname ? (
              <>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/adminproducts' element={<Adminproduct />}></Route>
                <Route path='/adminproductadd' element={<Productadd />}></Route>
                <Route path='/productupdate/:id' element={<Productupdate />}></Route>
                <Route path='/usermanagment' element={<Usersmanag />}></Route>
                <Route path='/userproduct' element={<Usersproduct />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/productdetail/:id' element={<Productdetail />}></Route>
                <Route path='/userprofile' element={<Userprofile />}></Route>
              </>
            ) : (
              <>
                <Route path='/' element={<Login />}></Route>
                <Route path='/reg' element={<Reg />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/productdetail/:id' element={<Productdetail />}></Route>
                <Route path='/resetsentpage/:email' element={<ResetSentPage />}></Route>
                <Route path='/forgotpasswordpage' element={<Forgotpage />}></Route>
                <Route path='/userproduct' element={<Usersproduct />}></Route>
              </>
            )}
          </Routes>
        </Contextapi.Provider>
      </Router>
    </>
  );
}

export default App;