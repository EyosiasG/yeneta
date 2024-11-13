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
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
library.add(fas);

const Verify = () => {

    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState({});
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const limit = 10; // Items per page





    // Fetch items from the backend

    // Pagination handlers
    const handleNext = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(0, prevOffset - limit));
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    const [programs, setPrograms] = useState({});
    const [reg, setReg] = useState([])
    const { setBg } = useStore();
    const [editingProgram, setEditingProgram] = useState(null);
    const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchPrograms = async () => {
        const allRides = `${import.meta.env.VITE_API}/api/PendingPayment?offset=${offset}&limit=10`;

        const response = await fetch(allRides, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === 1) {
            setReg(data.data);
            setlength(data.length || 0);
         
        } else {
          setReg([]);
          setlength(0);
            return;
        }
    }
    useEffect(() => {
        fetchPrograms();
    }, [offset]);


    const handleput1 = async (student) => {
        try {
          // If editingProgram is not null, we're editing an existing program
          await axios.put(`${import.meta.env.VITE_API}/api/RegisteredStudents/${editingProgram.id}`, student);
          swal.fire({
            title: "Success",
            text: "Student updated successfully",
            icon: "success",
            confirmButtonColor: "green",
          });
        } catch (error) {
          console.error('Failed to update the Student', error);
          swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonColor: "red",
          });
        
    }};
    
    const handleput = async (student) => {
    setBg(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      const urlencoded = new URLSearchParams();
      urlencoded.append("StudentId", student.StudentId);
      urlencoded.append("Course", student.Course);
      urlencoded.append("start_date", student.Start_Date);
      urlencoded.append("end_date", student.End_Date);
      urlencoded.append("PaymentStatus", "1");
    
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };
      setBg(true);
      fetch(`${import.meta.env.VITE_API}/api/verify/${student.id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {  // Assuming 1 is the success status code
            swal.fire({
              title: "Success",
              text: "Payment has been verified",
              icon: "success",
              confirmButtonColor: "green",
            });
            setBg(false);
            fetchPrograms();
          } else if (data.status === 0) {
            swal.fire({
              title: "Error",
              text: "Failed to verify payment",
              icon: "error",
              confirmButtonColor: "red",
            });
            setBg(false);
            fetchPrograms();
          }
        })
        .catch((error) => {
          swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonColor: "red",
          });
          fetchPrograms();
        });
    
    };
    
    const fetchChart = async () => {
      setBg(true);
      const chartUrl = `${import.meta.env.VITE_API}/api/sublink`;
  
      try {
        const response = await fetch(chartUrl, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to send emails");
        }
        const emailResponse = await response.json();
        if (emailResponse.status === 1) {
          Swal.fire({
            title: 'Success!',
            text: 'Emails are being sent in the background',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Failed!',
            text: `Failed to send emails with status: ${emailResponse.status}`,
            icon: 'error'
          });
        }
      } catch (error) {
        console.error("Error sending emails:", error);
      }
      setBg(false);
    };
    


    const [viewMode, setViewMode] = useState('table');


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
                    Payment Verification Center
                </h1>
                <p className="text-gray-600">Process and verify student payment submissions</p>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="max-w-md">
                    <label htmlFor="searchStudentId" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Student Lookup
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="searchStudentId"
                            id="searchStudentId"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Student ID to search..."
                            onChange={async (e) => {
                                const studentId = e.target.value;
                                if (studentId.trim() !== '') {
                                    try {
                                        const response = await fetch(`${import.meta.env.VITE_API}/api/searchById1/${studentId}`, { 
                                            method: 'GET',
                                        });
                                        if (!response.ok) {
                                            throw new Error("Failed to fetch data");
                                        }
                                        const data = await response.json();
                                        if (data.status === 1) {
                                            setReg(data.data); // Assuming the API returns a single student object
                                        } else {
                                            setReg([]); // Clear the list if no student is found or in case of other statuses
                                        }
                                    } catch (error) {
                                        console.error('Error fetching student by ID:', error);
                                    }
                                } else {
                                    fetchPrograms(); // Reset to original list if input is cleared
                                }
                            }}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submission Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reg.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <p className="text-lg font-medium">No pending verifications</p>
                                            <p className="text-sm text-gray-400">All payments have been processed</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                reg.map((student, index) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1 + offset}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.StudentId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.Course}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.Name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.Semester}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {student.created_at.slice(0, 10)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                                ${student.PaymentStatus === "0" 
                                                    ? 'bg-red-50 text-red-700' 
                                                    : 'bg-green-50 text-green-700'
                                                }`}>
                                                <span className={`w-2 h-2 rounded-full mr-2
                                                    ${student.PaymentStatus === "0" 
                                                        ? 'bg-red-400' 
                                                        : 'bg-green-400'
                                                    }`}>
                                                </span>
                                                {student.PaymentStatus === "0" ? 'Unpaid' : 'Paid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <button
                                                onClick={() => handleput(student)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={handlePrevious}
                            disabled={offset === 0}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={offset > length}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Verify;
