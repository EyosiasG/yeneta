import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useForm } from 'react-hook-form';
import bg from '../assets/img/abvid.jpeg'
import bg1 from '../assets/img/part2.png'
import swal from 'sweetalert2';

function Partnership() {
    const { en  } = useStore();
    const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
    const { register, handleSubmit, formState: { errors } ,reset } = useForm();
    const [message, setMessage] = useState(true);
  
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
          swal.fire({
            title: "Success",
            text: "Your Partnership Request Were sent successfully!",
            icon: "success",
            confirmButtonColor: "teal",
          });
          reset();
        } catch (error) {
          swal.fire({
            title: "Error",
            text: "Failed to send ",
            icon: "error",
            confirmButtonColor: "teal",
          });
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
            <svg width="400" height="100">
                {[...Array(40)].map((_, i) => (
                    [...Array(10)].map((_, j) => (
                        <circle 
                            key={`${i}-${j}`}
                            cx={i * 10 + 5} 
                            cy={j * 10 + 5} 
                            r="2" 
                            fill="#2DD4BF"
                        />
                    ))
                ))}
            </svg>

            <div className="max-w-full rounded-xl px-4 sm:px-5 md:px-5 lg:px-20 shadow-2xl shadow-color1 mx-2 sm:mx-5 md:mx-20 mt-2 py-5 bg-cover my-10" style={{ backgroundImage: `linear-gradient(rgba(250,250, 250, 0.6), rgba(255, 255, 255, 0.7)), url(${bg})`}}>
                <div className="py-5">
                    <div className="p-5 rounded">
                        <div className="mx-auto text-center" style={{ maxWidth: "700px" }}>
                            <h4 className="text-color1 display-1 mb-4 border-b-2 border-color1 text-2xl md:text-4xl inline-block p-2 rounded">Partnership</h4>
                            <h1 className="text-3xl md:text-5xl font-bold display-1 text-secondary">Contact Us for Partnership</h1>
                        </div>
                        <div className="flex lg:flex-row flex-col gap-5 w-full m-5">
                            <form onSubmit={handleSubmit(onSubmit1)} className="space-y-2 w-full md:w-[40rem]  md:mx-10">
                                <h1 className='text-3xl display-1 text-color1 text-center p-2'>Apply for Partnership</h1>
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
                                    {...register("phone", { required: "Phone is required" })} 
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
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                                <textarea 
                                    placeholder="Your Message" 
                                    {...register("message", { required: "Message is required" })} 
                                    rows="6"
                                    className="w-full py-3 px-4 mb-5 border-2 rounded-2xl border-color1"
                                />
                                {errors.message && <p className="text-red-600">{errors.message.message}</p>}
                                <button 
                                    type="submit" 
                                    className="w-full py-3 text-white text-lg font-bold mb-10 bg-color1 hover:bg-color1/60 rounded-2xl"
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="border border-color1-600 rounded">
                                <img src={bg1} className='rounded shadow-2xl border-l-secondary' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <svg width="400" height="100">
                {[...Array(40)].map((_, i) => (
                    [...Array(10)].map((_, j) => (
                        <circle 
                            key={`${i}-${j}`}
                            cx={i * 10 + 5} 
                            cy={j * 10 + 5} 
                            r="2" 
                            fill="#2DD4BF"
                        />
                    ))
                ))}
            </svg>
        </>
    );
}
  
export default Partnership;
