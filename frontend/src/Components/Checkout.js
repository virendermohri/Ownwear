import React from 'react'
import { Link } from 'react-router-dom'
const Checkout = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  return (
    <div className='container px-2 py-3 md:px-10 mx-auto '>
      <h1 className='font-bold text-center my-8 text-3xl'>Checkout</h1>
      <h className='text-xl font-bold '>1. Delivery Details</h>
      <div className="mx-aouto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label for="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" name="" cols='30' row='10' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-aouto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="city" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-aouto flex my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="state" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="pincode" minLength={6} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h className='text-xl font-bold '>2. Review Cart Items & Pay</h>
      <div className=" sidecart bg-blue-100 p-6 mt-4 mb-4 ">
        <ol className='list-decimal font-semibold '>
          {Object.keys(cart).length == 0 &&
            <div className='my-5 font-semibold'>Cart is empty! Add few items to Checkout</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex  my-3">
                <div className=" font-semibold ">{cart[k].name}</div>
                <div className=" flex font-semibold items-center justify-center w-1/2 text-lg"><i className="bi bi-dash-circle-fill cursor-pointer text-blue-500 " onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }}></i><span className='mx-2 text-sm'>{cart[k].qty}</span><i className="bi cursor-pointer text-blue-500 bi-plus-circle-fill" onClick={() => { addToCart("slug", 1, 499, "Hoodeis", "xl", "Green") }}></i></div>
              </div>
            </li>
          })}
        </ol>
        <span className='font-bold'>SubTotal : <i className="bi bi-currency-rupee"></i>{subTotal}</span>
      </div>
      <div className="mx-4">

        <button className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"><i className="bi bi-bag-check-fill mx-1"></i> Pay {subTotal}</button>
      </div>
    </div>
  )
}

export default Checkout
