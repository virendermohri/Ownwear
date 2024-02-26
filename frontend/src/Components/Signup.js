import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  let history = useNavigate();

    const [data, setdata] = useState({ name: "", phone: "", email: "", password: "", cpassword: "" })
    const onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handlesignup = (e) => {
        e.preventDefault();

        const fetchData = async () => {
            try {
                const { name, password, email, phone } = data;
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json",
                    },
                    body: JSON.stringify({ name, phone, email, password })
                });
                const jsonData = await response.json();
                if (!jsonData.success) {
                    toast.error(jsonData.error?jsonData.error:jsonData.errors[0].msg, {
                        position: "top-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        
                    });
                }
                else {
                    localStorage.setItem("token", jsonData.authToken)
                    toast.success('Account created successfuly !', {
                        position: "top-left",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        
                    });
                    setTimeout(() => {
                        
                        history("/")
                    }, 1000);
                }

            } catch (error) {

            }

        };
        // if()
        fetchData()
    }
    return (
        <section className="">
  <ToastContainer
            position="top-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
            <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-full lg:py-5">

                <div className="w-full bg-white rounded-lg shadow   md:py-5 py-auto  sm:max-w-md xl:p-0 ">

                    <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create aacount
                        </h1>

                        <p>Start wear your design in seconds. Have an account? <Link to='/login' className='font-medium text-blue-600 hover:underline'>Login</Link>.</p>

                        <form className="space-y-4 md:space-y-6" onSubmit={handlesignup}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                                <input type="name" name="name" id="name" onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Mahesh" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone</label>
                                <input type="number" name="phone" id="phone"  onChange={onchange} placeholder="12345678" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " maxLength={10} minLength={10} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" onChange={onchange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" onChange={onchange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required minLength={5} />
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                <input type="password" name="cpassword" id="cpassword" onChange={onchange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required minLength={5} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 cursor-pointer">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center  " >Sign up</button>
                            {data.cpassword!="" &&  data.password != data.cpassword?<p className='text-red-700 text-center'>Password dose not match !</p>:""}
                            <div className="flex items-center justify-center ">
                                <hr className='w-1/3 m-0' />
                                <p className='mx-5'>Or </p>
                                <hr className='w-1/3 m-0' />
                            </div>
                            <div className="flex items-center justify-between md:py-3">
                                <button className='w-[48%] flex items-center justify-center  bg-gray-50 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center '><img src="https://pngimg.com/uploads/google/google_PNG19635.png " className='md:w-[15%] w-[20%] mx-1' alt="" />Google</button>
                                <button className='w-[48%] flex items-center justify-center  bg-gray-50 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center '><img src="https://tse1.mm.bing.net/th?id=OIP.pW0TOZyl_OZMIuo5HjUsyQHaIf&pid=Api&P=0&h=180" className='md:w-[12%] w-[15%] mx-1' alt="" />Apple</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
