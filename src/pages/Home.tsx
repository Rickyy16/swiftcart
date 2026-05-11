import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import ProductList from '../components/ProductList'
import { getCategories } from '../api/categoryApi';
import { CgArrowsShrinkV } from "react-icons/cg";
import { getProducts } from '../api/productApi';
import type { Product } from '../types/product';
import type { Category } from '../types/category';
import { AnimatePresence, motion, useInView } from 'framer-motion';

function Home() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const selections = useMemo(() => {
    const Params = searchParams.get('categories');
    return Params ? Params.split(',') : [];
  }, [searchParams]);

  const [loading, setLoading] = useState(true);

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  async function fetchCategories() {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);

    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);

    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  const filterSelection = (slug: string) => {
    const newSelections = selections.includes(slug)
      ? selections.filter((item) => item !== slug)
      : [...selections, slug];

    if (newSelections.length > 0) {
      setSearchParams({ categories: newSelections.join(',') });
    } else {
      setSearchParams({});
    }
  }

  const filteredProducts = useMemo(() => {
    if (selections.length === 0) return products;
    return products.filter((product: Product) =>
      selections.includes(product.category.slug)
    );
  }, [selections, products]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [])

  return (
    <>
      <main className='pt-25'>
        <section className="bg-background px-4 py-8 sm:py-12 lg:py-16 lg:px-8 min-h-screen w-screen">

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center mx-auto mb-18 space-y-3">
              <h1 className=" flex space-x-1 justify-center text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
                <AnimatePresence>
                  {"Wear Your Ambition".split('').map((char, i) => (
                    <motion.p
                      ref={ref}
                      key={i}
                      initial={{ opacity: 0, x: -18 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      exit="hidden"
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="text-3xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
                    >
                      {char === ' ' ? <span>&nbsp;</span> : char}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </h1>
              <p className="text-foreground text-base max-w-3xl mx-auto text-balance sm:text-lg">
                You’ve got places to be. We just make sure you look—and feel—like you belong there
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h1 className="capitalize text-3xl md:text-4xl font-semibold col-span-12 mx-10 text-left">Our Products</h1>

            <div className="w-[150px] mx-10 my-5 text-gray-900 dark:text-gray-100">
              <div className="relative w-full group">
                <label className="text-xs text-gray-400">Select Category</label>
                <button className="py-2.5 px-3 w-full md:text-sm text-site bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold">
                  {
                    selections?.length == 0 ?
                      "Not Selected" :
                      `${selections?.length} Selected`
                  }
                  <CgArrowsShrinkV className='text-xl' />
                </button>
                <div
                  className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-purple-100 dark:bg-gray-800  border border-dimmed text-xs md:text-sm">
                  {
                    categories?.map((category: Category) => {
                      return <button
                        key={category.id}
                        type="button"
                        aria-label="Select category"
                        className={`w-full block cursor-pointer ${selections?.includes(category?.slug) ? "text-purple-700" : ""} hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md`}
                        onMouseDown={(e) => (e.preventDefault(), filterSelection(category?.slug))}>
                        {category?.name}
                      </button>
                    })
                  }
                </div>
              </div>
            </div>
            {
              loading ?
                <div className='flex justify-center'>
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-t-transparent"></div>
                </div>
                :
                <ProductList products={filteredProducts} />
            }
          </motion.div>
        </section>
      </main>
    </>
  )
}

export default Home