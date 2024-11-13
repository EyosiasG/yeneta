import React, { useState, useEffect } from 'react';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo1.webp';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    location: ""
  });

  const { totalItems, a_Contactus, setEn, en } = useStore();

  useEffect(() => {
    if (a_Contactus.length > 0) {
      setContactInfo({
        email: a_Contactus[0].email,
        phone: a_Contactus[0].phone,
        location: a_Contactus[0].address
      });
    }
  }, [a_Contactus]);

  const toggleLanguage = () => {
    const newLangState = !en;
    setEn(newLangState);
    localStorage.setItem('en', newLangState);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const TopBar = () => (
    <div className="flex justify-center">
      <div className="lg:container topbar bg-secondary/70 flex flex-row justify-center px-4 lg:px-2 hidden lg:flex py-2 rounded-bl-[40rem] rounded-tr-[40rem] sm:w-screen">
        <div className="flex justify-between items-center">
          <div className="top-info space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-map-marker-alt text-white"></i>
              <a href="#" className="text-white text-xs lg:text-sm">11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901</a>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-envelope text-white"></i>
              <a href="mailto:info@yenetaschool.com" className="text-white text-sm lg:text-base">info@yenetaschool.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-envelope text-white"></i>
              <a href="mailto:admission@yenetaschool.com" className="text-white text-sm lg:text-base">admission@yenetaschool.com</a>
            </div>
          </div>
          <div className="social-links flex pl-0 lg:pl-9 xl:16 gap-2">
            <SocialLink href="https://www.youtube.com/channel/UCxkLnm9J3_rqV8m7UXB3sSw" icon="youtube" />
            <SocialLink href="https://www.facebook.com/profile.php?id=61558414607277&mibextid=ZbWKwL" icon="facebook-f" />
            <SocialLink href="https://twitter.com/Yenetaschool" icon="twitter" />
            <SocialLink href="https://www.instagram.com/yenetalan?igsh=MXVjanM3OTlmN3BzMQ==" icon="instagram" />
            <SocialLink href="https://t.me/yenetaschool" icon="telegram" />
          </div>
        </div>
      </div>
    </div>
  );

  const SocialLink = ({href, icon}) => (
    <a href={href} className="bg-white p-2 rounded-full h-9 w-9 flex justify-center items-center text-color1 hover:bg-gray-200">
      <i className={`fab fa-${icon} text-secondary`}></i>
    </a>
  );

  const NavLinks = ({isEnglish}) => {
    const links = isEnglish ? [
      {href: "/", text: "Home"},
      {href: "/about", text: "About"},
      {href: "/why", text: "Why Yeneta"},
      {href: "/Product", text: "Our Product"},
      {href: "/programs", text: "Programs"},
      {href: "/events", text: "Events"},
      {href: "/Contactus", text: "Contact us"}
    ] : [
      {href: "/", text: "መነሻ"},
      {href: "/about", text: "ስለ እኛ"},
      {href: "/why", text: "ለምን የኔታ"},
      {href: "/Product", text: "ምርቶቻችን"},
      {href: "/programs", text: "ፕሮግራሞች"},
      {href: "/events", text: "ክስተቶች"},
      {href: "/Contactus", text: "ያነጋግሩን"}
    ];

    return (
      <>
        {links.map(link => (
          <a key={link.href} href={link.href} className="nav-link hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md active">
            {link.text}
          </a>
        ))}
      </>
    );
  };

  const DropdownMenu = ({isEnglish}) => {
    const items = isEnglish ? [
      {href: "/Staff", text: "Our Team"},
      {href: "/Testimonial", text: "Testimonial"},
      {href: "/services", text: "Services"},
      {href: "/Gallery", text: "Gallery"},
      {href: "/Partner", text: "PartnerShip"}
    ] : [
      {href: "/Staff", text: "ቡድናችን"},
      {href: "/Testimonial", text: "ምስክርነት"},
      {href: "/services", text: "አገልግሎቶች"},
      {href: "/Gallery", text: "ማዕከለ-ስዕላት"},
      {href: "/Partner", text: "አብሮነት"}
    ];

    return (
      <div className="relative">
        <button className="nav-link dropdown-toggle hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md" onClick={toggleDropdown}>
          {isEnglish ? "More" : "ተጨማሪ"}
          <FontAwesomeIcon icon="fa-solid fa-angle-down" />
        </button>
        <div className={`${isDropdownOpen ? 'flex' : 'hidden'} absolute text-sm z-10 bg-white border-x-2 border-color1 flex-col p-3 gap-2 rounded-md mt-1`}>
          {items.map(item => (
            <a key={item.href} href={item.href} className="dropdown-item hover:text-color1 border-b-4 hover:border-color1 p-2 rounded-md">
              {item.text}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='bg-White'>
        <div className="border-b border-color1 w-full">
          <TopBar />
          
          <div className='flex justify-center items-center'>
            <div className="w-full w-[100%] px-10">
              <nav className="flex flex-wrap items-center w-[80%] w-full px-2 gap-8 justify-between py-3">
                <a href="/" className="navbar-brand justify-self-start flex items-center">
                  <img src={logo} className='h-24 w-24' alt="Yeneta Logo" />
                  {en ? (
                    <h1 className="text-[darkgreen] w-40 text-5xl py-4 display-1 font-black">
                      YE<span className="text-[orange] font-black">NE</span><span className="text-[red] font-black">TA</span>
                    </h1>
                  ) : (
                    <h1 className="text-color1 text-7xl font-black">
                      የ<span className="text-[orange] font-black">ኔ</span><span className="text-[red] font-black">ታ</span>
                    </h1>
                  )}
                </a>

                <button className="py-2 px-3 text-secondary lg:hidden" onClick={toggleMobileMenu}>
                  <FontAwesomeIcon icon={faBars} />
                </button>

                <div className={`${isMobileMenuOpen ? 'flex flex-col' : 'hidden'} lg:flex flex-grow items-center gap-4 text-secondary display-1 text-2xl font-bold justify-center`}>
                  <NavLinks isEnglish={en} />
                  <DropdownMenu isEnglish={en} />
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col border-r border-primary pr-3">
                    <span className="text-primary text-sm">{en ? "Have any questions?" : "ምንም ጥያቄ ካለዎት?"}</span>
                    <a href="#" className="text-secondary text-sm">
                      <i className="fas fa-phone"></i> +1 240-374-8205
                    </a>
                  </div>

                  <a href="/Cart" className="relative bg-primary p-3 font-bold text-2xl w-14 h-14 text-secondary flex justify-center items-center">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="absolute top-0 right-0 bg-yellow-600 text-white rounded-full flex justify-center h-6 w-6 px-1 py-1 text-xs">
                      {totalItems}
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
