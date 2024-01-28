import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = () => {
  let location = useLocation();
const togglecart=()=>{
  if(ref.current.classList.contains('translate-x-full')){
    ref.current.classList.remove('translate-x-full')
    ref.current.classList.add('translate-x-0')
  }
  else if(!ref.current.classList.contains('translate-x-full')){
    ref.current.classList.add('translate-x-full')
    ref.current.classList.remove('translate-x-0')
  }
}
const ref=useRef()
  return (
    <>

      <div className="pt-3 navbar md:pb-3 pb-2 fixed top-0 w-full z-40  flex body-font  bg-white  items-center md:shadow-lg md:shadow-md md:mb-3   ">
        <div className="logo mx-3  ">
          <Link to='/'>

            <img src="logo.png" className='' width={200} height={40} alt="" />
          </Link>
        </div>
        <div className="nav   ">
          <ul className='flex items-center '>
            <Link className={`${location.pathname === '/Tshirts' ? "active-nav" : ""}`} to="/Tshirts"><li>Tshirts</li></Link>
            <Link className={`${location.pathname === "/Hoodies" ? "active-nav" : ""}`} to="/Hoodies"><li>Hoodies</li></Link>
            <Link className={`${location.pathname === "/Shoes" ? "active-nav" : ""}`} to="/Shoes"><li>Shoes</li></Link>
            <Link className={`${location.pathname === "/Jewellery" ? "active-nav" : ""}`} to="/Jewellery"><li>Jewellery</li></Link>
          </ul>
        </div>
        <div className="mx-2 md:mx-5 flex gap-2 md:gap-4 absolute right-0">
          <div className="  ">
            <Link to='Login ' className='login-btn'>Login</Link>
          </div>
          <button onClick={togglecart}  className='bg-white  flex cart-btn text-black'><i className="bi mx-2 bi-cart4"></i><p className='cart-text'> Cart</p></button>
        </div>
      </div>
      <div className="nav2  pb-2  fixed top-[62px] w-full z-40 shadow-md mb-2 ">
        <ul className='flex justify-center  items-center '>
          <Link className={`${location.pathname === '/Tshirts' ? "active-nav" : ""}`} to="/Tshirts"><li>Tshirts</li></Link>
          <Link className={`${location.pathname === "/Hoodies" ? "active-nav" : ""}`} to="/Hoodies"><li>Hoodies</li></Link>
          <Link className={`${location.pathname === "/Shoes" ? "active-nav" : ""}`} to="/Shoes"><li>Shoes</li></Link>
          <Link className={`${location.pathname === "/Jewellery" ? "active-nav" : ""}`} to="/Jewellery"><li>Jewellery</li></Link>
        </ul>
      </div>
      <div ref={ref} className="w-72  h-full z-50 sidecart fixed top-0 bg-blue-100  right-0 px-8 py-10 shadow-2xl transform transition-transform translate-x-full">
       <h2 className='text-xl mt-2 font-bold text-center'>Shoping Cart</h2>
        <span onClick={togglecart} className='absolute top-5 right-2 cursor-pointer text-blue-500 text-2xl'><i class="bi bi-x-circle-fill"></i></span>
        <ol className='list-decimal font-semibold z'>
          <li>
            <div className="item flex  my-5">
              <div className="w-2/3 font-semibold ">Tshirt - Wear the own style Tshirts</div>
              <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i class="bi bi-dash-circle-fill cursor-pointer text-blue-500 "></i><span className='mx-2 text-sm'>1</span><i class="bi cursor-pointer text-blue-500 bi-plus-circle-fill"></i></div>
            </div>
          </li>
          <li>
            <div className="item flex  my-5">
              <div className="w-2/3 font-semibold ">Tshirt - Wear the own style Tshirts</div>
              <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i class="bi bi-dash-circle-fill cursor-pointer text-blue-500 "></i><span className='mx-2 text-sm'>1</span><i class="bi cursor-pointer text-blue-500 bi-plus-circle-fill"></i></div>
            </div>
          </li>
          <li>
            <div className="item flex  my-5">
              <div className="w-2/3 font-semibold ">Tshirt - Wear the own style Tshirts</div>
              <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i class="bi bi-dash-circle-fill cursor-pointer text-blue-500 "></i><span className='mx-2 text-sm'>1</span><i class="bi cursor-pointer text-blue-500 bi-plus-circle-fill"></i></div>
            </div>
          </li>
          <li>
            <div className="item flex  my-5">
              <div className="w-2/3 font-semibold ">Tshirt - Wear the own style Tshirts</div>
              <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i class="bi bi-dash-circle-fill cursor-pointer text-blue-500 "></i><span className='mx-2 text-sm'>1</span><i class="bi cursor-pointer text-blue-500 bi-plus-circle-fill"></i></div>
            </div>
          </li>
          <li>
            <div className="item flex  my-5">
              <div className="w-2/3 font-semibold ">Tshirt - Wear the own style Tshirts</div>
              <div className="w-1/3 flex font-semibold items-center justify-center  text-lg"><i class="bi bi-dash-circle-fill cursor-pointer text-blue-500 "></i><span className='mx-2 text-sm'>1</span><i class="bi cursor-pointer text-blue-500 bi-plus-circle-fill"></i></div>
            </div>
          </li>
        </ol>
        <button class="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-sm"><i class="bi bi-bag-check-fill mx-1"></i> Checkout</button>
      </div>
    </>
  )
}

export default Navbar
