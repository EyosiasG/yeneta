import Hero3 from "../assets/img/fot.webp";
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
  const setProduct = useStore((state) => state.setProduct);
  const product = useStore((state) => state.product);
  const navigate = useNavigate();
  const en = useStore((state) => state.en);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { totalItems, setTotalItems } = useStore();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
    toast.success('Added to cart successfully!');
    navigate('/cart');
  };

  useEffect(() => {
    async function fetchProduct() {
      const allRides = `${import.meta.env.VITE_API}/api/Product`;

      try {
        const response = await fetch(allRides, {
          method: "GET",  
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === 1) {
          setProduct(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#d4aa3b] border-t-transparent rounded-full animate-spin"></div>
          <h2 className="mt-6 text-4xl font-bold text-[#d4aa3b] animate-pulse">Loading Products...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent skew-x-12 blur-xl"></div>
      <div className="absolute top-0 -right-20 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent -skew-x-12 blur-xl"></div>
     
     
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="relative inline-block">
              <h4 className="inline-block px-8 py-3 bg-color1/20 text-color1 text-xl rounded-full shadow-xl mb-8 transform hover:scale-105 transition-all duration-300">
                {en ? "Our Products" : "program"}
              </h4>
            </div>
            <h1 className="text-6xl md:text-7xl display-1 font-bold bg-gradient-to-r from-[#d4aa3b] to-color1 bg-clip-text text-transparent mb-10 animate-gradient">
              Our Product Collection
            </h1>
            
            <div className="bg-white relative shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-color1/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-color1/20 to-transparent ro" />
              <p className="text-xl text-gray-700 mb-4 font-medium">For customers outside the United States:</p>
              <p className="text-xl text-gray-700 mb-8">Please use our Etsy shop to make your purchase.</p>
              <a 
                href="https://www.etsy.com/shop/Mnhar369" 
                className="inline-block bg-gradient-to-r from-[#d4aa3b] to-color1 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit our Etsy Shop
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {currentItems.map((items) => (
              <div key={items.id} className="transform hover:-translate-y-3 transition-all duration-500">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl group">
                  <div className="relative">
                    <div className="h-[300px]"> {/* Fixed height container */}
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}/${items.image}`}
                        alt={items.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-6 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-all duration-300">
                      <span className="text-2xl font-bold text-[#d4aa3b]">${items.price}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-[#d4aa3b] transition-colors duration-300">
                      {items.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 line-clamp-2">
                      {items.description}
                    </p>
                    
                    <div className="flex justify-between items-center gap-6">
                      <Link
                        to="/detailpro"
                        state={{ items: items }}
                        className="flex-1 bg-gradient-to-r from-color1 to-[#d4aa3b] text-white text-center py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(items)}
                        className="flex-1 bg-gradient-to-r from-[#d4aa3b] to-color1 text-white text-center py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16 gap-3">
            {Array.from({ length: Math.ceil(product.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-[#d4aa3b] to-color1 text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
