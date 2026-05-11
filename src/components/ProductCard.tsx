
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router";
import type { Product } from "../types/product";
import { useCart } from '../context/CartContext';
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {

  const { cart, dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  };

  return (
    <div className="card">
      <div className="card__shine"></div>
      <div className="card__glow"></div>
      <div className="card__content">
        <Link to={`/product/${product.id}`}>
          <div className="card__badge" data-testid="view-product-btn">
            <BsEye /><span>&nbsp;View</span>
          </div>

          <div className="card__image" data-testid="view-product-btn">
            <img src={product?.images[0] || ""} alt={product?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Link>
        <div className="card__text">
          <p className="card__title">{product?.title}</p>
          {/* <p className="card__description"></p> */}
        </div>
        <div className="card__footer">
          <div className="card__price">${product.price}</div>
          {
            cart?.find((item) => {
              return item?.id == product?.id
            }) ?
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="card__button2"
                disabled
              >
                <span>Added &nbsp;</span>
                <FaCheck />
              </motion.button>
              :
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="card__button"
                onClick={handleAddToCart}>
                <span>Add to Cart &nbsp;</span>
                <FaPlus />
              </motion.button>
          }
        </div>
      </div>
    </div>

  );
}
