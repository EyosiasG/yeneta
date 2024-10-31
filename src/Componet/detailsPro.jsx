import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dat from '../assets/img/fot.webp'
import useStore from "../store/store";
import CheckoutButton from './Dashboard/PaymentForm';
import Swal from 'sweetalert2'; // Import Swal from sweetalert2

const ProductModal = () => {
    const location = useLocation();
    const { items } = location.state || {}; // Default to an empty object if state is undefined
    const { en } = useStore();
    const { totalItems, setTotalItems } = useStore();
    const [cart, setCart] = useState(() => {
      // Retrieve the cart from localStorage if it exists
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
          popup: 'Red'
        }
      });// Display success Swal when item is added without confirmation
    };
  
    if (!items) return <div className='h-[90vh]'>Loading...</div>;
  
    return (
      <div className="bg-stone-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg p-4 relative shadow-color1 h-fit min-h-[90vh] md:h-[80vh] z-10 shadow-2xl w-[90vw] bg-cover" style={{ backgroundImage: `linear-gradient(rgba(250,250, 250, 0.6), rgba(255, 255, 255, 0.7)), url(${dat})` }}>
          <h1 className='text-center text-4xl font-bold display-1 text-secondary pb-10'>Description</h1>
          <a href='/' className="absolute top-2 right-2 text-xl font-bold">&times;</a>
          <div className='flex flex-col lg:flex-row w-full justify-around gap-8'>
            <div className=''>
              <iframe
                src={`https://www.youtube.com/embed/${items.video}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full md:w-[30rem] max-w-[40rem] object-contain h-full rounded-lg"
              ></iframe>
            </div>
            <div className='bg-white/60 shadow min-w-[50vw] p-8 flex flex-col justify-around overflow-scroll h-[70vh]'>
              <div>
                <h2 className="text-2xl font-bold text-center mb-4 text-amber-700">{en ? items.name : items.title_am}</h2>
                <h2 className="text-xl font-bold text-center mb-4 text-red-700">${items.price}</h2>
                <p className="text-lg mt-4">{en ? items.description : items.description_am}</p>
              </div>
              <div className="mt-4 w-full flex justify-center">
             
                
              <button   className="inline-block bg-secondary hover:bg-orange-500 btn2 text-white px-6 py-2 text-lg rounded" onClick={() => addToCart(items)}> <i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default ProductModal;
