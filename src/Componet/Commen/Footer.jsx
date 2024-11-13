import React from 'react';
import footer from '../../assets/img/fot.webp';
import logo from '../../assets/img/logo1.webp';
import { Link } from "react-router-dom";
import useStore from '../../store/store';

const Footer = () => {
    const { en } = useStore();

    const socialLinks = [
        { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=61558414607277&mibextid=ZbWKwL' },
        { icon: 'fab fa-twitter', url: 'https://twitter.com/Yenetaschool' },
        { icon: 'fab fa-instagram', url: 'https://www.instagram.com/yenetalan?igsh=MXVjanM3OTlmN3BzMQ==' },
        { icon: 'fab fa-youtube', url: 'https://www.youtube.com/@YenetaLanguageandCulturalAcade' },
        { icon: 'fab fa-telegram', url: 'https://t.me/yenetaschool' }
    ];

    const quickLinks = [
        { link: 'Staff', name: { en: 'Our Team', am: 'ቡድናችን' }, icon: 'fa-users' },
        { link: 'Testimonial', name: { en: 'Testimonials', am: 'ምስክርነት' }, icon: 'fa-comment-dots' },
        { link: 'services', name: { en: 'Services', am: 'አገልግሎቶች' }, icon: 'fa-concierge-bell' },
        { link: 'Gallery', name: { en: 'Gallery', am: 'ማዕከል' }, icon: 'fa-images' },
        { link: 'Partner', name: { en: 'Partnership', am: 'አብሮነት' }, icon: 'fa-handshake' },
        { link: 'Product', name: { en: 'Products', am: 'ምርቶች' }, icon: 'fa-box-open' },
        { link: 'Rule', name: { en: 'Rule and Regulations', am: 'ህጎች እና ደንቦች' }, icon: 'fa-ruler' }
    ];

    const operatingHours = [
        { en: 'Monday', am: 'ሰኞ', time: '5:30pm to 7:30pm' },
        { en: 'Tuesday', am: 'ማክሰኞ', time: '5:30pm to 7:30pm' },
        { en: 'Wednesday', am: 'ረቡዕ', time: '5:30pm to 7:30pm' },
        { en: 'Thursday', am: 'ሐሙስ', time: '5:30pm to 7:30pm' },
        { en: 'Friday', am: 'ዓርብ', time: '5:30pm to 7:30pm' },
        { en: 'Saturday', am: 'ቅዳሜ', time: '9am to 6:30pm' },
        { en: 'Sunday', am: 'እሁድ', time: 'Closed', amTime: 'ዝግ', closed: true }
    ];

    return (
        <footer className="relative w-full overflow-hidden">
            <div className="footer px-6 py-12 w-full border-color1 bg-cover bg-center" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(250,250, 250, 0.95), rgba(255, 255, 255, 0.9)), url(${footer})`
                }}>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Brand Section */}
                        <div className="space-y-6">
                            <div className="flex flex-col items-center">
                                <img src={logo} className="h-28 mb-3 transition-transform hover:scale-105" alt="Yeneta Logo" />
                                <h2 className="text-5xl font-bold display-1 text-center">
                                    {en ? (
                                        <>
                                            <span className="text-green-900">Ye</span>
                                            <span className="text-orange-300">ne</span>
                                            <span className="text-red-700">ta</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-green-900">የ</span>
                                            <span className="text-orange-300">ኔ</span>
                                            <span className="text-red-700">ታ</span>
                                        </>
                                    )}
                                </h2>
                            </div>
                            <p className="text-justify leading-relaxed text-gray-700">
                                {en ? 
                                    `"Yeneta" is an inviting Language and Cultural Academy nestled in Silver Spring, Maryland. Specializing in Ethiopian language and cultural studies, our Academy provides a nurturing environment where children explore the richness of Ethiopian heritage through engaging lessons, activities, and immersive experiences.` 
                                    : 
                                    `"የኔታ" ቋንቋ እና ባህል አካዳሚ እንደሚጋብዝ ቦታ በሚስትላንድ ስፒርንግ፣ ማሪላንድ ውስጥ ተገኝቷል። በኢትዮጵያ ቋንቋ እና ባህል ምርምር ላይ ስለሚተኮር፣ አካዳሚያችን በተለያዩ ትምህርቶች፣ እንቅስቃሴዎች እና በሙሉ ተሳታፊ ተመን የሚበላሽ አካባቢ ለልጆች ያቀርባል።`
                                }
                            </p>
                        </div>

                        {/* Operating Hours */}
                        <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold text-color1 mb-6 border-b-2 border-color1 pb-2 inline-block">
                                {en ? "Operating Hours" : "የሥራ ሰዓቶች"}
                            </h4>
                            <ul className="space-y-3">
                                {operatingHours.map((day, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <i className={`${day.closed ? 'fas fa-times-circle text-red-400' : 'fas fa-clock text-color1'} mr-3`}></i>
                                        <span>
                                            {en ? 
                                                `${day.en}: ${day.closed ? day.time : day.time}` :
                                                `${day.am}፡ ${day.closed ? day.amTime : day.time}`
                                            }
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold text-color1 mb-6 border-b-2 border-color1 pb-2 inline-block">
                                {en ? "Quick Links" : "ፈጣን ማስታወቂያዎች"}
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={`/${item.link}`}
                                            className="flex items-center text-teal-700 hover:text-secondary transition-colors duration-300"
                                        >
                                            <i className={`fas ${item.icon} mr-3`}></i>
                                            {en ? item.name.en : item.name.am}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold text-color1 mb-6 border-b-2 border-color1 pb-2 inline-block">
                                {en ? "Contact Us" : "ያግኙን"}
                            </h4>
                            <div className="space-y-4">
                                <p className="flex items-start text-gray-700">
                                    <i className="fas fa-map-marker-alt text-color1 mr-3 mt-1"></i>
                                    11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <i className="fas fa-phone-alt text-color1 mr-3"></i>
                                    +1 240 353 4436
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <i className="fas fa-phone-alt text-color1 mr-3"></i>
                                    +1 240 374 8205
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <i className="fas fa-envelope text-color1 mr-3"></i>
                                    info@yenetaschool.com
                                </p>
                                <div className="flex space-x-4 mt-6">
                                    {socialLinks.map((social, index) => (
                                        <a 
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-color1 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300 hover:scale-110"
                                        >
                                            <i className={social.icon}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="container mx-auto flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                        <p>© 2024 Yeneta Language and Cultural Academy. All rights reserved.</p>
                        <Link 
                            to="/Rule"
                            className="text-color1 hover:text-secondary transition-colors duration-300"
                        >
                            {en ? 'Rules and Regulations' : 'ህጎች እና መመሪያዎች'}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
