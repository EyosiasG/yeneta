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
        <div className="p-5">
            <div className="flex justify-center items-center w-full text-center mb-4">
                <h1 className="text-4xl font-bold">Payment Verification Dashboard</h1>
            </div>
            <div className="mb-4 mx-10">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by StudentId</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-400 rounded-md"
      placeholder="Enter StudentId"
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
  
  </div>
  
</div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 divide-y divide-color1">
    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
      <tr>
        <th scope="col" className="py-3 px-6">No</th>
        <th scope="col" className="py-3 px-6">Student ID</th>
        <th scope="col" className="py-3 px-6">Course</th>
        <th scope="col" className="py-3 px-6">Name</th>
        <th scope="col" className="py-3 px-6">Email</th>
        <th scope="col" className="py-3 px-6">created_at</th>
     
        <th scope="col" className="py-3 px-6">Payment Status</th>
        <th scope="col" className="py-3 px-6">Action</th>
      </tr>
    </thead>
    <tbody>
      {reg.length === 0 ? (
        <tr>
          <td colSpan="8" className="py-4 px-6 text-center text-gray-500">
            No data available
          </td>
        </tr>
      ) : (
        reg.map((student, index) => (
          <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
            <td className="py-4 px-6 font-bold">{index + 1 + offset}</td>
            <td className="py-4 px-6">{student.StudentId}</td>
            <td className="py-4 px-6">{student.Course}</td>
            <td className="py-4 px-6">{student.Name}</td>
            <td className="py-4 px-6">{student.Semester}</td>
            <td className="py-4 px-6">{student.created_at.slice(0, 10)}</td>
          
            <td className="py-4 px-6">
              <span className={student.PaymentStatus === "0" ? 'text-red-500 border border-red-500 rounded-md mx-2 px-2 py-1' : 'text-green-500 border border-green-500 rounded-md mx-2 px-2 py-1'}>
                {student.PaymentStatus === "0" ? 'Unpaid' : 'Paid'}
              </span>
            </td>
            <td className="py-4 px-6">
              <button onClick={() => handleput(student)} className="bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                Verify
              </button>
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


export default Verify;
