import React from 'react'

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-10 md:py-5  mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">Ownwear.com</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id :8946763</h1>
        <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
        <div class="flex mb-4">
          <a class="flex-grow text-center cursor-pointer py-2 text-lg px-1">Description</a>
          <a class="flex-grow text-center cursor-pointer py-2 text-lg px-1">Quantity</a>
          <a class="flex-grow text-center cursor-pointer py-2 text-lg px-1">Item Total</a>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the Code (xl/black)</span>
          <span className="ml-auto text-gray-900">Blue</span>
          <span className="ml-auto text-gray-900">499</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the Code (xl/black)</span>
          <span className="ml-auto text-gray-900">Blue</span>
          <span className="ml-auto text-gray-900">499</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Wear the Code (xl/black)</span>
          <span className="ml-auto text-gray-900">Blue</span>
          <span className="ml-auto text-gray-900">499</span>
        </div>
        
        <div className="flex mt-5">
          <span className="title-font  font-medium text-xl md:text-2xl text-gray-900">SubTotal : $58.00</span>
          <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 md:px-6 px-4 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
          
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
  )
}

export default Order
