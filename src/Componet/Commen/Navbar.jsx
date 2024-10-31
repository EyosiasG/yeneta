import React, {useState , useEffect}   from 'react';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo1.webp';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const { totalItems,setCartItemCountsetAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  const setEn = useStore((state) => state.setEn);
  const en = useStore((state) => state.en);
 
 
  const cat = () => {
    setEn(!en)
    localStorage.setItem('en', !en);
  };


  useEffect(() => {
    if (a_Contactus.length > 0) {
      setEmail(a_Contactus[0].email);
      setPhone(a_Contactus[0].phone);
      setLocation(a_Contactus[0].address);
    }
  }, [a_Contactus]);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar toggle
  


  const toggleNav = () => setIsNavOpen(!isNavOpen); // Function to toggle navbar for small screens

  

  return (
    < >

      
    
   { en ? ( <div className='bg-White  '>
      {/* Navbar start */}
      <div className=" border-b border-color1 -800 w-full ">
      
        
        <div className=' flex justify-center'>
        <div className="lg:container topbar bg-color1 -800 px-4 lg:px-2 hidden lg:flex py-2 rounded-bl-[40rem] rounded-tr-[40rem] sm:w-screen">
          <div className="flex justify-between items-center">
            <div className="top-info space-x-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-secondary"></i>
                <a href="#" className="text-white text-xs lg:text-sm">11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901</a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-secondary"></i>
                <a href="mailto:info@yenetaschool.com" className="text-white text-sm lg:text-base">info@yenetaschool.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-secondary"></i>
                <a href="mailto:admission@yenetaschool.com" className="text-white text-sm lg:text-base">admission@yenetaschool.com</a>
              </div>
            </div>
            <div className="social-links flex pl-0 lg:pl-9 xl:16 gap-2">
              <a href="https://www.youtube.com/channel/UCxkLnm9J3_rqV8m7UXB3sSw" className="bg-white p-2 rounded-full h-9 w-9 flex justify-center items-center text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-youtube text-secondary"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61558414607277&mibextid=ZbWKwL" className="bg-white p-2 h-9 w-9 flex justify-center items-center rounded-full text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-facebook-f text-secondary"></i>
              </a>
              <a href="https://twitter.com/Yenetaschool" className="bg-white p-2 rounded-full text-color1 h-9 w-9 flex justify-center items-center -300 hover:bg-gray-200">
                <i className="fab fa-twitter text-secondary"></i>
              </a>
              <a href="https://www.instagram.com/yenetalan?igsh=MXVjanM3OTlmN3BzMQ==" className="bg-white p-2 h-9 w-9 flex justify-center items-center rounded-full text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-instagram text-secondary"></i>
              </a>
              <a href="https://t.me/yenetaschool" className="bg-white p-2 rounded-full text-color1 -300 h-9 w-9 flex justify-center items-center hover:bg-gray-200">
                <i className="fab fa-telegram text-secondary"></i>
              </a>
            </div>
          </div>
          </div> 
          </div>


        <div className='flex justify-center items-center '>
      <div className="w-full  w-[100%]  px-10">
        <nav className="flex flex-wrap items-center w-[80%] w-full px-2 gap-8 justify-between py-3">
          <a href="/" className="navbar-brand justify-self-start flex items-center">
          <img src={logo} className='h-24 w-24 ' alt="" />
            <h1 className="text-[darkgreen] w-40 text-5xl py-4 display-1 font-black">YE<span className="text-[orange] font-black">NE</span><span className="text-[red] font-black">TA</span></h1>
          </a>
          {/* Responsive button */}
          <button className="py-2 px-3 text-secondary lg:hidden" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} /> {/* Menu Icon */}
          </button>
          {/* Navbar links */}
          <div className={`${isMobileMenuOpen ? 'flex flex-col' : 'hidden'} lg:flex flex-grow items-center gap-4 text-secondary display-1 text-2xl -900 font-bold justify-center`}>
           <a href="/" className="nav-link          hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md active">Home</a>
          <a href="/about" className="nav-link      hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md active">About</a>
          <a href="/why" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Why Yeneta</a>
          <a href="/Product" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Our Product </a>
          <a href="/programs" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Programs </a>
          <a href="/events" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Events</a>
          <a href="/Contactus" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Contact us  </a>
      
            {/* Dropdown example */}
            <div className="relative">
              <button className="nav-link dropdown-toggle on hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md" onClick={toggleDropdown}>More<FontAwesomeIcon icon="fa-solid fa-angle-down" /></button>
              <div className={`${isDropdownOpen ? 'flex' : 'hidden'} absolute text-sm z-10 bg-white border-x-2 border-color1 -700 flex-col p-3 gap-2 rounded-md mt-1`}>
                <a href="/Staff" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">Our Team</a>
                <a href="/Testimonial" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">Testimonial</a>
                <a href="/services" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">Services </a>
                <a href="/Gallery" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">Gallery</a>
                <a href="/Partner" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">PartnerShip</a>
              </div>
            </div>
          </div>
          {/* Contact info */}
          <div className="flex space-x-4">
            <div className="flex flex-col border-r border-primary pr-3">
              <span className="text-primary text-sm">Have any questions?</span>
              <a href="#" className="text-secondary text-sm"><i class="fas fa-phone"></i> +1 240-374-8205 </a>
            </div>
             {/*
            <button className="rounded-full bg-primary p-2 font-bold border w-16 h-11 border-color1  text-color1 flex flex-row items-center gap-2" onClick={() => cat()}>
          <i class="fa-solid fa-globe "></i>
          <h1 className='font-semibold'>አማ</h1>
          </button>
        */}
          <a href="/Cart" className="relative  bg-primary p-3 font-bold  text-2xl w-14 h-14  text-secondary flex justify-center items-center">
            <i class="fa-solid fa-cart-shopping"></i>
            <span className="absolute top-0 right-0 bg-yellow-600 text-white rounded-full flex justify-center h-6 w-6 px-1 py-1 text-xs">{totalItems}</span>
          </a>
          </div>
        </nav>
      </div>
    </div>
            </div>
</div>

   ):(
    <div className='bg-White  '>
    {/* Navbar start */}
    <div className=" border-b border-color1 -800 w-full ">
    
      
      <div className=' flex justify-center'>
      <div className="lg:container topbar bg-color1 -800 px-4 lg:px-2 hidden lg:flex py-2 rounded-bl-[40rem] rounded-tr-[40rem] sm:w-screen">
          <div className="flex justify-between items-center">
            <div className="top-info space-x-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-secondary"></i>
                <a href="#" className="text-white text-xs lg:text-sm">11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901</a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-secondary"></i>
                <a href="mailto:info@yenetaschool.com" className="text-white text-sm lg:text-base">info@yenetaschool.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-secondary"></i>
                <a href="mailto:admission@yenetaschool.com" className="text-white text-sm lg:text-base">admission@yenetaschool.com</a>
              </div>
            </div>
       
            <div className="social-links flex pl-0 lg:pl-9 xl:16 gap-2">
              <a href="https://www.youtube.com/channel/UCxkLnm9J3_rqV8m7UXB3sSw" className="bg-white p-2 rounded-full h-9 w-9 flex justify-center items-center text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-youtube text-secondary"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61558414607277&mibextid=ZbWKwL" className="bg-white p-2 h-9 w-9 flex justify-center items-center rounded-full text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-facebook-f text-secondary"></i>
              </a>
              <a href="https://twitter.com/Yenetaschool" className="bg-white p-2 rounded-full text-color1 h-9 w-9 flex justify-center items-center -300 hover:bg-gray-200">
                <i className="fab fa-twitter text-secondary"></i>
              </a>
              <a href="https://www.instagram.com/yenetalan?igsh=MXVjanM3OTlmN3BzMQ==" className="bg-white p-2 h-9 w-9 flex justify-center items-center rounded-full text-color1 -300 hover:bg-gray-200">
                <i className="fab fa-instagram text-secondary"></i>
              </a>
              <a href="https://t.me/yenetaschool" className="bg-white p-2 rounded-full text-color1 -300 h-9 w-9 flex justify-center items-center hover:bg-gray-200">
                <i className="fab fa-telegram text-secondary"></i>
              </a>
            </div>
          </div>
          </div> </div>


      <div className='flex justify-center items-center '>
    <div className="w-full  w-[100%]  px-10">
      <nav className="flex flex-wrap items-center w-[80%] w-full px-2 gap-8 justify-between py-3">
        <a href="/" className="navbar-brand justify-self-start flex items-center">
        <img src={logo} className='h-24 ' alt="" />
        <h1 className="text-color1 -900 text-7xl font-black">የ<span className="text-[orange]  font-black">ኔ</span><span className="text-[red]  font-black">ታ</span></h1>
          </a>
        {/* Responsive button */}
        <button className="py-2 px-3 text-secondary lg:hidden" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} /> {/* Menu Icon */}
        </button>
        {/* Navbar links */}
        <div className={`${isMobileMenuOpen ? 'flex flex-col' : 'hidden'} lg:flex flex-grow items-center gap-4 text-secondary display-1 text-2xl -900 font-bold justify-center`}>
         <a href="/" className="nav-link          hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md active">መነሻ</a>
        <a href="/about" className="nav-link      hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md active">ስለ እኛ</a>
        <a href="/why" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">ለምን የኔታ</a>
        <a href="/Product" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">ምርቶቻችን </a>
        <a href="/programs" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">ፕሮግራሞች </a>
        <a href="/events" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">ክስተቶች</a>
        <a href="/Contactus" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">ያነጋግሩን  </a>
    
          {/* Dropdown example */}
          <div className="relative">
            <button className="nav-link dropdown-toggle on hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md" onClick={toggleDropdown}>ተጨማሪ<FontAwesomeIcon icon="fa-solid fa-angle-down" /></button>
            <div className={`${isDropdownOpen ? 'flex' : 'hidden'} absolute text-sm z-10 bg-white border-x-2 border-color1 -700 flex-col p-3 gap-2 rounded-md mt-1`}>
              <a href="/Staff" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">ቡድናችን</a>
              <a href="/Testimonial" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">ምስክርነት</a>
              <a href="/services" className="nav-link  hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md  active">አገልግሎቶች </a>
              <a href="/Gallery" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">ማዕከለ-ስዕላት</a>
              <a href="/Partner" className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">አብሮነት</a>
            </div>
          </div>
        </div>
        {/* Contact info */}
        <div className="flex space-x-4">
          <div className="flex flex-col border-r border-primary pr-3">
            <span className="text-primary text-sm">ምንም ጥያቄ ካለዎት?</span>
                        <a href="#" className="text-secondary text-sm"><i class="fas fa-phone"></i> +1 240-374-8205 </a>
          </div>
        {/*    
          <button className="rounded-full bg-primary p-2 font-bold border w-16 h-11 border-color1 -600  text-color1 -600  rounded-full flex flex-row  items-center gap-2 "  onClick={() => cat()}>
        <i class="fa-solid fa-globe "></i>
        <h1 className='font-semibold'>EN</h1>
        </button>
        */}
        <a href="/Cart" className="relative  bg-primary p-3 font-bold  text-2xl w-14 h-14  text-secondary flex justify-center items-center">
            <i class="fa-solid fa-cart-shopping"></i>
            <span className="absolute top-0 right-0 bg-yellow-600 text-white rounded-full flex justify-center h-6 w-6 px-1 py-1 text-xs">{totalItems}</span>
          </a>
        </div>
      </nav>
    </div>
  </div>
          </div>
</div>


   )}
      {/* Navbar End */}
{/*
        <div className='w-screen bg-green-100'>
        <div className="flex flex-row  justify-center bg-red-100 px-0">
          <div  className="navbar bg-blue-700 w-[1500px] px-4  flex justify-between  py-3">
          <div className='bg-red-100 flex flex-row justify-between'>
            <a href="index.html" className="navbar-brand justify-self-start flex items-center">
              <h1 className="text-orange-400 text-2xl font-black">Yen<span className="text-[darkblue] text-2xl font-black">eta</span></h1>
            </a>
            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars au"></span>
            </button>
            </div>
            <div className=" navbar-collapse bg-blue-100 flex flex-row " id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <a href="index.html" className="nav-item nav-link active">Home     </a>
                <a href="about.html" className="nav-item nav-link">       About    </a>
                <a href="Why.html" className="nav-item nav-link">         Why Yenta</a>
                <a href="service.html" className="nav-item nav-link">     Services </a>
                <a href="program.html" className="nav-item nav-link">     Programs </a>
                <a href="event.html" className="nav-item nav-link">       Events   </a>
                <div className="nav-item dropdown">
                   <a href="#" className="nav-link dropdown-toggle " data-bs-toggle="dropdown">Pages</a>
                  <div className="dropdown-menu bg-secondary flex flex-col rounded-0">
                    <a href="blog.html" className="dropdown-item">Our Blog</a>
                    <a href="team.html" className="dropdown-item">Our Team</a>
                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                    <a href="404.html" className="dropdown-item">404 Page</a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">Contact</a>
              </div>
              <div className="flex items-center flex flex-row align bg-color1 me-4">
                <div id="phone-tada" className="flex items-center justify-center">
                  <a href="#" className="relative">
                    <i className="fa fa-phone-alt au fa-2x me-4"></i>
                  </a>
                </div>
                <div className="flex flex-col pr-3 border-r border-primary">
                  <span className="au">Have any questions?</span>
                  <a href="#"><span className="text-secondary">+1 240 353 4436</span></a>
                </div>
              </div>
              <button className="btn-search btn btn-primary btn-md rounded-full" data-bs-toggle="modal" data-bs-target="#searchModal">
                <i className="fas fa-search text-white"></i>
              </button>
            </div>
              </div>
              
        {/*   <nav className="navbar bg-blue-700 w-full flex flex-row  justify-center  py-3">
            
     
            <div className=" navbar-collapse flex flex-row " id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <a href="index.html" className="nav-item nav-link active">Home</a>
                <a href="about.html" className="nav-item nav-link">About</a>
                <a href="Why.html" className="nav-item nav-link">Why Yenta</a>
                <a href="service.html" className="nav-item nav-link">Services</a>
                <a href="program.html" className="nav-item nav-link">Programs</a>
                <a href="event.html" className="nav-item nav-link">Events</a>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle " data-bs-toggle="dropdown">Pages</a>
                  <div className="dropdown-menu bg-secondary flex flex-col rounded-0">
                    <a href="blog.html" className="dropdown-item">Our Blog</a>
                    <a href="team.html" className="dropdown-item">Our Team</a>
                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                    <a href="404.html" className="dropdown-item">404 Page</a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">Contact</a>
              </div>
              <div className="flex items-center flex flex-row align bg-black me-4">
                <div id="phone-tada" className="flex items-center justify-center">
                  <a href="#" className="relative">
                    <i className="fa fa-phone-alt au fa-2x me-4"></i>
                  </a>
                </div>
                <div className="flex flex-col pr-3 border-r border-primary">
                  <span className="au">Have any questions?</span>
                  <a href="#"><span className="text-secondary">+1 240 353 4436</span></a>
                </div>
              </div>
              <button className="btn-search btn btn-primary btn-md rounded-full" data-bs-toggle="modal" data-bs-target="#searchModal">
                <i className="fas fa-search text-white"></i>
              </button>
            </div>
          </nav>
            
        </div>
        </div>
          */}  

   
    </>
  );
};
export default Navbar;
