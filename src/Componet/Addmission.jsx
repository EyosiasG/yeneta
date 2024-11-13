import React, { useState, useEffect } from 'react';
import bar from '../assets/img/bar.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert2';
import useStore from '../store/store';

function AdmissionForm() {
  const [admission, setAdmission] = useState(true);
  const [add, setAdd] = useState(false);
  const {bg, setBg, en} = useStore();
  const [showForm, setShowForm] = useState(false);
  const [parnetname, setParnetname] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { sid, title, startDate, endDate, price, P1, P2, P3, P4, f3, f3d, f4d, f4, time } = location.state || {};
  const {
    id, setId, 
    name, setName,
    email, setEmail,
    setTitle, 
    setEndDates,
    setStartDates
  } = useStore();

  const [siblings, setSiblings] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [discountedPrice1, setDiscountedPrice1] = useState(P3);
  const [disLnik, setDisLnik] = useState("4");
  const [readyToPay, setReadyToPay] = useState(false);
  const [triggerPay, setTriggerPay] = useState(false);

  useEffect(() => {
    if (siblings.length > 0) {
      applySiblingDiscount();
    } else {
      setDiscountedPrice(price);
      setDiscountedPrice1(P3);
    }
  }, [siblings]);

  useEffect(() => {
    if (triggerPay) {
      if (siblings.length > 0) {
        applySiblingDiscount();
      } else {
        setDiscountedPrice(price);
        setDiscountedPrice1(P3);
      }
      if (readyToPay) {
        handlepay("2");
        setReadyToPay(false);
      }
      setTriggerPay(false);
    }
  }, [triggerPay, id, name]);

  useEffect(() => {
    if (readyToPay) {
      handlepay("2"); 
      setReadyToPay(false);
    }
  }, [readyToPay]);

  const preparePayment = (q) => {
    setDisLnik(q > 0 ? "9" : "8");
    setReadyToPay(true);
  };

  const logDetails = async (data) => {
    try {
      setBg(true);
      const response = await fetch(`${import.meta.env.VITE_API}/api/showbyid/${data.studentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }

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
          text: "Student ID verified successfully",
          icon: "success",
          confirmButtonColor: "teal",
        });

        setEmail(studentData.data.email);
        setName(studentData.data.first_name + ' ' + studentData.data.last_name);
        setId(studentData.data.uuid);
        setParnetname(studentData.data.parent_name);
        
        await checkSiblings(studentData.data.parent_name);
        setTriggerPay(true);
      }
    } catch (error) {
      console.error("Error:", error);
      swal.fire({
        title: "Error",
        text: "Failed to verify student ID",
        icon: "error",
        confirmButtonColor: "teal", 
      });
    } finally {
      setBg(false);
    }
  };

  const checkSiblings = async (parentEmail) => {   
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/siblings?end_date=${parentEmail}`);
      if (response.ok) {
        const siblingsData = await response.json();
        setSiblings(siblingsData.data);
        setDisLnik(siblingsData.length > 0 ? P2 : P1);
        setReadyToPay(true);
      }
    } catch (error) {
      console.error("Error fetching siblings:", error);
    }
  };

  const applySiblingDiscount = () => {
    if (siblings.length === 1) {
      setDiscountedPrice(price - 10);
      setDiscountedPrice1(P4);
      setDisLnik(P2);
    } else if (siblings.length === 2) {
      setDiscountedPrice(price - 20);
      setDiscountedPrice1(f3);
      setDisLnik(f3d);
    } else if (siblings.length >= 3) {
      setDiscountedPrice(price - 30);
      setDiscountedPrice1(f4);
      setDisLnik(f4d);
    }
  };

  const onSubmit = async (data) => {
    setBg(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/api/Students`, data);

      if (response.data.status === 1) {
        swal.fire({
          title: "Success",
          text: "Registration successful!",
          icon: "success",
          confirmButtonColor: "teal",
        });
        
        setEmail(data.email);
        setName(`${data.first_name} ${data.last_name}`);
        setId(response.data.id);
        setParnetname(data.parent_name);
        
        await checkSiblings(data.parent_name);
        setTriggerPay(true);
        reset();
      } else {
        throw new Error(response.data.errors);
      }
    } catch (error) {
      swal.fire({
        title: "Error",
        text: error.response?.data?.errors?.email || "Registration failed",
        icon: "error",
        confirmButtonColor: "teal",
      });
    } finally {
      setBg(false);
    }
  };

  const handlesit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/nosit/${sid}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      });
      
      if (response.ok) {
        handleSubmit(sid);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlepay = async (e) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/RegisteredStudents`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          StudentId: id,
          Name: name,
          Course: title,
          start_date: startDate,
          end_dat: endDate,
          Semester: email,
          end_date: parnetname,
          time: time,
          sublink: disLnik,
        }),
      });

      if (response.ok) {
        await handlesit(sid);
        if (title !== 'Special class') {
          setShowForm(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendLink = async (email3) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/SendLink?email=${email}&link=${discountedPrice1}`
      );

      if (response.data.status === 1) {
        swal.fire({
          title: 'Success',
          text: 'Payment link sent successfully',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        navigate('/programs');
      } else {
        throw new Error('Failed to send payment link');
      }
    } catch (error) {
      swal.fire({
        title: 'Error',
        text: 'Failed to send payment link',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-cover bg-center" style={{backgroundImage: `url(${bar})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{en ? 'Admission Application' : 'የመግቢያ ማመልከቻ'}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {admission ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">New Student Registration</h2>
              <p className="text-gray-600 mb-6">First time applying to Yeneta School?</p>
              <button 
                onClick={() => setAdd(true)} 
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Existing Student</h2>
              <p className="text-gray-600 mb-6">Already registered with Yeneta School?</p>
              <button
                onClick={() => {
                  setAdmission(false);
                  setAdd(false);
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue with Student ID
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {add ? (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Student Registration Form</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Form fields go here - keeping existing fields but with updated styling */}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter Student ID</h2>
                <form onSubmit={handleSubmit(logDetails)} className="max-w-md mx-auto">
                  <input
                    type="text"
                    {...register("studentId", { required: "Student ID is required" })}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your student ID"
                  />
                  {errors.studentId && (
                    <p className="mt-2 text-sm text-red-600">{errors.studentId.message}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Verify ID
                  </button>
                </form>
                <button
                  onClick={() => setAdd(true)}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 text-center w-full"
                >
                  New Student? Register Here
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Payment form content - keeping existing content but with updated styling */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmissionForm;
