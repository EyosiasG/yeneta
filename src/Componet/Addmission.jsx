
import React, { useState, useEffect } from 'react';

import bar from '../assets/img/bar.jpg'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import CheckoutButton from './Dashboard/PaymentForm';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert2';
import useStore from '../store/store';
import CheckoutButton1 from './Dashboard/CheckoutButton1';


function AdmissionForm() {
  const [admission, setAdmission] = useState(true);
  const [add, setAdd] = useState(false);
  const {bg , setBg} = useStore();
  const [sat, setsat] = useState("https://buy.stripe.com/28o9C6eKj3fW86scN8");
  const [uni, setUni] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [parnetname, setParnetname] = useState("");
  const [price1, setprice1] = useState("");
  const [price2,  setprice2] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const location = useLocation();
  const { sid, title, startDate, endDate, price ,P1,P2 ,P3,P4 , f3, f3d, f4d, f4,time  } = location.state || {}; // Default to an empty object if state is undefined
  const {id,setId, name,setName ,email,setEmail,  setTitle, enddates, setEndDates, startdates ,setStartDates , setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  console.log(time,"this is the time");
  
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    DOB: '',
    sex: '',
    Email: '',
    fatherPhoneNumber: '',
    parentFullName: '',
    parentEmail: '',
    motherPhoneNumber: '',
    emergencyphoneNumber:'',
    emergencycontact:'',
    address:'',
    course: ''
  });
  const [triggerPay, setTriggerPay] = useState(false);
  console.log();console.log(P4);
  //{/*
  const [siblings, setSiblings] = useState([]); // State to hold siblings' information
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [discountedPrice1, setDiscountedPrice1] = useState(P3);
  const [disLnik, setDisLnik] = useState("4"); // State to hold the discounted price
  const [readyToPay, setReadyToPay] = useState(false);
  useEffect(() => {
    if (siblings.length > 0) {
      applySiblingDiscount();
      
    }
    else{
      setDiscountedPrice(price);
      setDiscountedPrice1(P3);
      
    }
  }, [siblings]);
//*/}
useEffect(() => {
  if (triggerPay) {
    if (siblings.length > 0) {
      applySiblingDiscount();
      
    }
    else{
      setDiscountedPrice(price);
      setDiscountedPrice1(P3);
      
    }
    //console.log(discountedPrice,"last type")
    if (readyToPay) {
      const e ="2";
      handlepay(e);
      setReadyToPay(false); // Reset the trigger after payment is handled
    }
    setTriggerPay(false); // Reset the trigger
  }
}, [triggerPay, id, name]); // Depend on triggerPay and any other relevant state
useEffect(() => {
  if (readyToPay) {
    const e ="2";
    handlepay(e);
    setReadyToPay(false); // Reset the trigger after payment is handled
  }
}, [readyToPay]); // This effect runs when readyToPay changes

const preparePayment = (q) => {
  if (q > 0) {
    setDisLnik("9");
  } else {
    setDisLnik("8");
  }
  // Set readyToPay to true to trigger the payment process in useEffect
  setReadyToPay(true);
};

const logDetails = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/api/showbyid/${data.studentId}`);
    if (response.ok) {
      const studentData = await response.json();
      if (studentData.status === 0) {
        swal.fire({
          title: "Error",
          text: "No student found with this ID",
          icon: "error",
          confirmButtonColor: "teal",
        });
      } else {
        swal.fire({
          title: "Success",
          text: "Your student ID is valid. You can proceed to finalize your payment.",
          icon: "success",
          confirmButtonColor: "teal",
        });
        setEmail(studentData.data.email);
        setName(studentData.data.first_name + ' ' + studentData.data.last_name);
        setId(studentData.data.uuid);
        setParnetname(studentData.data.parent_name);
        //setprice1(P1);
        //setprice2(P2);
        //console.log(P1);
        //console.log(P2);
        checkSiblings(studentData.data.parent_name); // Check for siblings
        setTriggerPay(true); // Set the trigger to initiate payment handling in useEffect
      }
    } else {
      console.error("Failed to fetch student details");
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
  }
};
//{/*
const checkSiblings = async (parentEmail) => {   
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/api/siblings?end_date=${parentEmail}`);
    if (response.ok) {
      const siblingsData = await response.json();
      setSiblings(siblingsData.data);
      if (siblingsData.length > 0) {
        setDisLnik(P2);
        console.log("2");
      } else {
        setDisLnik(P1);
        console.log("1");
      }
     
        setReadyToPay(true); // Reset the trigger after payment is handled
     
     
    } else {
      console.error("Failed to fetch siblings");
    }
  } catch (error) {
    console.error("Error fetching siblings:", error);
  }
};

