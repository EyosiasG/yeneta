import React from 'react';
import footer from '../../assets/img/fot.webp';
import logo from '../../assets/img/logo1.webp';
import { Link } from "react-router-dom";
import useStore from '../../store/store';

const Footer = () => {
    const { en } = useStore();
    return (
        <div className="footer bg-img-fot px-6 py-8 w-screen border-color1 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(250,250, 250, 0.9), rgba(255, 255, 255, 0.8)), url(${footer})` }}>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand and Newsletter */}
                <div className="space-y-6 flex flex-col items-center mx-8">
                    <div className="flex flex-col items-center">
                        <img src={logo} className='h-24 mb-2' alt="Yeneta Logo" />
                        <h2 className=" w-40 text-5xl font-bold display-1 text-center">
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
                    <p className="text-justify">
                    {en ? `"Yeneta" is an inviting Language and Cultural Academy nestled in Silver Spring, Maryland. Specializing in Ethiopian language and cultural studies, our Academy provides a nurturing environment where children explore the richness of Ethiopian heritage through engaging lessons, activities, and immersive experiences. Join us as we celebrate diversity, foster cross-cultural understanding, and empower the next generation to embrace their roots with pride and curiosity. Welcome to Yeneta!` 
                    : `"የኔታ" ቋንቋ እና ባህል አካዳሚ እንደሚጋብዝ ቦታ በሚስትላንድ ስፒርንግ፣ ማሪላንድ ውስጥ ተገኝቷል። በኢትዮጵያ ቋንቋ እና ባህል ምርምር ላይ ስለሚተኮር፣ አካዳሚያችን በተለያዩ ትምህርቶች፣ እንቅስቃሴዎች እና በሙሉ ተሳታፊ ተመን የሚበላሽ አካባቢ ለልጆች ያቀርባል። እኛን በማቅረብ እንደምንዛሬ በስተቀር፣ የተለያዩ ባህልን እናከብራለን፣ የተለያዩ ባህል መረዳትን እናዳግ፣ እና በአንድነት እና በፍላጎት የሚታወቁ ትውልድን እንዲያቀበሉ እናበረታለን። ወደ የኔታ እንኳን ደህና መጡ!"`}
                    </p>
                </div>

                {/* Operating Hours */}
                <div className="rounded-[70px] w-full mx-w-96 px-6 py-5 text-center border max-h-[30rem] border-color1 bg-white/20">
                    <h4 className="text-color1 mb-4 border-b-2 border-color1 inline-block p-2 text-justify">
                        {en ? "Operating Hours" : "የሥራ ሰዓቶች"}
                    </h4>
                    <div className="justify-center flex">
                        <ul className="space-y-2 text-teal-900 text-left">
                            {[
                                { en: 'Monday', am: 'ሰኞ' },
                                { en: 'Tuesday', am: 'ማክሰኞ' },
                                { en: 'Wednesday', am: 'ረቡዕ' },
                                { en: 'Thursday', am: 'ሐሙስ' },
                                { en: 'Friday', am: 'ዓርብ' }
                            ].map(day => (
                                <li key={day.en}>
                                    <i className="fas fa-clock text-color1 mr-2"></i>
                                    {en ? `${day.en}: 5:30pm to 7:30pm` : `${day.am}፡ ከ5:30 ሰዓት እስከ 7:30 ሰዓት`}
                                </li>
                            ))}
                            <li>
                                <i className="fas fa-clock text-color1 mr-2"></i>
                                {en ? "Saturday: 9am to 6:30pm" : "ቅዳሜ፡ ከ9 ሰዓት እስከ 6፡30 ሰዓት"}
                            </li>
                            <li>
                                <i className="fas fa-times-circle text-red-400 mr-2"></i>
                                {en ? "Sunday: Closed" : "እሁድ፡ ዝግ"}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Quick Links */}
                <div className=" rounded-[70px]  w-full mx-w-96 px-6 py-5 text-center border max-h-[30rem] border-color1 bg-white/20 ">
                    <h4 className="text-color1 mb-4 border-b-2 border-color1 inline-block p-2">{en ? "Quick Links" : "ፈጣን ማስታወቂያዎች"}</h4>
                    <div className='justify-center flex'>
                    <ul className="space-y-2 text-left">
                        {[
                            { link:'Staff' ,name: en ? 'Our Team' : 'ቡድናችን', icon: 'fa-users' },
                            { link:'Testimonial' ,name: en ? 'Testimonials' : 'ምስክርነት', icon: 'fa-comment-dots' },
                            { link:'services' ,name: en ? 'Services' : 'አገልግሎቶች', icon: 'fa-concierge-bell' },
                            { link:'Gallery' ,name: en ? 'Gallery' : 'ማዕከል', icon: 'fa-images' },
                            { link:'Partner' ,name: en ? 'Partnership' : 'አብሮነት', icon: 'fa-handshake' },
                            { link:'Product' ,name: en ? 'Products' : 'ምርቶች', icon: 'fa-box-open' },
                            { link:'Rule' ,name: en ? 'Rule and Regulations' : 'ምርቶች', icon: 'fa-ruler' }
                        ].map((item, index) => (
                            <li key={index}>
                                <a href={`/${item.link.replace(" ", "")}`} className="text-teal-500 hover:text-secondary">
                                    <i className={`fas ${item.icon} mr-2`}></i>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>

                {/* Location and Contact */}
                <div className="px-6 py-5 w-full mx-w-96 text-center border max-h-[30rem] border-color1 bg-white/20 rounded-[70px]    ">
                    <h4 className="text-color1 mb-4 border-b-2 border-color1 inline-block p-2">{en ? "Location" : 'ቦታ'}</h4>
                    <div className="space-y-2 text-teal-900 text-left">
                        <p><i className="fas fa-map-marker-alt text-color1 mr-2"></i> 11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901</p>
                        <p><i className="fas fa-phone-alt text-color1 mr-2"></i> +1 240 353 4436</p>
                        <p><i className="fas fa-phone-alt text-color1 mr-2"></i> +1 240 374 8205</p>
                        <p><i className="fas fa-envelope text-color1 mr-2"></i> info@yenetaschool.com</p>
                        <p><i className="fas fa-envelope text-color1 mr-2"></i> admission@yenetaschool.com</p>
                        <p><i className="fas fa-clock text-color1 mr-2"></i> 24/7 Service</p>
                    </div>
                    <div className="flex w-full space-x-3 mt-4 justify-start">
                    {['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-instagram','fab fa-youtube',  'fab fa-telegram'].map((icon, index) => {
                            let link = '';
                            if (icon === 'fab fa-facebook-f') link = 'https://www.facebook.com/profile.php?id=61558414607277&mibextid=ZbWKwL';
                            else if (icon === 'fa-brands fa-x-twitter') link = 'https://twitter.com/Yenetaschool';
                            else if (icon === 'fab fa-instagram') link = 'https://www.instagram.com/yenetalan?igsh=MXVjanM3OTlmN3BzMQ==';
                            else if (icon === 'fab fa-telegram') link = 'https://t.me/yenetaschool';
                            else if (icon === 'fab fa-youtube') link = 'https://www.youtube.com/@YenetaLanguageandCulturalAcade';
                            return (
                                <a key={index} href={link} className="bg-color1 text-white h-10 w-10 rounded-full flex justify-center items-center hover:scale-125 transition-transform duration-300">
                                    <i className={icon}></i>
                                </a>
                            );
                        })}
                    </div>
                   
                </div>

            </div>
            <div className="text-center text-sm flex flex-row flex-wrap gap-4 justify-center text-gray-600 font-bold py-4 w-screen bg-white/50 -ml-10 ">
                      <div>
                      © 2024 Yeneta Language and Cultural Academy. All rights reserved.
                      </div>
              
                      <div>
                        <a href="/Rule" className="text-blue-600 hover:text-gray-800 transition-colors duration-300">
                          {en ? 'Rules and Regulations' : 'ህጎች እና መመሪያዎች'}
                        </a>
                      </div>
                     
                    </div>
        </div>
    );
};

export default Footer;
