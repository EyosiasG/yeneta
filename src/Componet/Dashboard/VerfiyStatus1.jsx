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

const VerifyStatus1 = () => {

    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState({});
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const limit = 10; // Items per page
    const { setBg } = useStore();


    // Fetch items from the backend
    const [dropdownOpen, setDropdownOpen] = useState({});

    const toggleDropdown = (studentId) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [studentId]: !prevState[studentId]
        }));
    };

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
    const [editingProgram, setEditingProgram] = useState(null);
    const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchPrograms = async () => {
        const allRides = `${import.meta.env.VITE_API}/api/comp?offset=${offset}&limit=10`;

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
          console.log("pp");
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
        
    }};const handleput = async (student) => {
      const myHeaders = new Headers();
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      console.log(`Today's date is: ${dateString}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      const urlencoded = new URLSearchParams();
      urlencoded.append("Completed_date", dateString);
      urlencoded.append("Status", "Completed");
    
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };
    
      fetch(`${import.meta.env.VITE_API}/api/verify2/${student.id}`, requestOptions)
        .then((response) => response.text().then(result => ({ status: response.status, result })))
        .then(({ status, result }) => {
          if (status === 200) {  // Assuming 200 is the success status code
            swal.fire({
              title: "Success",
              text: "Payment has ben verifyed",
              icon: "success",
              confirmButtonColor: "green",
            });
            fetchPrograms();
          } else {
            swal.fire({
              title: "Error",
              text: result,
              icon: "error",
              confirmButtonColor: "red",
            });
          }
        })
        .catch((error) => {
          swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonColor: "red",
          });
        });
    };

    
    const [viewMode, setViewMode] = useState('table');


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
                    Payment Verification Dashboard22
                </h1>
                <p className="text-gray-600">Manage and track student payment verifications</p>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="max-w-md">
                    <label htmlFor="searchStudentId" className="text-sm font-semibold text-gray-700 mb-2 block">
                        Search Student
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="searchStudentId"
                            id="searchStudentId"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Student ID..."
                            onChange={async (e) => {
                                const studentId = e.target.value;
                                if (studentId.trim() !== '') {
                                    try {
                                        const response = await fetch(`${import.meta.env.VITE_API}/api/searchById/${studentId}`, { 
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reg.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                            <p className="text-lg font-medium">No data available</p>
                                            <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                reg.map((student, index) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1 + offset}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.StudentId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.Course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.Name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.Semester}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.created_at.slice(0, 10)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                                                {student.Status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-sm rounded-full ${
                                                student.PaymentStatus === "0"
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-green-50 text-green-600'
                                            }`}>
                                                {student.PaymentStatus === "0" ? 'Unpaid' : 'Paid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {/* Add your action buttons here */}
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
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={offset > length}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default VerifyStatus1;
