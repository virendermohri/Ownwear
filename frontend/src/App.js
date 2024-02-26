import './App.css';
import {
  Routes,
  Route,

} from "react-router-dom"
import AboutUs from './Components/AboutUs'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Tshirts from './Components/Tshirts';
import Shoes from './Components/Shoes';
import Hoodies from './Components/Hoodies';
import Jewellery from './Components/Jewellery';
import Notfoundpage from './Components/Notfoundpage';
import Slug from './Components/Product/Slug';
import { useEffect, useState } from 'react';
import Checkout from './Components/Checkout';
import Order from './Components/Order';
import ForgotPassword from './Components/ForgotPassword';
import { Link,useNavigate } from 'react-router-dom'

function App() {
  let history = useNavigate();
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
  },[])
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let sbt=0;
    let keys=Object.keys(myCart)
    for(let i=0;i<keys.length;i++){
      sbt+= myCart[keys[i]].price*myCart[keys[i]].qty
      
    }
    setSubTotal(sbt)
  }
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }

    }
    setCart(newCart)
    saveCart(newCart)
  }
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart =JSON.parse(JSON.stringify(cart));
    // console.log(newCart)
    if (itemCode in cart) {
      newCart[itemCode]["qty"] = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]

    }
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = (itemCode, qty, price, name, size, variant) => {

    setCart({})
    saveCart({})
  }
  const buynow=(itemCode, qty, price, name, size, variant)=>{
    let newCart = {itemCode: {qty: 1, price, name, size, variant }};
    setCart(newCart)
    saveCart(newCart)
   
    history("/Checkout")
  }
  return (
    <>
      <Navbar  cart={cart} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subTotal={subTotal} />
      <Routes>

        <Route exact path='*' element={<Notfoundpage  />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/AboutUs' element={<AboutUs />} />
        <Route exact path='/Tshirts' element={<Tshirts />} />
        <Route exact path='/Hoodies' element={<Hoodies  />} />
        <Route exact path='/Shoes' element={<Shoes />} />
        <Route exact path='/Jewellery' element={<Jewellery />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/Forgot-Password' element={<ForgotPassword/>} />
        <Route exact path='/Order' element={<Order/>} />
        <Route exact path='/Checkout' element={<Checkout cart={cart} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subTotal={subTotal} />} />
        <Route exact path='/slug' element={<Slug cart={cart}  buynow={buynow} addToCart={addToCart} removeFromCart={removeFromCart} subTotal={subTotal} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