const applySiblingDiscount = () => {
  if (siblings.length === 1) {
    const discount = price - 10; // 10% discount per sibling
   // const newPrice = price - discount;
    setDiscountedPrice(discount);
    setDiscountedPrice1(P4);
    setDisLnik(P2);
  }else  if(siblings.length === 2) {
    const discount = price - 20; // 10% discount per sibling
   // const newPrice = price - discount;
    setDiscountedPrice(discount);
    setDiscountedPrice1(f3);
    setDisLnik(f3d);
  }else  if(siblings.length >= 3) {
    const discount = price - 30; // 10% discount per sibling
  //  const newPrice = price - discount;
    setDiscountedPrice(discount);
    setDiscountedPrice1(f4);
    setDisLnik(f4d);
  }
};
//*/}

  const onSubmit = async (data) => {
   setBg(true);
    try {
      // Attempt to post data to the server
      const response = await axios.post(`${import.meta.env.VITE_API}/api/Students`, data);
  
      console.log(response.data.id,"wdwd");
    
    console.log(response)
      if (response.data.status === 1) {
        // Display success alert.
    
        swal.fire({
          title: "Success",
          text: "You've successfully Registered!",
          icon: "success",
          confirmButtonColor: "teal",
        });
        
        setEmail( data.email);
        setName( data.first_name+ ' ' + data.last_name );
        setId( response.data.id);
        setParnetname(data.parent_name);
       // setprice1(data.P1);
       // setprice2(data.P2);
        checkSiblings(data.parent_name); // Check for siblings
        console.log("before");
        setTriggerPay(true); // Set the trigger to initiate payment handling in useEffect
        console.log("After");
        reset(); // Reset form fields
        setBg(false);
      } else {
        // If the response status is not successful, display an error alert
        alert(response.data.errors ,"www");
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
  

  const handlesit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/nosit/${sid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
        }),
      });
      
      if (response.ok) {
        handleSubmit(sid);
      
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  const handlepay = async (e) => {
 
    console.log(e,"we belive in god");
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/RegisteredStudents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StudentId: id,
          Name: name,
          Course: title,
          start_date: startDate,
          end_dat: endDate,
          Semester: email,
          end_date: parnetname,
          time: time,
          sublink:disLnik,
        }),
      });
      console.log('Form data submitted:', discountedPrice);
      if (response.ok) {
        handlesit(sid);
        if (title !== 'Special class') {
          setShowForm(true);
          console.log(title,"11")
        }
        console.log(title)
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };
  const handlereg = () => {
    fetch(`${import.meta.env.VITE_API}/api/Student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          console.log("Data saved successfully!");
        } else {
          throw new Error('Failed to save data');
        }
      })
      .catch(error => console.error("Failed to save data", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    handlereg(); 
    console.log('Form data submitted:', formData);
   
  };
  const handleadd = () => {
    
  setAdmission(false);
  setAdd(true);
    
    // Here you would typically handle the form submission, 
    // like sending the data to a server or validating the input.
  };
  const checkEmailUniqueness = (email) => {
    // Add your logic here to check if the email is unique
    // Return true if unique, false if not unique
    if (uni === true){
      
    }
  };
  const handleadd1 = () => {
    
    setAdmission(false);
    setAdd(false);
      
      // Here you would typically handle the form submission, 
      // like sending the data to a server or validating the input.
    };
  const sendLink = (email3) => {
    axios.get(`${import.meta.env.VITE_API}/api/SendLink?email=${email}&link=${discountedPrice1}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.data.status === 1) {
        swal.fire({
          title: 'Success',
          text: `Link sent successfully `,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
navigate('/programs');
      } else {
        swal.fire({
          title: 'Failed',
          text: 'Failed to send link',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      console.error('Error sending link:', error);
      swal.fire({
        title: 'Error',
        text: 'An error occurred while sending the link',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    });
  };


  return (
    < >
  
  <div className='relative'>
  <div className='h-56 bg-contain bg-repeat ' style={{backgroundImage: `url(${bar})`}}></div>
  
  <div className='flex flex-col justify-center items-center h-24 border-b-4 border-dashed border-indigo-300 rounded-lg'>
    <h1 className='font-bold text-indigo-700 text-xl md:text-3xl'>Admission Application</h1>
    <p className='text-sm md:text-base'>We promised you that, we always try to take care of your children.</p>
  </div>

  {admission ? (
    <div className="flex flex-col md:flex-row h-auto md:h-72 items-center justify-around mt-8">
      <div className='w-full md:w-[45%] mx-auto shadow-2xl rounded-lg hover:shadow-indigo-600 overflow-hidden border bg-white my-8 h-auto md:h-40 flex flex-col gap-5 justify-center items-center p-4'>
        <h1 className='font-normal display-1 text-center'>Applicant Information: Is the student a first-time applicant?</h1>
        <button onClick={handleadd} className='bg-indigo-700 display-1 px-3 py-2 rounded-2xl text-white text-lg border-2 transition-transform transform hover:scale-110 hover:bg-indigo-400'>Register Now!</button>
      </div>

      <div className='w-full md:w-[45%] mx-auto shadow-2xl rounded-lg overflow-hidden border hover:shadow-indigo-600 bg-white my-8 h-auto md:h-40 flex flex-col gap-5 justify-center items-center p-4'>
        <h1 className='font-normal text-center display-1'>Applicant Information: The student is already registered with Yeneta School</h1>
        <button onClick={handleadd1} className='bg-indigo-700 display-1 px-3 py-2 rounded-2xl text-white text-lg border-2 transition-transform transform hover:scale-110 hover:bg-indigo-400'>Use Student ID</button>
      </div>
    </div>
  ) : (
    <div>
      {add ? (
        <div className="form-container w-full flex justify-center mt-10 items-center border-l-4 border-r-4 border-indigo-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 shadow-lg w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-md border-t-4 border-indigo-700">
            <h1 className='text-2xl font-bold text-indigo-700 text-center'>Application Form</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="first_name" className="text-sm font-medium text-gray-700 capitalize">First Name:</label>
                <input 
                  type="text" 
                  {...register('first_name', { required: "First Name is required" })} 
                  placeholder="First Name" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.first_name ? 'border-red-500' : ''}`} 
                />
                {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="last_name" className="text-sm font-medium text-gray-700 capitalize">Last Name:</label>
                <input 
                  type="text" 
                  {...register('last_name', { required: "Last Name is required" })} 
                  placeholder="Last Name" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.last_name ? 'border-red-500' : ''}`} 
                />
                {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 capitalize">Email:</label>
                <input 
                  type="email" 
                  {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} 
                  placeholder="Email" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`} 
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="gender" className="text-sm font-medium text-gray-700 capitalize">Gender:</label>
                <select 
                  {...register('gender', { required: "Gender is required" })} 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.gender ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
              </div>
              
              <div className='flex flex-col gap-1'>
                <label htmlFor="dob" className="text-sm font-medium text-gray-700 capitalize">Date of Birth:</label>
                <input 
                  type="date" 
                  {...register('dob', { required: "Date of Birth is required" })} 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.dob ? 'border-red-500' : ''}`} 
                />
                {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="parent_name" className="text-sm font-medium text-gray-700 capitalize">Parent Name: <span className='text-red-600 text-xs'> Note it is mandatory to Enter Your ( first name and  last name   )</span> </label>
                <input 
                  type="text" 
                  {...register('parent_name', { required: "Parent Name is required", minLength: { value: 10, message: "Parent Name must be at least 10 characters long" } })} 
                  placeholder="Parent Full Name" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.parent_name ? 'border-red-500' : ''}`} 
                />
                {errors.parent_name && <p className="text-red-500">{errors.parent_name.message}</p>}

              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="parent_email" className="text-sm font-medium text-gray-700 capitalize">Parent Email:</label>
                <input 
                  type="email" 
                  {...register('parent_email', { required: "Parent Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} 
                  placeholder="Parent Email" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.parent_email ? 'border-red-500' : ''}`} 
                />
                {errors.parent_email && <p className="text-red-500">{errors.parent_email.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="mobile_number" className="text-sm font-medium text-gray-700 capitalize">Mobile Number:</label>
                <input 
                  type="tel" 
                  {...register('mobile_number', { required: "Mobile Number is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" } })} 
                  placeholder="Mobile Number" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.mobile_number ? 'border-red-500' : ''}`} 
                />
                {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="address" className="text-sm font-medium text-gray-700 capitalize">Address:</label>
                <input 
                  type="text" 
                  {...register('address', { required: "Address is required" })} 
                  placeholder="Address" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : ''}`} 
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="emergency_contact" className="text-sm font-medium text-gray-700 capitalize">Emergency Contact:</label>
                <input 
                  type="text" 
                  {...register('emergency_contact', { required: "Emergency Contact is required" })} 
                  placeholder="Emergency Contact" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.emergency_contact ? 'border-red-500' : ''}`} 
                />
                {errors.emergency_contact && <p className="text-red-500">{errors.emergency_contact.message}</p>}
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="emergency_contact_number" className="text-sm font-medium text-gray-700 capitalize">Emergency Contact Number:</label>
                <input 
                  type="tel" 
                  {...register('emergency_contact_number', { required: "Emergency Contact Number is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid contact number" } })} 
                  placeholder="Emergency Contact Number" 
                  className={`h-11 border px-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${errors.emergency_contact_number ? 'border-red-500' : ''}`} 
                />
                {errors.emergency_contact_number && <p className="text-red-500">{errors.emergency_contact_number.message}</p>}
              </div>

           
            </div>

            <div className='flex justify-center mt-8'>
              <button type="submit" className="py-3 px-8 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='mx-auto max-w-4xl shadow-2xl h-auto py-10 px-5 mt-10 rounded-xl'>
          <h1 className='text-center text-2xl '>Enter the Student ID</h1>
          <form onSubmit={handleSubmit(logDetails)} className='w-full'>
            <div className='w-full'>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID:</label>
              <input type="text" id="studentId" name="studentId" {...register("studentId", { required: "Student ID is required" })} className="mt-1 h-11 border px-4 block w-full rounded-md border-gray-300 shadow-sm" />
              {errors.studentId && <p className="text-red-500">{errors.studentId.message}</p>}
            </div>
            <div className='flex justify-center mt-10'>
              <button type="submit" className="py-2 px-4 w-full md:w-1/2 lg:w-1/3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">Submit</button>
            </div>
          </form>
          <button onClick={() => setAdd(true)} className='mt-4 block mx-auto text-center text-blue-400 hover:text-red-500 font-normal'>New Student?</button>
        </div>
      )}
    </div>
  )}

  {showForm && (
    <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-10 right-10 bg-red-500 text-3xl h-12 w-12 rounded-full text-white flex items-center justify-center hover:bg-red-600 transition duration-300"
      >
        &times;
      </button>

      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 rounded-lg shadow-2xl p-8 m-4 my-10 max-h-[92vh] overflow-y-auto overflow-scroll">
        <h1 className="text-3xl font-semibold text-center text-emerald-600 display-1 mb-8">Payment Options</h1>

        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="bg-gray-50 shadow p-6 rounded-lg w-full lg:w-5/12 mb-6 lg:mb-0">
            <h2 className="text-2xl text-emerald-600 font-bold mb-3">Instant Payment</h2>
            <div className="text-sm">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <td className="px-2 py-3 text-gray-600 font-medium">Student ID:</td>
                    <td className="px-2 py-3 text-gray-800">{id}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 text-gray-600 font-medium">Student Name:</td>
                    <td className="px-2 py-3 text-gray-800">{name}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 text-gray-600 font-medium">Course Name:</td>
                    <td className="px-2 py-3 text-gray-800">{title}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 text-gray-600 font-medium">TimeSlot:</td>
                    <td className="px-2 py-3 text-gray-800 text-erap">{time}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-3 text-gray-600 font-medium">Price:</td>
                    <td className="px-2 py-3 text-gray-800 font-bold">${discountedPrice}</td>
                  </tr>
                </tbody>
              </table>
            <div className='w-full my-2 flex justify-center text-center' >
            <a href={ discountedPrice1}  className="mt-4 min-w-full  bg-emerald-500  text-white rounded-md px-4 py-2 transition-colors duration-200 hover:bg-emerald-600">Pay Now</a>
             
            </div>
                 <button
                className="mt-4 w-full bg-emerald-500 text-white rounded-md px-4 py-2 transition-colors duration-200 hover:bg-emerald-600"
                onClick={() => sendLink(disLnik)}
              >
            PayLater
              </button>
            </div>
          </div>

          <div className="bg-gray-50 shadow p-6 rounded-lg w-full lg:w-5/12">
          <h2 className="text-lg text-emerald-600 font-bold mb-3">Flexible Payment Options are Available</h2>
            <h6 className="text-sm  font-bold mb-3">Dear parents,</h6>
            <p className="text-sm text-gray-700">
            We understand that financial situations can vary, and we're here to support you. If paying now is a challenge, or if you prefer cash transactions or any other payment method, please reach out to us via our phone or email. We'll work together to find a solution that works for you.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <span className="font-medium">Best regards,</span> <br />
              <span className="font-medium">Yeneta Language and Cultural Academy</span> <br />
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <span className="font-medium"><i className="fas fa-phone"></i> :</span> +1 240 374 8205<br/>
              <span className="font-medium"><i className="fas fa-envelope"></i> :</span> admission@yenetaschool.com
            </p>
         
          </div>
        </div>
      </div>
    </div>
  )}
</div>

</>
  );
}

export default AdmissionForm;


