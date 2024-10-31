import Hero3 from "../assets/img/fot.webp";
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
const Product = () => {
  const setProduct = useStore((state) => state.setProduct);
  const product = useStore((state) => state.product);
  
  const navigate = useNavigate();
  const en = useStore((state) => state.en);
  const [cart, setCart] = useState(() => {
    // Retrieve the cart from localStorage if it exists
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
    navigate('/cart');
  };


useEffect(() => {

  async function fetchProduct() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Product`;

    const response = await fetch(allRides, {
      method: "GET",  
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setProduct(data.data);
     console.log(data.data ,"dmdd");
     setLoading(false);
   
    } else {
      setLoading(false);
      return;
    }
  }
  fetchProduct();
}, []);

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className=" border-secondary border-dotted spinner-border animate-spin inline-block text-secondary w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
        <h2 className="mt-2 text-4xl font-semibold display-1 text-secondary">Fetching Products...</h2>
      </div>
    </div>
  );
}

return (
    <>
<div
  className="bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${Hero3})`,
  }}
>
  <div className="container mx-auto py-20">
    <div className="text-center max-w-4xl mx-auto">
    <h4 className="mb-4 inline-block p-2 border-b-4 border-color1 -500 text-color1 -600   text-lg rounded-l-3xl rounded-r-md">
              {en ? "Our Products" : "program"}
            </h4>
      <h1 className="mb-10 text-6xl display-1 text-[#d4aa3b] font-bold">
        Our Product
      </h1>
    </div>
    <div className="text-center text-lg border-2 border-secondary rounded-3xl p-4 w-fit mx-auto mb-10">
      <p className="mb-2">For customers outside the United States:</p>
      <p className="mb-4">Please use our Etsy shop to make your purchase.</p>
      <a 
        href="https://www.etsy.com/shop/Mnhar369" 
        className="text-blue-500 hover:text-blue-700 transition-colors duration-300 underline display-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit our Etsy Shop
      </a>
    </div>
    <div className="flex flex-wrap gap-10 justify-center -mx-4">
      {currentItems.map((items) => (
        <div key={items.id} className="p-4 w-[24rem] card">
          <div className="rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"> 
            <div className="relative">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${items.image}`}
                  alt="Product"
                  className="object-cover  w-full h-72  transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="absolute right-4 top-4 px-3 py-1 rounded-3xl border-4 bg-secondary border-dotted border-white text-xl bg-secondary-600 text-white font-semibold">
                ${items.price}
              </div>
            </div>
            <div className="p-4 h-32">
              <a href="#" className="text-2xl font-semibold display-1 text-secondary-600 transition-colors duration-300 truncate overflow-hidden block" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                {items.name}
              </a>
              <p className="mt-2 text-gray-600">
                {items.description.substring(0, 70)}...
              </p>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
              <Link
                to="/detailpro"
                state={{ items: items }}
                className="bg-color1 -500 hover:bg-primary-600 display-1 text-white rounded-lg px-6 py-2 transition-colors duration-300"
                onClick={() => window.scrollTo(0, 0)}
              >
                See More
              </Link>
              <button
                onClick={() => addToCart(items)}
                className="bg-secondary -500 hover:bg-secondary-600 display-1 text-white rounded-lg px-6 py-2 transition-colors duration-300"
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-8">
      {Array.from({ length: Math.ceil(product.length / itemsPerPage) }, (_, i) => (
        <button key={i + 1} onClick={() => paginate(i + 1)} className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}>
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
