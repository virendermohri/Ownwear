import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Hoodies = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/products/getall?category=Hoodies`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        
        setData(jsonData.cloths)
        
        setLoading(false);
      } catch (error) {
      console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!data ? <div className="container flex items-center justify-center mx-auto h-screen ">
        <img src="1487.gif" alt="" className='md:w-[5%] w-[10%]' />
      </div> :
        <section className="text-gray-600 home  mt-[10px] md:mt-[40px]  body-font">
          <div className="container px-5 py-10 bg-white mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(data).length===0 && <p>Sorry all the Hoodies are currently out of stock. New stock coming soon.</p>}

              {Object.keys(data).map((product) => {
                return <div key={data[product].title} className="lg:w-1/5 md:w-1/2  p-4 item w-full item shadow-lg m-5">
                  <Link to={`/Slug/?slug=${data[product].slug}`}>
                    <a className="block relative   rounded overflow-hidden">
                      <img alt="ecommerce" className="m-auto relative   rounded overflow-hidden md:mx-0 h-[30vh] md:h-[36vh] block" src={`${data[product].img}`} />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{data[product].title}</h2>
                      <p className="mt-1"><i className="bi bi-currency-rupee"></i>{data[product].price}</p>
                      <div className='mt-1'>
                        {data[product].size.includes("S") ? <span className='border border-gray-200 px-2 mx-1 py-1 '>S</span> : ''}
                        {data[product].size.includes("M") ? <span className='border border-gray-200 px-2 mx-1 py-1'>M</span> : ''}
                        {data[product].size.includes("L") ? <span className='border border-gray-200 px-2 mx-1 py-1'>L</span> : ''}
                        {data[product].size.includes("XL") ? <span className='border border-gray-200 px-2 mx-1 py-1'>XL</span> : ''}
                        {data[product].size.includes("XXL") ? <span className='border border-gray-200 px-2 mx-1 py-1'>XXL</span> : ''}


                      </div>

                      <div className="mt-1">
                        {data[product].color.includes("red") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("black") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("green") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("blue") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("yellow") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("pink") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("white") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                        {data[product].color.includes("purple") && <button className={` border-2 border-gray-300 mt-1 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none`}></button>}


                      </div>
                    </div>
                  </Link>
                </div>
              })}

            </div>
          </div>
        </section>}

    </>
  )
}

export default Hoodies
