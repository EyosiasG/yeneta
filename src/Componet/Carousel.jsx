import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = activeIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = activeIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap transition ease-linear duration-700">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={`w-full h-[25rem] object-cover inline-block ${
                  index === activeIndex ? 'block' : 'hidden'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-between">
          <button
            onClick={goToPrevious}
            className="p-2 cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-75"
          >
            &#10094;
          </button>
          <button
            onClick={goToNext}
            className="p-2 cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-75"
          >
            &#10095;
          </button>
        </div>
      </div>
      <div className="flex space-x-2 mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
