import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';

function Navbar() {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { totalItems } = useCart();

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {
                            open ?
                                <button onClick={() => setOpen(!open)} className="md:hidden rounded-xl bg-white px-2 py-1 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 cursor-pointer">
                                    <RxCross2 className='text-xl' />
                                </button>
                                :
                                <button onClick={() => setOpen(!open)} className="md:hidden rounded-xl bg-white px-2 py-1 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 cursor-pointer">
                                    <IoMenu className='text-xl' />
                                </button>
                        }
                        <Link to="/">
                            <h2 className='text-lg uppercase font-bold'><span className='text-purple-700'>Swift</span>Cart</h2>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link to="/" className={`inline-block rounded-lg px-2 py-1 text-md font-medium ${location.pathname == "/" ? "text-purple-700 hover:text-purple-700" : "text-gray-900 hover:text-gray-900"} transition-all duration-200 hover:bg-gray-100`}>
                            Home
                        </Link>
                        <Link to="/cart" className={`inline-block rounded-lg px-2 py-1 text-md font-medium ${location.pathname == "/cart" ? "text-purple-700 hover:text-purple-700" : "text-gray-900 hover:text-gray-900"} transition-all duration-200 hover:bg-gray-100`}>
                            Go to cart
                        </Link>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <Link to="/cart" className="items-center justify-center rounded-xl bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-100 sm:inline-flex">
                            <FiShoppingCart className='text-purple-700 text-lg' /><span className='hidden sm:inline-flex mx-1'> &nbsp;Cart</span>
                            {
                                totalItems ?
                                <span className="flex items-center justify-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-purple-600 text-xs font-medium h-5 w-5 rounded-full">
                                    <span>{totalItems}</span>
                                </span>
                                :
                                <></>
                            }
                        </Link>
                    </div>
                </div>

                <div
                    className={`grid transition-all duration-300 ease-in-out md:hidden ${open
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                >
                    <div className="overflow-hidden">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li onClick={() => setOpen(false)}>
                                <Link to="/" className={`${location.pathname == "/" ? "block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white" : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"}`}>
                                    Home
                                </Link>
                            </li>
                            <li onClick={() => setOpen(false)}>
                                <Link to="/cart" className={`${location.pathname == "/cart" ? "block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white" : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"}`}>
                                    Go to cart
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </header>
    )
}

export default Navbar