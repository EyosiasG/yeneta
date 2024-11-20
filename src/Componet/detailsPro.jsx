import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dat from '../assets/img/fot.webp'
import useStore from "../store/store";
import CheckoutButton from './Dashboard/PaymentForm';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = () => {
    const location = useLocation();
    const { items } = location.state || {};
    const { en } = useStore();
    const { totalItems, setTotalItems } = useStore();
    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem("shoppingCart");
      return savedCart ? JSON.parse(savedCart) : [];
    });
    const navigate = useNavigate();

    const addToCart = (item) => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        updatedCart = [...cart, { ...item, quantity: 1 }];
      }
      setCart(updatedCart);
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      setTotalItems(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
      navigate('/cart');
      Swal.fire({
        title: 'Added to Cart!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        customClass: {
          popup: 'animate__animated animate__fadeIn'
        }
      });
    };
  
    if (!items) return (
      <motion.div 
        className='h-screen flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="rounded-full h-16 w-16 border-t-4 border-[#d4aa3b]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute top-6 right-6 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
              
              <div className="p-8">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[#d4aa3b] to-color1 bg-clip-text text-transparent mb-12"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Product Details
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <motion.div 
                    className="rounded-2xl overflow-hidden shadow-lg"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${items.video}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-video"
                    ></iframe>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.h2 
                      className="text-3xl font-bold mb-4 text-gray-800 flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.svg 
                        className="w-8 h-8 text-[#d4aa3b]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </motion.svg>
                      {en ? items.name : items.title_am}
                    </motion.h2>
                    
                    <motion.div 
                      className="flex items-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="text-2xl font-bold text-[#d4aa3b]">
                        ${items.price}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">USD</span>
                    </motion.div>

                    <motion.div 
                      className="prose prose-lg text-gray-600 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <p>{en ? items.description : items.description_am}</p>
                    </motion.div>

                    <motion.button
                      onClick={() => addToCart(items)}
                      className="w-full bg-gradient-to-r from-[#d4aa3b] to-color1 text-white py-4 px-8 rounded-full text-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.div className="flex items-center justify-center gap-3">
                        <motion.svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </motion.svg>
                        Add to Cart
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
};

export default ProductModal;
