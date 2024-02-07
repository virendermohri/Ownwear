import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState();
  // eslint-disable-next-line

  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/products/getall`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.tshirts);
        // console.log(data)
      } catch (error) {
        // setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? <div className="container flex items-center justify-center mx-auto h-screen ">
        <img src="1487.gif" alt="" className='md:w-[5%] w-[20%]' />
      </div> :
        <section className="text-gray-600 home  mt-[10px] md:mt-[40px]  body-font">
          <div className="container px-5 py-10 bg-white mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {Object.keys(data).map((product) => {
                return <div key={data[product].title} className="lg:w-1/5 md:w-1/2  p-4 item w-full item shadow-lg m-5">
                  <Link to={`/Slug/?d=${data[product]._id}&i=${data[product].img}&price=${data[product].price}&color=${data[product].color}&size=${data[product].size}&title=${data[product].title}&desc=${data[product].desc}&category=${data[product].category}`}>
                    <img alt="ecommerce" className="m-auto relative   rounded overflow-hidden md:mx-0 h-[30vh] md:h-[36vh] block" src={`${data[product].img}`} />
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{data[product].title}</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                      <p className="mt-1"><i className="bi bi-currency-rupee"></i>{data[product].price}</p>
                      <div className='mt-1'>
                        {data[product].size.includes("S") ? <span className='border border-gray-200 px-2 mx-1 py-1  '>S</span> : ''}
                        {data[product].size.includes("M") ? <span className='border border-gray-200 px-2 mx-1 py-1'>M</span> : ''}
                        {data[product].size.includes("L") ? <span className='border border-gray-200 px-2 mx-1 py-1'>L</span> : ''}
                        {data[product].size.includes("XL") ? <span className='border border-gray-200 px-2 mx-1 py-1'>XL</span> : ''}
                        {data[product].size.includes("XXL") ? <span className='border border-gray-200 px-2 mx-1 py-1'>XXL</span> : ''}


                      </div>

                      <div className="mt-1">

                        {data[product].color.map((e, i) => {
                          return <button key={i} className={`border-2 border-gray-300 mt-1 ml-1 bg-${e}${e == "black"? "" : "-500"} rounded-full w-6 h-6 focus:outline-none`}></button>
                        })}
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

export default Home
