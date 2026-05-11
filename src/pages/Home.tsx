import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import ProductList from '../components/ProductList'
import { getCategories } from '../api/categoryApi';
import { CgArrowsShrinkV } from "react-icons/cg";
import { getProducts } from '../api/productApi';
import type { Product } from '../types/product';
import type { Category } from '../types/category';

function Home() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const selections = useMemo(() => {
    const Params = searchParams.get('categories');
    return Params ? Params.split(',') : [];
  }, [searchParams]);

  const [loading, setLoading] = useState(true);

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
      ? selections.filter((item: any) => item !== slug)
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
        <div className="bg-background px-4 py-8 sm:py-12 lg:py-16 lg:px-8 min-h-screen w-screen">

          <div className="text-center mx-auto mb-18 space-y-3">
            <h1 className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Step Into Style
            </h1>
            <p className="text-foreground text-base max-w-3xl mx-auto text-balance sm:text-lg">
              Discover our latest collection of premium sneakers — comfort, design,
              and performance in every pair.
            </p>
          </div>

          <h1 className="capitalize text-5xl font-semibold col-span-12 mx-10 text-center md:text-left">Our Products</h1>

          <div className="w-[150px] mx-auto md:mx-10 my-5 text-gray-900 dark:text-gray-100">
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
                    return <div
                      key={category?.id}
                      className={`w-full block cursor-pointer ${selections?.includes(category?.slug) ? "text-purple-700" : ""} hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md`}
                      onMouseDown={(e) => (e.preventDefault(), filterSelection(category?.slug))}>
                      {category?.name}
                    </div>
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
        </div>
      </main>
    </>
  )
}

export default Home