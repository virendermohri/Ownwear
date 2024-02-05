import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-full lg:py-5">

                <div className="w-full bg-white rounded-lg shadow   md:py-5 py-auto  sm:max-w-md xl:p-0 ">
                    
                    <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Forgot your password
                        </h1>

                        <p>Start wear your design in seconds. Don’t have an account? <Link to='/Sign up' className='font-medium text-blue-600 hover:underline'>Sign up</Link>.</p>

                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                            </div>
                            
                           
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-primary-300 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center  ">Continue</button>

                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default ForgotPassword
