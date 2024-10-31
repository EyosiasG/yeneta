import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import Hero1 from '../../assets/img/hero7.png'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from 'react-toastify';
library.add(fas);
const About = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
  const [programs, setPrograms] = useState({});
  const [editingProgram, setEditingProgram] = useState(null);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
        import.meta.env.VITE_API
      }/api/aboutus`;
  
      const response = await fetch(allRides, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      if (data.status === 1) {
        setA_Aboutus(data.data);
        setAbout_link(data.data[0].link);
        setAboutImgUrl(data.data[0].img_url);
        setAboutDescriptionAm(data.data[0].description_am);
        setAboutDescription(data.data[0].description);
        console.log(a_Aboutus);
  
      } else {
        return;
      }
    }
    async function fetchData() {
        const allRides = `${
          import.meta.env.VITE_API
        }/api/mainTitle`;
    
        const response = await fetch(allRides, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data1 = await response.json();
        if (data1.status === 1) {
        
          data1.data.forEach((item) => {
            if (item.name === "Aboutus" ) {
                setAboutus(item);
            }
          });
        }
        else {
         return;
       }
        }
    
      
        fetchData();
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

    
  const onSubmit = async (data) => {
    if(editingProgram) {
      // If editingProgram is not null, we're editing an existing program
      await axios.put(`${import.meta.env.VITE_API}/api/aboutus/${editingProgram.id}`, data);
      toast.success('Program updated successfully');
    } 
    setEditingProgram(null); // Reset editing state
    toggleForm(false); // Close the form
    fetchPrograms(); // Refresh the programs list
  };
 

  return (
   
  
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>About Us</h1>
      <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'> <div className='border border-color1 -700 px-2 py-1 rounded-md  text-white '><FontAwesomeIcon icon={faPenToSquare} /> Edit</div> </button>
     

      </div>
      <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'>
  
      <div className=" py-20 about">
            <div className= " container mx-auto py-20">
                <div className="flex flex-wrap  mx-8 items-center">
                    <div className="w-full lg:w-1/2 px-4 wow fadeIn" data-wow-delay="0.1s">
                        <div className="video border">
                            <button onClick={() => openVideoModal({about_link})} className="btn-play relative block w-full aspect-video bg-cover bg-center" >
                                {/* Icon or play button visualization */}
                                <span></span>                 
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 wow fadeIn" data-wow-delay="0.3s">
                      
                        <h4 className="text-color1 -600  px-2 mb-4 border-b-2 border-color1 -600  text-xl  inline-block py-2 rounded-l-2xl rounded-r-md">{en ? about.title : about.title_am}</h4>
                        <h1 className="text-[#393d72] mb-4 text-[darkblue] display-1  text-4xl font-bold">{en ? about.subTitle : about.subTitle_am}</h1>
                        {en ? about_description.split('\n').map((paragraph, index) => (
               
               <p className="text-dark text-[darkblue] mb-4" key={index}>{paragraph}</p>
           )) : about_description_am.split('\n').map((paragraph, index) => (
  
               
                            <p className="text-dark text-[darkblue] mb-4" key={index}>{paragraph}</p>
                        ))}
                        <div className="flex flex-wrap -mx-4 mb-10  text-[darkblue]">
                            <div className="w-full lg:w-1/2 px-4">
                                <h6 className="mb-3 flex items-center"><i className="fas fa-check-circle mr-2 text-pink-400"></i>Language Practicing</h6>
                                <h6 className="mb-3 flex  items-center"><i className="fas fa-check-circle mr-2 au"></i>Learn History</h6>
                                <h6 className="mb-3 flex text-[#00008b ] items-center"><i className="fas fa-check-circle mr-2 text-color1 -600  "></i>Learn Art and Music</h6>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <h6 className="mb-3 text-[ #090a4a] flex items-center"><i className="fas fa-check-circle mr-2 text-blue-500"></i>Highly Secured</h6>
                                <h6 className="mb-3 text-[ #090a4a] flex items-center"><i className="fas fa-check-circle mr-2 au"></i>Friendly Environment</h6>
                                <h6 className="flex text-[ #090a4a] items-center"><i className="fas fa-check-circle mr-2 text-secondary"></i>Qualified Teacher</h6>
                            </div>
                        </div>
                        <a href="about.html" className=" bg-color1 -600  px-10 py-4 mt-4 border-2 btn2 ">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
     
<button onClick={toggleForm}>X</button>
  {showForm &&(  <div className='bg-black/60 ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm} className=' text-red-600 text-4xl mx-[95%]'>X</button>
  {showForm && (
        <ProgramForm onSubmit={onSubmit} about_link={about_link} initialValues={editingProgram || {}} />
      )}
   
    </div>
    
)};
    </div>
    </div>
    </div>
  );
};

export default About;
function ProgramForm({ onSubmit, initialValues ,about_link }) {
    const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_description,about_description_am,about_imgurl } = useStore();
    const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  

  const { register, handleSubmit, reset } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
    <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
      <h1 className='text-3xl text-center font-bold text-blue-500'>About Us</h1>
      <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)}>
        {/* Title and Amharic Title */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='font-semibold'>Title</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('title', { value: about.title })} placeholder="Title" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Title in Amharic</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('title_am', { value: about.title_am })} placeholder="አርእስት" />
          </div>
        </div>
  
        {/* Subtitle and Amharic Subtitle */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='font-semibold'>Subtitle</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('subtitle', { value: about.subtitle })} placeholder="Subtitle" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Subtitle in Amharic</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('subtitle_am', { value: about.subtitle_am })} placeholder="Subtitle in Amharic" />
          </div>
        </div>
  
        {/* Video Link and Image Upload */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='font-semibold'>Video Link</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('video_link', { value: about.video_link })} placeholder="Video URL" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Image</label>
            <input className='form-input border border-blue-300 rounded-md p-2' type="file" {...register('img')} />
          </div>
        </div>
  
        {/* Description and Amharic Description */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='font-semibold'>Description</label>
            <textarea className='form-input border border-blue-300 rounded-md p-2 h-48' {...register('description', { value: about.description })} placeholder="Description" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Description in Amharic</label>
            <textarea className='form-input border border-blue-300 rounded-md p-2 h-48' {...register('description_am', { value: about.description_am })} placeholder="መግለጫ" />
          </div>
        </div>
  
        {/* Submit Button */}
        <div className='flex justify-center pt-10'>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-full max-w-xs'>
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
   );
}