import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import { motion } from 'framer-motion';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItems, setTotalItems } = useStore();

  useEffect(() => {
    const loadCart = () => {
      setIsLoading(true);
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        setTotalItems(parsedCart.reduce((acc, item) => acc + item.quantity, 0));
      }
      setIsLoading(false);
    };

    loadCart();
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    setTotalItems(newCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    updateCart(updatedCart);
  };

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const itemsList = cartItems
      .map((item, idx) => `${idx + 1}. ${item.name} . . Qty: ${item.quantity}/`)
      .join('\n');
    setName(itemsList);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[70vh] flex justify-center items-center bg-gray-50"
      >
        <div className="text-center p-10">
          <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"/>
          <h2 className="text-xl text-gray-700 font-medium">Loading your cart...</h2>
        </div>
      </motion.div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex flex-col justify-center items-center bg-gray-50 p-8"
      >
        <div className="text-center space-y-4">
          <i className="fas fa-shopping-cart text-5xl text-gray-400"/>
          <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500">Start shopping to add items to your cart</p>
          <Link 
            to="/product"
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <i className="fas fa-trash"/>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <hr/>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <Link
              to="/Shipping"
              state={{ id: '1', name, price: totalPrice }}
              className="block w-full py-4 px-6 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mt-8"
            >
              Proceed to Checkout
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
