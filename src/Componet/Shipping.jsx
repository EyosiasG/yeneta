
import React, { useState, useEffect } from 'react';
import Hero1 from '../assets/img/abvid.webp';
import bar from '../assets/img/bar.jpg';
import { useLocation } from 'react-router-dom';
import CheckoutButton from './Dashboard/PaymentForm';
import axios from 'axios';
import swal from 'sweetalert2';
import useStore from '../store/store';
import { useForm } from 'react-hook-form';
function Shipping() {
    const [email, setEmail] = useState('');
    const [Fname, setFName] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    const location = useLocation();
    const { id, name, price } = location.state || {};
    const setBg = useStore((state) => state.setBg);
    const onSubmit = async (data) => {
        setBg(true);
        try {
          // Attempt to post data to the server
          const response = await axios.post(`${import.meta.env.VITE_API}/api/Order`, { ...data, name, price });
      
       console.log(response.data);
          if (response.data.status === 1) {
            // Display success alert.
        
            swal.fire({
              title: "Success",
              text: "You've successfully Registered!",
              icon: "success",
              confirmButtonColor: "teal",
            });
            
            setEmail( data.email);
            setFName( data.first_name + ' ' + data.last_name);
       
          
            setIsPurchaseOpen(true);
    
            reset(); // Reset form fields
            setBg(false);
          } else {
            // If the response status is not successful, display an error alert
            alert(response.data.errors ,"www");
            swal.fire({
                title: "Error",
                text: "Form was not submitted",
                icon: "error",
                confirmButtonColor: "teal",
              });
              setBg(false);
          }
        } catch (error) {
          
    
          // Handle any errors that occur during the submission
          console.error("Failed to save data", error.response.data.errors.email);
          swal.fire({
            title: "Error",
            text: error.response.data.errors.email,
            icon: "error",
            confirmButtonColor: "teal",
          });
          setBg(false);
          alert("Data not saved. Please check the form data and try again.",response.data.errors);
        }
      };

      function Modal({ isOpen, setIsOpen, title, children }) {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg  shadow-lg w-fit max-w-[60vw] mx-4">
              <div className='flex justify-between flex-row'> <h1>.</h1>    <h2 className="text-2xl   font-bold mb-2 ">{title}</h2>    <button onClick={() => setIsOpen(false)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        X
                    </button></div>
                    <p className='  text-white'>{children}</p>
                  
                </div>
            </div>
        );
    }
    

    return (
        <>
   <div className=" bg-cover bg-center py-20 " style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${Hero1})` }}>

        <h1 className='text-center display-1 font-poppins text-3xl py-8 text-secondary  '>Shipping Info </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6  shadow-lg rounded-lg max-w-2xl mx-auto  border md:max-w-4xl">
        <h1 className='text-center display-1 text-2xl py-2 text-secondary mb-2'> Shipping Form </h1>

        <h1 className=' py-3 text-xl display-1 text-secondary'>Client Details</h1>
        <div className=" border border-secondary font-normal px-4 rounded-md py-3"> 
        <div className="flex flex-row justify-around w-full font-bold pt-2 gap-2"> 
        <div className="mb-4 w-full ">
            <label htmlFor="first_name">First Name:</label>
            <input {...register('first_name', { required: true })}
                         className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Enter Your First Name"
                aria-label="First Name"/>
            {errors.first_name && <span className="text-red-500 text-xs">Don't forget your first name!</span>}
        </div>

        <div className="mb-4 w-full ">
            <label htmlFor="last_name">Last Name:</label>
            <input {...register('last_name', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Last Name Here"
                aria-label="Last Name"/>
            {errors.last_name && <span className="text-red-500 text-xs">Your last name is missing!</span>}
        </div>
        </div>
        <div className="flex flex-row justify-around w-full font-bold pt-2 gap-2"> 
        <div className="mb-4 w-full ">
            <label htmlFor="email">Email Address:</label>
            <input {...register('email', { required: true })}
                className="w-full p-2 border md:w-full border-secondary font-normal rounded mt-1"
                placeholder="Your Email Address"
                aria-label="Email"/>
            {errors.email && <span className="text-red-500 text-xs">We need your email!</span>}
        </div>

        <div className="mb-4 w-full font-bold ">
            <label htmlFor="phone">Phone Number:</label>
            <input {...register('phone', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Phone Number"
                aria-label="Phone"/>
            {errors.phone && <span className="text-red-500 text-xs">Your phone number is required!</span>}
        </div>
        </div>
        </div>
        {/* shipping info*/} 
        

        <h1 className=' py-3 text-xl display-1 text-secondary'>Shipping Details</h1>
        <div className=" shadow-inner rounded-lg border border-secondary p-4 font-bold"> 
        <div className="mb-4">
            <label htmlFor="address1">Address Line 1:</label>
            <input {...register('address1', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Address Line 1"
                aria-label="Address 1"/>
            {errors.address1 && <span className="text-red-500 text-xs">Address Line 1 is a must!</span>}
        </div>

        <div className="mb-4">
            <label htmlFor="address2">Address Line 2 (Optional):</label>
            <input {...register('address2')}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Address Line 2 (Optional)"
                aria-label="Address 2"/>
        </div>

        <div className="mb-4">
            <label htmlFor="city">City Name:</label>
            <input {...register('city', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="City Name"
                aria-label="City"/>
            {errors.city && <span className="text-red-500 text-xs">City is a required field!</span>}
        </div>

        <div className="mb-4">
            <label htmlFor="state">State Name:</label>
            <input {...register('state', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="State Name"
                aria-label="State"/>
            {errors.state && <span className="text-red-500 text-xs">State is mandatory!</span>}
        </div>

        <div className="mb-4">
            <label htmlFor="zipcode">Zipcode:</label>
            <input {...register('zipcode', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Zipcode Here"
                aria-label="Zipcode"/>
            {errors.zipcode && <span className="text-red-500 text-xs">Don't forget the Zipcode!</span>}
            </div>
            </div>
        
        <div className="mb-4">
            <label htmlFor="Signature">Signature:</label>
            <input {...register('Signature', { required: true })}
                className="w-full p-2 border border-secondary font-normal rounded mt-1"
                placeholder="Full Name"
                aria-label="Signature"/>
            {errors.Signature && <span className="text-red-500 text-xs">Don't forget the Signature!</span>}
        </div>

            {/* New mandatory agreement checkbox */}
            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input type="checkbox" {...register('agreement', { required: true })}
                        className="text-blue-600 border-secondary font-normal rounded focus:ring-blue-500"/>
                    <span className="ml-2 text-xl text-gray-600">
                        I agree to the <button type="button" onClick={() => setIsTermsOpen(true)} className="text-blue-600 underline text-xl">Terms and Conditions</button>
                    </span>
                </label>
                {errors.agreement && <span className="text-red-500 text-xs">You must agree to the terms before submitting.</span>}
            </div>

        

            <button type="submit" className="w-full bg-secondary hover:bg-secondary/80 display-1 text-white font-bold py-2 px-4 rounded">
                Let's Go!
            </button>


            {/* Modals */}
            <Modal isOpen={isTermsOpen} setIsOpen={setIsTermsOpen} title="Terms and Conditions">
  <div className="p-4 h-[90vh] overflow-scroll text-black ">
    <h2 className="text-2xl font-bold mb-4">Terms and Conditions for Yeneta Language and Cultural Academy</h2>
    <p className=" text-black mb-2"><strong>Introduction</strong></p>
    <p className=" text-black mb-4">
      Welcome to Yeneta Language and Cultural Academy. These terms and conditions ("Terms") apply to the use of our website for buying and selling products. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our website.
    </p>
    <p className="mb-2"><strong>1. General</strong></p>
    <p className=" text-black mb-2">1.1. These Terms govern your use of our website and the purchase and sale of products through our website.</p>
    <p className="mb-4">1.2. We may update these Terms from time to time. The updated Terms will be effective as soon as they are posted on our website.</p>
    <p className="mb-2"><strong>2. User Accounts</strong></p>
    <p className="mb-2">2.1. To purchase or sell products on our website, you must create an account.</p>
    <p className="mb-2">2.2. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
    <p className="mb-4">2.3. You agree to provide accurate and complete information when creating an account and to update your information as necessary.</p>
    <p className="mb-2"><strong>3. Purchasing Products</strong></p>
    <p className="mb-2">3.1. When you purchase a product through our website, you agree to pay the price listed for the product and any applicable shipping and handling charges.</p>
    <p className="mb-2">3.2. We reserve the right to cancel any order for any reason, including but not limited to product availability, errors in the description or price of the product, or errors in your order.</p>
    <p className="mb-4">3.3. You will receive an email confirmation once your order has been accepted. This confirmation constitutes our acceptance of your order.</p>
    <p className="mb-2"><strong>4. Selling Products</strong></p>
    <p className="mb-2">4.1. To sell products on our website, you must comply with our seller guidelines, which are available on our website.</p>
    <p className="mb-2">4.2. You are responsible for ensuring that the products you sell comply with all applicable laws and regulations.</p>
    <p className="mb-2">4.3. You agree to accurately describe the products you sell and to provide any necessary information to potential buyers.</p>
    <p className="mb-4">4.4. You are responsible for shipping the products to buyers in a timely manner and for providing accurate shipping information.</p>
    <p className="mb-2"><strong>5. Payments</strong></p>
    <p className="mb-2">5.1. Payments for products purchased through our website will be processed through our secure payment gateway.</p>
    <p className="mb-2">5.2. You agree to provide valid payment information and authorize us to charge your payment method for the total amount of your order.</p>
    <p className="mb-4">5.3. Sellers will receive payment for sold products minus any applicable fees.</p>
    <p className="mb-2"><strong>6. Returns and Refunds</strong></p>
    <p className="mb-2">6.1. Our return and refund policy is available on our website. By purchasing products through our website, you agree to our return and refund policy.</p>
    <p className="mb-4">6.2. If you are a seller, you agree to honor our return and refund policy and to accept returns and issue refunds as required.</p>
    <p className="mb-2"><strong>7. Intellectual Property</strong></p>
    <p className="mb-2">7.1. All content on our website, including text, graphics, logos, and images, is the property of Yeneta Language and Cultural Academy or our licensors and is protected by intellectual property laws.</p>
    <p className="mb-4">7.2. You may not use any content from our website without our express written permission.</p>
    <p className="mb-2"><strong>8. Limitation of Liability</strong></p>
    <p className="mb-4">
      8.1. To the maximum extent permitted by law, Yeneta Language and Cultural Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of our website or the purchase or sale of any products through our website.
    </p>
    <p className="mb-2"><strong>9. Indemnification</strong></p>
    <p className="mb-4">
      9.1. You agree to indemnify and hold harmless Yeneta Language and Cultural Academy and its affiliates, officers, agents, and employees from any claim, demand, loss, or damage, including reasonable attorneys' fees, arising out of or related to your use of our website, your purchase or sale of products through our website, or your violation of these Terms.
    </p>
    <p className="mb-2"><strong>10. Governing Law</strong></p>
    <p className="mb-4">
      10.1. These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Yeneta Language and Cultural Academy is located, without regard to its conflict of law principles.
    </p>
    <p className="mb-2"><strong>11. Dispute Resolution</strong></p>
    <p className="mb-4">
      11.1. Any disputes arising out of or related to these Terms or your use of our website shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
    </p>
    <p className="mb-2"><strong>12. Contact Information</strong></p>
    <p className="mb-4">
      12.1. If you have any questions about these Terms, please contact us at:<br />
      Phone: +1 240 353 4436, +1 240 374 8205<br />
      Email: info@yenetaschool.com, admission@yenetaschool.com
    </p>
    <p className="mb-4">
      By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
    </p>
  </div>
</Modal>
            <Modal isOpen={isPurchaseOpen} setIsOpen={setIsPurchaseOpen} title="">
  <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl w-full mx-auto mt-10 border border-gray-300">
    <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Confirm Your Purchase</h2>
    <div className="text-black">
     <span className='text-secondary font-semibold'> Please verify the information below before finalizing your purchase.</span>
      <div className="space-y-2 mt-4">
        <p><strong className="text-gray-500">Transaction ID:</strong> {id}</p>
        <p><strong className="text-gray-500">Product Name:</strong> { <div className="border p-2">{name.split('/').filter(Boolean).map((str, index) => <span key={index}>{str}{index < name.split('/').filter(Boolean).length - 1 ? <br/> : ''}</span>)}</div>}</p>
        <p><strong className="text-gray-500">Amount Due:</strong> ${price}</p>
        <p><strong className="text-gray-500">Email:</strong> {email}</p>
        <p><strong className="text-gray-500">Buyer:</strong> {Fname}</p>
      </div>
      <div className="mt-4 flex justify-center items-center bg-green-500 text-white transition-transform transform hover:scale-105 hover:bg-green-600 mx-auto font-bold text-lg rounded-md px-4 py-2 w-full sm:w-auto"
           onClick={() => localStorage.removeItem('shoppingCart')}>
        <CheckoutButton type="2" email={email} productName="Yeneta Products" amount={price * 100} />
      </div>
    </div>
  </div>
</Modal>

    </form>
    </div>
    </>
    );
}

export default Shipping;
