import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import swal from 'sweetalert2';

function ContactUs() {
  const { en } = useStore();
  const { a_Contactus, setA_Contactus } = useStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [activeForm, setActiveForm] = useState('message');

  const onSubmit = async (data) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/api/Messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      swal.fire({
        title: "Success", 
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#0D9488",
      });
      reset();
    } catch (error) {
      swal.fire({
        title: "Error",
        text: "Failed to send message",
        icon: "error",
        confirmButtonColor: "#0D9488",
      });
    }
  };

  const onPartnershipSubmit = async (data) => {
    try {
      await fetch(`${import.meta.env.VITE_API}/api/Partner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      swal.fire({
        title: "Success",
        text: "Partnership request submitted successfully!",
        icon: "success",
        confirmButtonColor: "#0D9488",
      });
      reset();
    } catch (error) {
      swal.fire({
        title: "Error",
        text: "Failed to submit request",
        icon: "error",
        confirmButtonColor: "#0D9488",
      });
    }
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/contactus`);
        if (!response.ok) throw new Error("Failed to fetch contact info");
        const data = await response.json();
        if (data.status === 1) {
          setA_Contactus(data.data);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%">
          {[...Array(40)].map((_, i) => (
            [...Array(40)].map((_, j) => (
              <circle 
                key={`${i}-${j}`}
                cx={i * 50} 
                cy={j * 50} 
                r="1"
                fill="#0D9488"
                opacity="0.1"
              />
            ))
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <svg width="200" height="8" className="mb-6">
              <line x1="0" y1="4" x2="200" y2="4" stroke="#0D9488" strokeWidth="2" strokeDasharray="10,5"/>
            </svg>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {en ? "Get in Touch" : "ያግኙን"}
            </h1>
            <svg width="200" height="8">
              <line x1="0" y1="4" x2="200" y2="4" stroke="#0D9488" strokeWidth="2" strokeDasharray="10,5"/>
            </svg>
          </div>
          <p className="text-lg text-gray-600 mt-6">
            {en ? "We'd love to hear from you. Let us know how we can help." : "እንዴት ልንረዳዎት እንችላለን?"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FaMapMarkerAlt className="w-8 h-8" />,
              title: "Visit Us",
              content: "11249 LOCKWOOD DR, SUITE C, SILVER SPRING, MARYLAND 20901"
            },
            {
              icon: <FaEnvelope className="w-8 h-8" />,
              title: "Email Us",
              content: ["info@yenetaschool.com", "admission@yenetaschool.com"]
            },
            {
              icon: <FaPhoneAlt className="w-8 h-8" />,
              title: "Call Us",
              content: ["+1 (240) 374-8205", "+1 (240) 353-4436"]
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
            >
              {/* Decorative corner SVGs */}
              <svg width="40" height="40" className="absolute top-0 left-0 text-teal-100">
                <path d="M0 0 L40 0 L40 40" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <svg width="40" height="40" className="absolute bottom-0 right-0 text-teal-100">
                <path d="M40 40 L0 40 L0 0" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>

              <div className="text-teal-600 mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p key={i} className="text-gray-600">{line}</p>
                ))
              ) : (
                <p className="text-gray-600">{item.content}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg relative"
          >
            {/* Decorative SVG waves */}
            <svg className="absolute top-0 right-0 w-32 h-32 text-teal-50" viewBox="0 0 100 100">
              <path d="M0 0 C30 20, 70 20, 100 0 L100 100 L0 100" fill="currentColor"/>
            </svg>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setActiveForm('message')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  activeForm === 'message' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => setActiveForm('partnership')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  activeForm === 'partnership' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Partnership
              </button>
            </div>

            {activeForm === 'message' ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    {...register("message", { required: "Message is required" })}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onPartnershipSubmit)} className="space-y-6 relative z-10">
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register("companyName", { required: "Company name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.companyName && <p className="mt-1 text-red-500 text-sm">{errors.companyName.message}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Business Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="Tell us about your partnership proposal"
                    {...register("message", { required: "Message is required" })}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  Submit Proposal
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg relative"
          >
            {/* Decorative corner SVGs */}
            <svg width="60" height="60" className="absolute top-0 left-0 text-teal-500 opacity-20">
              <circle cx="0" cy="0" r="60" fill="currentColor"/>
            </svg>
            <svg width="60" height="60" className="absolute bottom-0 right-0 text-teal-500 opacity-20">
              <circle cx="60" cy="60" r="60" fill="currentColor"/>
            </svg>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.9845129463765!2d-76.99392282415765!3d39.038472538367955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c59915fa1ecb%3A0x77e93422be96baa3!2s11249%20Lockwood%20Dr%20suite%20c%2C%20Silver%20Spring%2C%20MD%2020901%2C%20USA!5e0!3m2!1sen!2set!4v1716233604388!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;