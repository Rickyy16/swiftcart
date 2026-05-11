import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { getProductById } from '../api/productApi';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { FaCheck } from 'react-icons/fa';
import { motion } from "framer-motion";


function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const { cart, dispatch } = useCart();

    const handleAddToCart = () => {
        if (product) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: product,
            });
        }
    };

    async function fetchProductById() {
        try {
            setLoading(true);
            const data = await getProductById(Number(id));
            setProduct(data);

        } catch (error) {
            console.log('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductById();
    }, [id])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <main className='pt-20'>
                <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                    <button type="button" onClick={() => navigate(-1)} className="flex items-center mb-8 mx-10 cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"><FaArrowLeft /><span className='ms-2'>Return</span></button>
                    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                        {
                            loading ?
                                <div className='flex justify-center'>
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-t-transparent"></div>
                                </div>

                                :
                                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full dark:hidden" src={product?.images[0]} alt={product?.title} />
                                    </div>

                                    <div className="mt-6 sm:mt-8 lg:mt-0">
                                        <h1
                                            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                        >
                                            {product?.title}
                                        </h1>
                                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                            <p
                                                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                            >
                                                ${product?.price}
                                            </p>
                                        </div>

                                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                            {
                                                cart?.find((item) => {
                                                    return item?.id == product?.id
                                                }) ?
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        whileHover={{ scale: 1.03 }}
                                                        title=""
                                                        className="text-purple-700 border-1 border-purple-600 cursor-pointer mt-4 sm:mt-0 bg-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 flex items-center justify-center"
                                                        role="button"
                                                        disabled
                                                    >
                                                        <FaCheck />
                                                        &nbsp; Added
                                                    </motion.button>
                                                    :
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        whileHover={{ scale: 1.03 }}
                                                            className="text-white cursor-pointer mt-4 sm:mt-0 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 flex items-center justify-center"
                                                            role="button"
                                                            onClick={handleAddToCart}
                                                        >
                                                            <svg
                                                                className="w-5 h-5 -ms-2 me-2"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                                                />
                                                            </svg>

                                                            Add to cart
                                                    </motion.button>
                                            }
                                        </div>

                                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                                            {product?.description}
                                        </p>
                                    </div>
                                </div>
                        }
                    </div>
                </section>
            </main>
        </motion.div>
    )
}

export default ProductDetail