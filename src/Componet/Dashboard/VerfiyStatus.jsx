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

const VerifyStatus = () => {

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
            ...Object.keys(prevState).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
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
        const allRides = `${import.meta.env.VITE_API}/api/NumReg?offset=${offset}&limit=10`;

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
              text: "Student's status has been updated successfully.",
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

    const fetchChart = async () => {
      setBg(true);
      const chartUrl = `${import.meta.env.VITE_API}/api/sublink1`;
  
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
        <div className="p-5">
            <div className="flex justify-center items-center w-full text-center mb-4">
                <h1 className="text-5xl font-bold text-green-900 display-1">Active Student Dashboard</h1>
            </div>

            <div className="mb-4">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Student ID:</label>
  <div className="mt-1 relative rounded-md shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-300 rounded-md"
      placeholder="Enter Student ID"
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
  </div>
</div>


            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 divide-color1 divide-y  ">
    <thead className="text-xs text-gray-700 uppercase  bg-gray-200">
      <tr>
        <th scope="col" className="py-3 px-6">No</th>
        <th scope="col" className="py-3 px-6">Student ID</th>
        <th scope="col" className="py-3 px-6">Course</th>
        <th scope="col" className="py-3 px-6">Name</th>
        <th scope="col" className="py-3 px-6">Email</th>
        <th scope="col" className="py-3 px-6">created_at</th>
        <th scope="col" className="py-3 px-6">Status</th>
        <th scope="col" className="py-3 px-6">Payment Status</th>
        <th scope="col" className="py-3 px-6">Action</th>
      </tr>
    </thead>
    <tbody className=''>
    {reg.length === 0 ? (
        <tr>
          <td colSpan="8" className="py-4 px-6 text-center text-gray-500">
            No data available
          </td>
        </tr>
      ) : (
        reg.map((student, index) => (
        <tr key={student.id} className=" border-b bg-white">
          <td className="py-4 px-6 font-bold">{index + 1 + offset}</td>
          <td className="py-4 px-6">{student.StudentId}</td>
          <td className="py-4 px-6">{student.Course}</td>
          <td className="py-4 px-6">{student.Name}</td>
          <td className="py-4 px-6">{student.Semester}</td>
          <td className="py-4 px-6">{student.created_at.slice(0, 10)}</td>
          <td className="py-4 px-6">{student.Status}</td>
          <td className="py-4 px-6">
            <span className={student.PaymentStatus === "0" ? 'text-red-500 border border-red-500 rounded-md mx-2 px-2 py-1' : 'text-green-500 border border-green-500 rounded-md mx-2 px-2 py-1'}>
              {student.PaymentStatus === "0" ? 'Unpaid' : 'Paid'}
            </span>
          </td>
          <td className="py-4 px-6">
            <div className="relative inline-block text-left">
              <button type="button" 
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500" 
                      id={`menu-button-${student.id}`} 
                      aria-expanded={dropdownOpen[student.id] ? "true" : "false"} 
                      aria-haspopup="true"
                      onClick={() => toggleDropdown(student.id)}>
                Actions
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>

              {dropdownOpen[student.id] && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 z-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby={`menu-button-${student.id}`} tabindex="-1">
                  <div className="py-1" role="none">

                    <button type="button" className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-teal-500" role="menuitem"  tabindex="-1" id={`menu-item-2-${student.id}`} onClick={() => handleput(student)}>
                      Complete
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>   </div>
          </td>
        </tr>
      ))
    )}
    </tbody>
  </table>
</div>

            <div className='flex justify-end mt-8 mx-10'>
                    <button onClick={handlePrevious} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
                    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset > length}>Next</button>
                </div>
        </div>
    );
}


export default VerifyStatus;
