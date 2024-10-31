
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import PopOutPlayer from './PopOutPlayer';
import bg from '../assets/img/abvid.webp'

const Cast = () => {

  const en = useStore((state) => state.en);







return (
    <>


<div className="container-fluid py-5 flex justify-center items-center bg-white"style={{ backgroundImage: `linear-gradient(rgba(255,255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${bg})`}} >
  <div className="container py-5">
    <div className="row g-5">
      
      <div className="col-lg-8 col-md-10 mx-auto text-black px-8 rounded-md shadow-xl my-10 py-10  bg-white border ">
      <h1 className='text-center display-1 text-color1 text-4xl  underline pb-4 '>Biography</h1>
        <h1 className="mb-4 text-4xl text-yellow-600 display-1 font-semibold">Background and Education</h1>
        <p className="text-lg mb-4">
          Rakeb was born and raised in Ethiopia, a land celebrated for its profound cultural heritage and storied history. With an unwavering dedication, she pursued an education that bridges both business and healthcare domains. Rakeb holds an associate degree in Marketing Management, a Bachelor of Science in Management Information Systems, and a degree in Medical Technology. This diverse educational background has equipped her with an expansive skill set, enabling her to excel in a multitude of fields. Her expertise in marketing management empowers her to understand and effectively engage diverse audiences. Her knowledge in management information systems provides a robust foundation in technology and data management. Additionally, her background as a medical technologist offers her a comprehensive understanding of healthcare practices and standards. As the founder of Yeneta Language and Cultural Academy in Silver Spring, Maryland, Rakeb primarily educates children aged 4-14 on Ethiopian languages, cultures, and traditional musical instruments.
        </p>
        <h2 className="mb-4 text-3xl text-yellow-600 display-1 font-semibold">Passion for Culture and Education</h2>
        <p className="text-lg mb-4">
          Rakeb is profoundly passionate about her Ethiopian heritage and is fervently committed to helping children connect with their cultural roots. She believes that understanding and appreciating one’s language and traditions is essential for personal and community identity. This deep-seated passion has propelled her to establish language and culture schools aimed at engaging children and instilling a profound sense of pride in their cultural heritage.
        </p>
        <h2 className="mb-4 text-3xl text-yellow-600 display-1 font-semibold">Vision for the Future</h2>
        <p className="text-lg mb-4">
          Rakeb envisions a dynamic network of schools dedicated to teaching Ethiopian languages and cultural traditions. These institutions will serve as vibrant centers for cultural exchange, equipping children with the knowledge and skills to honor and celebrate their heritage. Through the establishment of these schools, Rakeb aims to fortify her community and ensure that future generations remain deeply connected to their cultural origins.
        </p>
        <h2 className="mb-4 text-3xl text-yellow-600 display-1 font-semibold">Community Involvement and Philosophy</h2>
        <p className="text-lg mb-4">
          Rakeb is a staunch believer in the transformative power of education and cultural awareness. She is actively engaged in community initiatives that champion cultural education and engagement. Her personal philosophy is that by helping children understand and embrace their heritage, she can contribute to building a stronger, more cohesive community.
        </p>
        <h2 className="mb-4 text-3xl text-yellow-600 display-1 font-semibold">Conclusion</h2>
        <p className='text-lg'>
          Rakeb's journey from Ethiopia to a multifaceted professional career epitomizes her steadfast commitment to education, cultural preservation, and community service. Her vision of establishing language and culture schools underscores her dedication to nurturing a sense of belonging and identity among young Ethiopians. Rakeb's story is a compelling testament to how education and cultural pride can profoundly shape individuals and communities for the better.
        </p>
      </div>
    </div>
  </div>
</div>
     
</>
  );
};

export default Cast;
