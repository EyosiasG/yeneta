import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import border from '../assets/img/bor2.jpg';
import useStore from '../store/store';
import Carousel from './Carousel';
import PopOutPlayer from './PopOutPlayer';
import fot from '../assets/img/fot.webp';

function Gallery() {
    const { en, a_Gallery, setA_Gallery } = useStore();
    const [catagory, setCatagory] = useState([]);
    const [filter, setFilter] = useState("all");
    const [gallery, setGallery] = useState([]);
    const [active, setActive] = useState("All");
    const [form, setForm] = useState(false);
    
    // Define slider settings here to avoid reference errors
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };
    
    async function filterGallery(category) {
        setFilter(category);
        if (category === "All") {
            setActive("All");
            fetchGallery();
            
            
        } else {
            let temp = a_Gallery.filter((item) => item.category === category);
            setActive(catagory);
            setGallery(temp);
            setActive(category);
        }
    }
    const images = [
    '    https://banner2.cleanpng.com/20180419/ogw/kisspng-stripe-payment-gateway-payment-processor-payment-s-technical-stripe-5ad905de5929b1.1738818115241722543652.jpg',
    '${import.meta.env.VITE_API}/storage/images/KuyAyuvO0hCmcLUfruqMBarOUdhNzNMsy3SoR55O.jpg',
    '    https://banner2.cleanpng.com/20180419/ogw/kisspng-stripe-payment-gateway-payment-processor-payment-s-technical-stripe-5ad905de5929b1.1738818115241722543652.jpg',
    '    https://banner2.cleanpng.com/20180419/ogw/kisspng-stripe-payment-gateway-payment-processor-payment-s-technical-stripe-5ad905de5929b1.1738818115241722543652.jpg',
   
      ];
    async function fetchGallery() {
        const galleryEndpoint = `${import.meta.env.VITE_API}/api/Gallerys`;
        try {
            const response = await fetch(galleryEndpoint, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if (data.status === 1 && data.data.length > 0) {
                setA_Gallery(data.data);
                setGallery(data.data);
                const uniqueCategories = [...new Set(data.data.map(item => item.category))];
                setCatagory(uniqueCategories);
                console.log('Unique Categories', uniqueCategories);
                console.log(data.data);
            } else {
                console.log('No gallery data available');
                setGallery([]);
                setCatagory([]);
            }
        } catch (error) {
            console.error("Error fetching gallery data:", error);
        }
    }
    useEffect(() => {
       
        fetchGallery();
    }, [setA_Gallery]);

    return (
    
        <div className="py-10 lg:py-20 relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${fot})` }}>
            <div className="text-center mx-auto mb-5 lg:mb-10">
                <h1 className="mb-3 text-[#d4aa3b] display-1 text-3xl lg:text-5xl font-bold">{en ? 'Our Gallery' : 'የእኛ ጋለሪ'}</h1>
            </div>
            <div className="flex flex-wrap justify-center text-xs md:text-lg items-center gap-2 mt-5 bg-white/10 py-10">
                <button className={`${active === "All" ? "bg-secondary text-white" : "bg-gray-100 text-gray-700"} rounded-full px-4 sm:px-6 py-2 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-white`} onClick={() => filterGallery('All')}>All</button>
                {catagory.filter(category1 => category1 !== 'video').map((category1, index) => (
                    <button key={index} className={`${active === category1 ? "bg-secondary text-white" : "bg-gray-100 text-gray-700"} rounded-full px-3 sm:px-6 py-2 transition duration-300 ease-in-out hover:bg-teal-600 hover:text-white`} onClick={() => filterGallery(category1)}>{category1}</button>
                ))}
            </div>
            <div className='bg-white/50 mx-0 md:mx-10 p-2 md:p-8 my-10 overflow-y-scroll max-h-[120vh] border-y-8 border-white rounded-3xl flex justify-center'>
            <div className='rounded-lg mx-4 sm:mx-10 md:mx-20 flex flex-wrap gap-5 sm:gap-8 md:gap-10 border-b-2 py-5 sm:py-8 md:py-10 my-6 w-full'>
                {gallery.filter(event => event.group_name !== 'Video').map((event, index) => (
                    <div key={event.id} className="relative transform transition-transform duration-300 bg-white ease-in-out hover:scale-110 md:hover:scale-150  flex-shrink-0 flex-grow-0 w-full sm:w-[21rem] hover:z-50">
                        <img
                            src={`${import.meta.env.VITE_IMG_URL}/${event.img_url}`}
                            alt="Event"
                            className="rounded-xl min-h-96 shadow-lg w-full object-cover hover:object-contain "
                        />
                        <div className="absolute h-fit w-full bottom-0 flex flex-col justify-end bg-gradient-to-t from-yellow-500  text-black font-semibold p-2 md:p-4">
                            <h4 className="text-sm md:text-base lg:text-lg">{en ? event.title : event.title_am}</h4>
                            <p className="text-xs md:text-sm">{en ? event.description : event.description_am}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className='shadow-2xl py-20 bg-white/60 border-y-8 border-color1 rounded-3xl'>
            <h1 className='text-6xl display-1 text-center text-color1 '> Here Are Our Videos Memories</h1>
            <div className='mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-20 overflow-y-scroll p-20 max-h-[60rem]'>
                {a_Gallery.filter(event => event.group_name === 'Video').map((event, index) => (
                    <div key={event.id} className="relative h-fit hover:z-10 ">
                 
            <iframe
                src={`https://www.youtube.com/embed/${event.category_am}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full ] max-w-[40rem] object-contain min-h-[30rem] rounded-lg"
              ></iframe>
                        </div>
                    
                ))}
            </div>
            </div>
        </div>
    )
}

export default Gallery;
