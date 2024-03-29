import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  const [dropdown, setdropdown] = useState(false);
  let location = useLocation();
  const togglecart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }
  }
  const ref = useRef()
  const toggledropdown = () => {
    setdropdown(!dropdown)
  }
  return (
    <>

      <div className={`pt-3 navbar  md:pb-3 pb-2  w-full z-30  flex body-font  bg-white  items-center md:shadow-lg md:shadow-md md:mb-3   sticky top-0 `}>
        <div className="logo mx-3  ">
          <Link to='/'>

            <img src="/logo.png" className='' width={200} height={40} alt="" />
          </Link>
        </div>
        <div className="nav   ">
          <ul className='flex items-center font-bold '>
            <Link className={`${location.pathname === '/Tshirts' ? "active-nav" : ""} hover:text-blue-600`} to="/Tshirts"><li>Tshirts</li></Link>
            <Link className={`${location.pathname === "/Hoodies" ? "active-nav" : ""}hover:text-blue-600`} to="/Hoodies"><li>Hoodies</li></Link>
            <Link className={`${location.pathname === "/Shoes" ? "active-nav" : ""}hover:text-blue-600`} to="/Shoes"><li>Shoes</li></Link>
            <Link className={`${location.pathname === "/Jewellery" ? "active-nav" : ""}hover:text-blue-600`} to="/Jewellery"><li>Jewellery</li></Link>
          </ul>
        </div>
        <div className="mx-2 md:mx-5 z-40  flex gap-2 md:gap-1 font-bold absolute right-0">
          <div className="  ">
            <div className='login-btn cursor-pointer'>{localStorage.getItem("token") ? <i onMouseOver={toggledropdown} className="bi bi-person-circle text-2xl"></i> 
            : <Link to={"/login"}><button className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-primary-300  border-0 rounded-lg text-sm px-4 py-2.5 text-center font-bold " >Login</button></Link>}
          </div>
          </div>
          {dropdown&& <div className="right-0 md:right-7 border  rounded shadow-2xl top-9 z-40 absolute px-5 py-1 w-40  bg-white">
            <ul className='' onMouseEnter={()=>setdropdown(true)} onMouseLeave={toggledropdown}>
              <Link to={"/Myaccount"}><li className='hover:text-gray-600 hover:bg-gray-100 rounded py-1 cursor-pointer text-fold  '>My Account</li></Link>
              <Link to={"/Orders"}><li className='hover:text-gray-600 hover:bg-gray-100 rounded py-1 cursor-pointer text-bold'>Orders</li></Link>
            <li onClick={()=>localStorage.removeItem("token")} className='hover:text-gray-600 hover:bg-gray-100 rounded py-1 cursor-pointer text-bold'>Logout</li>
            </ul> 



          </div>}
          <button onClick={togglecart} className='bg-white flex text-2xl cart-btn text-black'><i className="bi mx-2 bi-cart4"></i><p className='cart-text'> Cart</p></button>
        </div>
      </div>
      <div className={`nav2 pb-3 sticky top-0 font-bold md:top-[65px] max-[290px]:top-[55px] top-[65px]  w-full z-20  shadow-md pb-2 `}>
        <ul className='flex justify-center font-bold items-center '>
          <Link className={`${location.pathname === '/Tshirts' ? "active-nav" : ""} hover:text-blue-600 `} to="/Tshirts"><li>Tshirts</li></Link>
          <Link className={`${location.pathname === "/Hoodies" ? "active-nav" : ""}hover:text-blue-600`} to="/Hoodies"><li>Hoodies</li></Link>
          <Link className={`${location.pathname === "/Shoes" ? "active-nav" : ""}hover:text-blue-600`} to="/Shoes"><li>Shoes</li></Link>
          <Link className={`${location.pathname === "/Jewellery" ? "active-nav" : ""}hover:text-blue-600`} to="/Jewellery"><li>Jewellery</li></Link>
        </ul>
      </div>
      <div ref={ref} className={`w-72  h-full z-50 overflow-y-scroll  sidecart fixed top-0 bg-blue-100  right-0 px-8 py-10 shadow-2xl  transform transition-transform ${Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"}`}>
        <h2 className='text-xl mt-2 font-bold text-center '>Shoping Cart</h2>
        <span onClick={togglecart} className='absolute top-5 right-2 cursor-pointer text-blue-500 text-2xl'><i className="bi bi-x-circle-fill"></i></span>
        <ol className='list-decimal font-semibold z'>
          {Object.keys(cart).length == 0 &&
            <div className='my-5 font-semibold'>Cart is empty! Add few items to Checkout</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex  my-5">
                <div className="w-2/3 font-semibold ">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i className="bi bi-dash-circle-fill cursor-pointer text-blue-500 " onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></i><span className='mx-2 text-sm'>{cart[k].qty}</span><i className="bi cursor-pointer text-blue-500 bi-plus-circle-fill" onClick={() => { addToCart("slug", 1, 499, "Hoodeis", "xl", "Green") }}></i></div>
              </div>
            </li>

          })}
        </ol>
        <div className='font-bold my-2'>SubTotal : <i className="bi bi-currency-rupee"></i>{subTotal}</div>
        <div className="flex">

          <Link to='/Checkout' onClick={togglecart}><button className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"><i className="bi bi-bag-check-fill mx-1"></i> Checkout</button></Link>
          <button onClick={clearCart} className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm">Clear Cart</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
