import React from 'react'
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from '../types/product';

function Cart() {
  const { cart, dispatch, totalValue, totalItems } = useCart();

  const removeFromCart = (id: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    })
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >

      <main className='pt-20'>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            {
              cart?.length > 0 ?
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                      <AnimatePresence>
                        {
                          cart?.map((item: Product) => {
                            return <motion.div
                              layout
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: 100 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{ y: -5 }}
                            >

                              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                  <img className="h-20 w-20 dark:hidden" src={item?.images[0]} alt={item.title} />


                                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                                    <div className="text-end md:order-4 md:w-32">
                                      <p className="text-base font-bold text-gray-900 dark:text-white">${item?.price}</p>
                                    </div>
                                  </div>

                                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                    <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item?.title}</p>

                                    <div className="flex items-center gap-4 mt-4">
                                      <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="button"
                                        onClick={() => removeFromCart(item?.id)}
                                        className="cursor-pointer inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                        Remove
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                          })
                        }
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total items</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white"><span data-testid="cart-count">
                              {totalItems}
                            </span></dd>
                          </dl>

                          {/* <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">-$299.00</dd>
                    </dl> */}

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Amount</dt>
                            <motion.dd
                              key={totalValue}
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <dd className="text-base font-medium text-gray-900 dark:text-white">${totalValue}</dd>
                            </motion.dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$5</dd>
                          </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                          <dd className="text-base font-bold text-gray-900 dark:text-white">${(totalValue + 5).toFixed(2)}</dd>
                        </dl>
                      </div>

                      <button className="flex w-full items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                        <Link to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                          Continue Shopping
                          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No items found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Please add some items
                  </p>
                </div>
            }
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default Cart