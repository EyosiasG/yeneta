import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useForm } from 'react-hook-form';
import bg from '../assets/img/abvid.webp'
import bg1 from '../assets/img/part2.png'
import swal from 'sweetalert2';



function ContactUs() {
    const { en  } = useStore();
    const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
    const { register, handleSubmit, formState: { errors } ,reset } = useForm();
const [message, setMessage] = useState(true);
  const onSubmit = async (data) => {
    console.log(data);
   
    try {
      // Adding a new student
      await fetch(`${import.meta.env.VITE_API}/api/Messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
   
      swal.fire({
        title: "Success",
        text: "Your Message Were sent successfully!",
        icon: "success",
        confirmButtonColor: "teal",
      });
reset();
    } catch (error) {
      swal.fire({
        title: "Error",
        text: "Failed to save data",
        icon: "error",
        confirmButtonColor: "teal",
      });
    }
  };

  const onSubmit1 = async (data) => {
    console.log(data);
   
    try {
      // Adding a new student
      await fetch(`${import.meta.env.VITE_API}/api/Partner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

    useEffect(() => {
         async function contactus() {
        const allRides = `${import.meta.env.VITE_API}/api/contactus`;
    
        try {
            const response = await fetch(allRides, {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
    
            if (data.status === 1) {
                setA_Contactus(data.data);
                console.log(a_Contactus,"tas");
                return;
            }
        } catch (error) {
            console.error("Error fetching contactus data:", error);
        }
    }
        contactus();
    }, []);
   
    
    return (
        <>

<div className="max-w-full rounded-xl px-4 sm:px-5 md:px-5 lg:px-20 min-h-[75vh] shadow-2xl shadow-color1 mx-2 sm:mx-5 md:mx-20 mt-2 py-5" style={{ backgroundImage: `linear-gradient(rgba(0,0, 0, 0.5), rgba(5, 5, 5, 0.6)), url(${bg})`}}>
  <div className="py-5">
    {a_Contactus.map((contact, index) => (
      <div key={index}>
        <div className="p-5 rounded">
          <div className="mx-auto text-center" style={{ maxWidth: "700px" }}>
          <h4 className="mb-4 inline-block p-2 border-b-4 border-color1 -500 text-color1 -600   text-3xl rounded-l-3xl rounded-r-md">
              {en ? "Contact us" : "s"}
            </h4>    <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mt-2">Contact us any time</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-1 pt-5 lg:gap-10 mb-5">
            {/* Address Box */}
            <div className="flex flex-col justify-center items-center text-color1  p-4 rounded-2xl bg-white/70 shadow-2xl shadow-secondary">
              <i className="fas fa-map-marker-alt fa-6x  text-secondary mr-4 mb-4  md:mb-10"></i>
              <p className='text-md  xl:text-xl text-color1 font-bold text-center'>11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901</p>
            </div>
            {/* Email Box */}
   
            <div className="flex flex-col justify-center items-center text-color1  p-4 rounded-2xl bg-white/70 shadow-2xl shadow-secondary">
     
              <i className="fas fa-envelope fa-6x text-secondary mr-4 mb-4 md:mb-10"></i>
              <p className='text-md  xl:text-xl text-color1 font-bold text-center'>info@yenetaschool.com</p>
              <p className='text-md  xl:text-xl text-color1 font-bold'>admission@yenetaschool.com</p>
            </div>
            {/* Phone Box */}
            <div className="flex flex-col items-center  p-4 rounded-2xl bg-white/70 shadow-2xl shadow-secondary">
              <i className="fa fa-phone-alt fa-6x text-secondary  mb-4 md:mb-10"></i>
              <p className='text-md  xl:text-xl text-color1 font-bold text-center'>+12403748205</p>
              <p className='text-md  xl:text-xl text-color1 font-bold text-center'>+12403534436</p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col  gap-5 px-0  ">
            {message ? (
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full w-[80rem]">
              <h1 className='text-5xl display-1 text-color1 text-center py-6'>Send us a message!</h1>
              <input 
                type="text" 
                placeholder="Your Name" 
                {...register("name", { required: "Name is required" })} 
                className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1 shadow-2xl shadow-secondary"
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} 
                className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1 shadow-2xl shadow-secondary"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        
              <textarea 
                placeholder="Your Message" 
                {...register("message", { required: "Message is required" })} 
                rows="6"
                className="w-full py-3 px-4 mb-5 border-2 rounded-2xl h-[13rem] border-color1 shadow-2xl shadow-secondary"
              />
              {errors.message && <p className="text-red-600">{errors.message.message}</p>}
        
              <button 
                type="submit" 
                className="w-full py-3 text-white text-lg font-bold  bg-color1 hover:bg-color1/60 rounded-2xl"
              >
                Submit
              </button>
              </form>
          
            ):(


              <form onSubmit={handleSubmit(onSubmit1)} className="space-y-2 w-full max-w-md mx-auto ">
                <h1 className='text-3xl display-1 text-color1 text-center'> Apply for Partnership</h1>
      <input 
        type="text" 
        placeholder="Company Name" 
        {...register("companyName", { required: "Company Name is required" })} 
        className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1"
      />
      {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      <input 
        type="tel" 
        placeholder="Phone Number" 
        {...register("Phone", { required: "phone is required" })} 
        className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1"
      />
      {errors.name && <p className="text-red-600">{errors.name.message}</p>}

      <input 
        type="email" 
        placeholder="Enter Your Email" 
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })} 
        className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1"
      />
      {errors.email && <p className="text-red-600 ">{errors.email.message}</p>}

      <textarea 
        placeholder="Your Message" 
        {...register("message", { required: "Message is required" })} 
        rows="6"
        className="w-full py-3 px-4 mb-5 border-2 h-[45rem] rounded-2xl border-color1"
      />
      {errors.message && <p className="text-red-600">{errors.message.message}</p>}

      <button 
        type="submit" 
        className="w-full py-3 text-white text-lg font-bold mb-10 bg-color1 hover:bg-color1/60 rounded-2xl"
      >
        Submit
      </button>
      <a className=" text-teal-500 hover:text-red-500 mt-10 pl-44" onClick={() => setMessage(true)}> send message ?</a>
    </form>
  
            )};
                    <div className="border w-full border-color1-600 rounded">
                    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.9845129463765!2d-76.99392282415765!3d39.038472538367955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c59915fa1ecb%3A0x77e93422be96baa3!2s11249%20Lockwood%20Dr%20suite%20c%2C%20Silver%20Spring%2C%20MD%2020901%2C%20USA!5e0!3m2!1sen!2set!4v1716233604388!5m2!1sen!2set"
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe> </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      
        </>
        );
  }
  
  export default ContactUs;
  