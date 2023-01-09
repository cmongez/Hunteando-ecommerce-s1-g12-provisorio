import React, { useState } from 'react';
import carritoVacio from '../assets/carritoVacio.png';
import { Link } from 'react-router-dom';
import '../css/cart.css';
import CartForm from '../components/CartForm';
import { BsTrash } from 'react-icons/bs';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decreaseCart, clearCart } from '../features/cart/cartSlice.js';

const Cart = () => {
  const [mostrar, setMostrar] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { cartTotalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const removeItem = (product) => {
    dispatch(removeFromCart(product));
    setMostrar(!mostrar);
    setTimeout(() => {
      setMostrar(false);
    }, 1000);
  };
  const increaseItem = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  const decreaseItem = (product) => {
    dispatch(decreaseCart({ product }));
  };
  const removeAllItem = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container  mb-2">
      <div className="container">
        {cart.length === 0 ? (
          <div className="cart">
            <img className="cart-img" src={carritoVacio} alt="carrito vacio" />
            <h1>CARRITO VACIO</h1>
            <Link to={'/products'}>
              <button className="cart-button">Ir a comprar...</button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <h1 className="text-center my-5">DETALLES DE SU COMPRA</h1>

            <div className="">
              <h2 className="text-center">PRODUCTOS</h2>

              <table className="table td-border-none ">
                <thead className="td-border-none">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Título</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>

                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody className="td-border-none">
                  {cart.map((item, index) => (
                    <tr className="shadow rounded td-border-none" key={index}>
                      <th scope="row">
                        <img
                          className="logoTable"
                          alt="articulo"
                          src={item.IMAGEN ? item.IMAGEN : require('../assets/no-disponible.png')}
                        />
                      </th>
                      <td>{item.NOMBRE_PRODUCTO}</td>
                      <td>${item.PRECIO_VENTA}</td>
                      <td>
                        <div className="cart-buttons-container">
                          <button className="cart-button" onClick={() => decreaseItem(item)}>
                            -
                          </button>
                          <span className="px-2 ">{item.cartQuantity}</span>
                          <button className="cart-button" onClick={() => increaseItem(item)}>
                            +
                          </button>
                        </div>
                      </td>

                      <td className="position-relative">
                        ${item.cartQuantity * item.PRECIO_VENTA}
                        <div
                          onClick={() => removeItem(item)}
                          className="d-flex justify-content-center align-tems-center p-1 text-danger fw-semibold position-absolute top-0 start-72"
                        >
                          <BsTrash />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="cart-button" onClick={() => removeAllItem()}>
                Vaciar
              </button>
              <span className="fw-bold ms-2">Precio total: </span>
              <span>${cartTotalAmount}</span>
            </div>

            <CartForm orden={cart} total={cartTotalAmount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
