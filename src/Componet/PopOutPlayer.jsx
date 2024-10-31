// PopOutPlayer.js
import React, { useEffect, useState } from 'react';

const PopOutPlayer = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    console.log("Video ID:", videoId);
  }, [videoId]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-color1 hover:bg-red-700 transform hover:scale-110 text-white font-bold h-16 w-16 md:h-32 md:w-32 py-2 px-7 rounded-full animate-pulse"
        onClick={openModal}
      >
        <i className="fas md:pl-2 fa-play fa-2x md:fa-4x"></i>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className=" p-4 md:p-6 rounded shadow-md w-full max-w-4xl">
            <button
              className="absolute top-4 right-4 md:top-10 md:right-10 text-xl md:text-3xl text-white bg-red-700 rounded-full p-2 md:py-2 md:px-4 hover:text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <iframe
              className="w-full h-auto"
              style={{ minHeight: '50vh' }}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameborder="10"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopOutPlayer;
