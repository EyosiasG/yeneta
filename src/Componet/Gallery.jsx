import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/store';
import fot from '../assets/img/fot.webp';
import Hero1 from "../assets/img/hero7.webp";
function Gallery() {
    const { en, a_Gallery, setA_Gallery } = useStore();
    const [catagory, setCatagory] = useState([]);
    const [filter, setFilter] = useState("all");
    const [gallery, setGallery] = useState([]);
    const [active, setActive] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 10;
    
    async function filterGallery(category) {
        setFilter(category);
        setCurrentPage(1); // Reset to first page when filtering
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

    async function fetchGallery() {
        const galleryEndpoint = `${import.meta.env.VITE_API}/api/Gallerys`;
        try {
            const response = await fetch(galleryEndpoint);
            if (!response.ok) throw new Error("Network response was not ok");
            
            const data = await response.json();
            if (data.status === 1 && data.data.length > 0) {
                setA_Gallery(data.data);
                setGallery(data.data);
                const uniqueCategories = [...new Set(data.data.map(item => item.category))];
                setCatagory(uniqueCategories);
            } else {
                setGallery([]);
                setCatagory([]);
            }
        } catch (error) {
            console.error("Error fetching gallery:", error);
        }
    }

    useEffect(() => {
        fetchGallery();
    }, [setA_Gallery]);

    // Get current images
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = gallery
        .filter(event => event.group_name !== 'Video')
        .slice(indexOfFirstImage, indexOfLastImage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(gallery.filter(event => event.group_name !== 'Video').length / imagesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 relative"
            
        >
            {/* Background SVG */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full opacity-10">
                    <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="orange" strokeWidth="1"/>
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"/>
                </svg>
            </div>

            {/* Minimalist Hero */}
            <div className="relative h-[90vh] flex items-center justify-center bg-cover"   style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
                <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-8xl font-light tracking-tight relative z-10 text-white display-6"
                  
                >
                    {en ? 'Gallery' : 'ጋለሪ'}
                </motion.h1>
            </div>

            {/* Minimal Filter Pills */}
            <div className="container mx-auto px-4 relative z-10 mt-5">
                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-24"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button 
                        className={`${active === "All" ? "bg-orange-500 text-white" : "bg-transparent border border-orange-300"} 
                        px-6 py-2 rounded-full text-sm transition-all duration-300 hover:bg-orange-500 hover:text-white`}
                        onClick={() => filterGallery('All')}
                    >
                        All
                    </button>
                    {catagory.filter(category1 => category1 !== 'video').map((category1, index) => (
                        <button 
                            key={index} 
                            className={`${active === category1 ? "bg-orange-500 text-white" : "bg-transparent border border-orange-300"} 
                            px-6 py-2 rounded-full text-sm transition-all duration-300 hover:bg-orange-500 hover:text-white`}
                            onClick={() => filterGallery(category1)}
                        >
                            {category1}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry-style Image Grid */}
                <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 pb-24">
                    <AnimatePresence>
                        {currentImages.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative break-inside-avoid cursor-pointer"
                                onClick={() => setSelectedImage(event)}
                            >
                                <img
                                    src={`${import.meta.env.VITE_IMG_URL}/${event.img_url}`}
                                    alt={event.title}
                                    className="w-full rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                    <div className="absolute bottom-0 p-6">
                                        <h4 className="text-xl font-light mb-2 text-white">{en ? event.title : event.title_am}</h4>
                                        <p className="text-sm text-orange-100 line-clamp-2">{en ? event.description : event.description_am}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Full Screen Image Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                className="relative max-w-7xl w-full h-[90vh] flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={`${import.meta.env.VITE_IMG_URL}/${selectedImage.img_url}`}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                                <button
                                    className="absolute top-4 right-4 text-white text-4xl hover:text-orange-500"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    ×
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                <div className="flex justify-center gap-2 pb-12">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`${currentPage === number ? 'bg-orange-500 text-white' : 'bg-transparent text-gray-700'} 
                            border border-orange-300 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-orange-500 hover:text-white`}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* Video Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 border-t border-orange-200"
                >
                    <h2 className="text-3xl font-light text-center mb-16 text-orange-600">
                        {en ? 'Video Gallery' : 'የቪዲዮ ጋለሪ'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {a_Gallery.filter(event => event.group_name === 'Video').map((event) => (
                            <motion.div
                                key={event.id}
                                whileHover={{ y: -5 }}
                                className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg"
                            >
                                <iframe
                                    src={`https://www.youtube.com/embed/${event.category_am}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Gallery;
