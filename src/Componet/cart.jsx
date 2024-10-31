import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useStore from '../store/store';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItems, setTotalItems } = useStore(); // useStore to track total number of items in the cart
  useEffect(() => {
    setIsLoading(true);
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setTotalItems(parsedCart.reduce((acc, item) => acc + item.quantity, 0)); // Calculate total items
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`Total items in cart: ${totalItems}`); // Console log the total number of items
  }, [totalItems]);

  const handleCheckoutClick = () => {
    const namesAndQuantities = cartItems.map((item) => `${item.name}.${item.quantity}`).join(',');
    setName(namesAndQuantities);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setTotalItems(updatedCart.reduce((acc, item) => acc + item.quantity, 0)); // Update total items
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const addQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    setTotalItems(updatedCart.reduce((acc, item) => acc + item.quantity, 0)); // Update total items
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const subtractQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    setTotalItems(updatedCart.reduce((acc, item) => acc + item.quantity, 0)); // Update total items
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    const namesAndQuantities = cartItems.map((item, index) => `${index + 1}. ${item.name} . . Qty: ${item.quantity}/`).join('\n');
    setName(namesAndQuantities);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);


  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  
  if (isLoading) {
    return (
      <div className="cart min-h-[70vh] flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
        <div className="text-center p-10">
          <i className="fa fa-spinner fa-spin fa-3x text-secondary mb-4"></i>
          <h2 className="text-lg text-secondary font-semibold animate-pulse">
            Loading your cart...
          </h2>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart min-h-[70vh] flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
        <div className="text-center p-10">
          <i className="fa fa-shopping-cart fa-3x text-gray-400 mb-4"></i>
          <p className="text-lg text-gray-600 ">
            Your cart is currently empty.
          </p>
          <p className="text-sm text-gray-500 ">
            Looks like you haven't made your choice yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-2xl min-h-screen max-w-8xl">
      <h2 className="text-5xl font-bold text-center mb-8 text-secondary shadow-secondary  display-1 border py-6 rounded-xl shadow-md "> <i class="fa-solid fa-cart-shopping "></i>  Your Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-2 bg-white rounded-lg shadow-lg border p-8 space-y-6">
          <h3 className="text-3xl font-semibold mb-4 text-center text-secondary display-1">Your Items</h3>
          <ul className="space-y-6">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-6 bg-gray-50 rounded-lg shadow">
                <div>
                  <h4 className="text-2xl font-semibold mb-1">{item.name}</h4>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => addQuantity(item.id)}
                      className="p-2 px-4 bg-green-100 text-green-700 rounded-full"
                    >
                      +
                    </button>
                    <span className="text-xl">{item.quantity}</span>
                    <button
                      onClick={() => subtractQuantity(item.id)}
                      className="p-2 px-4 bg-red-100 text-red-700 rounded-full"
                    >
                      -
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Price: ${item.price}, Total: <span className="text-red-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-lg transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-10 w-full space-y-6 border">
          <h3 className="text-4xl font-bold mb-5 text-center text-secondary display-1">Order Summary</h3>
          <p className="text-xl my-8 font-bold shadow p-4">
            <i class="fa-solid fa-money-bill-wave"></i> Total Price: <span className="text-red-600 font-extrabold text-2xl px-4 py-3 rounded-full">${calculateTotal()}</span>
          </p>

          <div className='py-6 my-6 w-full flex justify-center'>
          <Link
            to="/Shipping"
            state={{
              id: '1',
              name: name,
              price: totalPrice,
            }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold px-8 py-4 rounded-full transition duration-300 ease-in-out text-center shadow-xl"
          >
            Proceed to Checkout
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
