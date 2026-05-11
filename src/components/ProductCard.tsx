
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router";
import type { Product } from "../types/product";
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {

  const navigate = useNavigate();
  const { cart, dispatch, totalValue, totalItems } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  };

  const removeFromCart = () => {
    dispatch({ 
      type: 'REMOVE_FROM_CART', 
      payload: Number(product.id)
    })
  };

  return (
    <div className="card">
      <div className="card__shine"></div>
      <div className="card__glow"></div>
      <div className="card__content">
        <div className="card__badge" onClick={() => navigate(`/product/${product?.id}`)}><BsEye /><span>&nbsp;View</span></div>
        <div className="card__image" onClick={() => navigate(`/product/${product?.id}`)}>
          <img src={product?.images[0] || ""} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
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
                <div className="card__button" onClick={removeFromCart}>
                  <span>Added &nbsp;</span>
                  <FaCheck />
                </div>
                :
                <div className="card__button" onClick={handleAddToCart}>
                  <span>Add to Cart &nbsp;</span>
                  <FaPlus/>
                </div>
            }
        </div>
      </div>
    </div>

  );
}
