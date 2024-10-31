import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import Auth from './Componet/Auth'
import Login from './Componet/Login'
import Navbar from './Componet/Commen/Navbar'
import Footer from './Componet/Commen/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdmissionForm from './Componet/Addmission'
import Home from './Componet/Home'
import Layout from './Componet/Dashboard/layout'
import useStore from './store/store';
import ContactUs from './Componet/Contactus'
import Program from './Componet/Program'
import Testimonial from './Componet/testimonial'
import Events from './Componet/Events'
import About from './Componet/Aboutus'
import Service from './Componet/services'
import Staff from './Componet/staff'
import Why from './Componet/Why'
import Gallery from './Componet/Gallery'
import ProgramModal from './Componet/details'
import Abo from './Componet/About'
import axios from 'axios';
import Partnership from './Componet/Partnership'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Componet/Product'
import ProductModal from './Componet/detailsPro'
import Shipping from './Componet/Shipping'
import Cart from './Componet/cart'
import Special from './Componet/Special'
import Cast from './Componet/cast'
import Rule from './Componet/Rule'
import T404 from './Componet/404'

function App() {
  const [count, setCount] = useState(0)
  const [currentuser, setCurrentUser] = useState(false);
  const { admin, setAdmin, } = useStore();
  const { bg, setBg,en ,setEn } = useStore();

  const [cartItems, setCartItems] = useState([]);
  const {isLoading, setIsLoading} = useStore();
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
    const storedEn = localStorage.getItem('en');
    if (storedEn !== null) {
      setEn(JSON.parse(storedEn));
      console.log(storedEn,"222")
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(true);
    }
  }, [admin]);

  // Scroll to top on route change
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  // Button to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
    <div className='max-w-screen'>
      {isLoading ? (
        <div className='h-screen w-screen max-w-screen flex justify-center items-center bg-black/50'>
          <div className="pulse"></div>
        </div>
      ) : (
        <div className='max-w-screen relative'>
          {bg && (
            <div className='h-full z-20 w-screen flex justify-center items-center bg-black/50 fixed top-[0%] left-0'>
              <h1 className='text-center text-white text-xl font-semibold'> Please wait while we process your request.</h1>
              <div className="loader"></div>
            </div>
          )}
          <Router>
            {!admin && (
              <Navbar />
            )}
            <Routes>
              <Route path="/Admin" element={currentuser ? <Layout /> : <Auth />} />
              <Route path="/Auth" element={<Auth />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add" element={<AdmissionForm />} />
              <Route path="/Contactus" element={<ContactUs />} />
              <Route path="/Testimonial" element={<Testimonial />} />
              <Route path="/programs" element={<Program />} />
              <Route path="/Special" element={<Special />} />
              <Route path="/events" element={<Events />} />
              <Route path="/About" element={<About />} />
              <Route path="/services" element={<Service />} />
              <Route path="/Staff" element={<Staff />} />
              <Route path="/Why" element={<Why />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/details" element={<ProgramModal />} />
              <Route path="/detailpro" element={<ProductModal />} />
              <Route path="/Partner" element={<Partnership />} />
              <Route path="/Abo" element={<Abo />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Shipping" element={<Shipping />} />
              <Route path="/Biography" element={<Cast />} />
              <Route path="/Rule" element={<Rule />} />
              <Route path="*" element={<T404 />} />
            </Routes>
            {!admin && (
              <Footer />
            )}
          </Router>
          <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-secondary hover:bg-secondary/90 rounded-full text-white font-bold py-2 px-4 h-11 w-11">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      )}
      </div>
    </>
  )
}

export default App

