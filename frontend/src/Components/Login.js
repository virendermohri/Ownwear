import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-full lg:py-5">

                <div className="w-full bg-white rounded-lg shadow   md:py-5 py-auto  sm:max-w-md xl:p-0 ">
                    
                    <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Welcom back
                        </h1>

                        <p>Start  wear your design  in seconds. Don’t have an account? <Link to='/Signup' className='font-medium text-blue-600 hover:underline'>Sign up</Link>.</p>

                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 ">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/Forgot-Password" className="text-sm font-medium text-blue-600 hover:underline ">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center  ">Sign in</button>

                            <div className="flex items-center justify-center ">
                                <hr className='w-1/3 m-0' />
                                <p className='mx-5'>Or </p>
                                <hr className='w-1/3 m-0' />
                            </div>
                            <div className="flex items-center justify-between md:py-3">
                                <button className='w-[48%] flex items-center justify-center  bg-gray-50 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center '><img src="https://pngimg.com/uploads/google/google_PNG19635.png " className='md:w-[15%] w-[25%] mx-1' alt="" />Google</button>
                                <button className='w-[48%] flex items-center justify-center  bg-gray-50 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center '><img src="https://tse1.mm.bing.net/th?id=OIP.pW0TOZyl_OZMIuo5HjUsyQHaIf&pid=Api&P=0&h=180" className='md:w-[12%] w-[20%] mx-1' alt="" />Apple</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
