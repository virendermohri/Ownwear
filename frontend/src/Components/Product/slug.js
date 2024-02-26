import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ cart, buynow, addToCart, removeFormCart, subTotal, clearCart }) => {
  const urlParams = new URLSearchParams(window.location.search);

  const [color, setColor] = useState()
  const [slug, setSlug] = useState(urlParams.get("slug"))
  const [variants, setData] = useState();
  const [size, setSize] = useState("")
  const [json, setjson] = useState()
  const [img, setimg] = useState()
  const [like, setlike] = useState(false)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/products/slug?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setTimeout(() => {

          setColor(jsonData.product.color);
          setSize(jsonData.product.size);
          setData(jsonData.variants);
          setjson(jsonData);
          setimg(jsonData.product.img)
          setLoading(false);

        }, 100);
      } catch (error) {
        setLoading(false);

      }

    };
    fetchData();
  }, []);
  const refrshvariants = (newsize, newcolor) => {

    let url = `http://localhost:3000/slug?slug=${variants[newcolor][newsize]['slug']}`
    window.location = url;
  }



  const handlwishlist = async () => {
    let slug1 = variants[color][size].slug
    console.log(slug1)
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/products/Add-wishlist`, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ slug: slug1 })
    });
    const json = await response.json();
    if (json.success) {
      setlike(true);
    } else {
      setlike(true)
    }

  }
  const addToast = () => {
    toast.success('Adding to Cart successfuly !', {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
      });
  }
  return (
    <>
      {loading ? <div className="container  flex items-center justify-center h-screen mx-auto ">
        < img src="/1487.gif" alt="" className='md:w-[4%] w-[10%]' />
      </div > :
        <section className="text-gray-600 body-font   mb-[30px]  overflow-hidden">
          <ToastContainer
            position="top-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
           
          />
          <div className="container px-5 py-10   mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto  px-10 md:px-24  object-cover object-top rounded" src={`../${json.product.img}`} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{urlParams.get("title")}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{json.product.title} ({size}/{color})</h1>
                {/* <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>  */}
                <p className="leading-relaxed">{json.product.desc}</p>
                <div className="flex mt-6 items-center pb-5 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    {Object.keys(variants).includes("white") && <button onClick={() => {
                      refrshvariants(size, "white")
                    }} className={`border-2  ${color === "white" ? "border-black " : "border-gray-300"} ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "red")
                    }} className={`border-2  ${color === "red" ? " border-black " : "border-gray-300"} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("yellow") && Object.keys(variants['yellow']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "yellow")
                    }} className={`border-2  ${color === "yellow" ? " border-black " : "border-gray-300"} ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("pink") && Object.keys(variants['pink']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "pink")
                    }} className={`border-2  ${color === "pink" ? " border-black " : "border-gray-300"} ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "green")
                    }} className={`border-2  ${color === "green" ? " border-black " : "border-gray-300"} ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("purple") && Object.keys(variants['purple']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "purple")
                    }} className={`border-2  ${color === "purple" ? " border-black " : "border-gray-300"} ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "black")
                    }} className={`border-2  ${color === "black" ? " border-red-700 " : "border-gray-300"} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                    {Object.keys(variants).includes("blue") && Object.keys(variants['blue']).includes(size) && <button onClick={() => {
                      refrshvariants(size, "blue")
                    }} className={`border-2  ${color === "blue" ? " border-black " : "border-gray-300"} ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}



                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select value={size} onChange={(e) => refrshvariants(e.target.value, color)} className="rounded border appearance-none  border-gray-300   py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">

                        {Object.keys(variants[color]).includes("S") && <option value={"S"}>S</option>}
                        {Object.keys(variants[color]).includes("M") && <option value={"M"}>M</option>}
                        {Object.keys(variants[color]).includes("L") && <option value={"L"}>L</option>}
                        {Object.keys(variants[color]).includes("XL") && <option value={"XL"}>XL</option>}
                        {Object.keys(variants[color]).includes("XXL") && <option value={"XXL"}>XXL</option>}

                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex  items-center">
                  <span className="title-font font-medium text-2xl text-gray-900"><i className="bi bi-currency-rupee"></i>{json.product.price}</span>

                  <button onClick={() => buynow(variants[color][size].slug, 1, 499, json.product.title, size, color)} className="flex ml-5 text-white bg-blue-500 border-0 py-2 md:px-6 px-4 focus:outline-none hover:bg-blue-600 rounded">Buy</button>
                  <button onClick={() => {
                    addToast()
                    addToCart(variants[color][size].slug, 1, 499, json.product.title, size, color)
                  }} className="flex md:ml-4  ml-3 text-white bg-blue-500 border-0 py-2 px-3 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Add to Cart</button>
                  {like ? <button className="rounded-full w-10 h-10  text-red-700 bg-gray-100 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" onClick={handlwishlist}>
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24" >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button> :
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" onClick={handlwishlist}>
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24" >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>}
                </div>
              </div>
            </div>
          </div>
        </section>}
    </>

  )
}

export default Slug
