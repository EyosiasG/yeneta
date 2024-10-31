import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import Hero1 from '../../assets/img/hero7.png'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';


library.add(fas);

const RegisteredStudents = () => {

    const [showForm, setShowForm] = useState(false);
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const {bg , setBg} = useStore();
    
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
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchPrograms = async () => {
    const allRides = `${import.meta.env.VITE_API}/api/RegisteredStudents?offset=${offset}&limit=10`;

    const response = await fetch(allRides,{
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setReg(data.data);
     setlength(data.length);
   console.log(data.length,"ancakmdla");
    } else {
      setReg(data.data);
      return;
    }
  }
  useEffect(() => {
    fetchPrograms();
  }, [offset]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/api/RegisteredStudents/${id}`);
      Swal.fire({
        title: 'Success!',
        text: 'Success',
        icon: 'success'
      });
      fetchPrograms();
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to delete the program', error,
        icon: 'error'
      });
      console.error('Failed to delete the program', error);
    }
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
            <div className="flex justify-center text-color1 items-center w-full text-center -mt-4 mb-4">
                <h1 className="display-1 text-4xl font-bold">Student Dashboard</h1>
            </div>
<div className='shadow-2xl shadow-color1 bg-white rounded-lg p-6 '>
<div className="mb-4">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Student ID:</label>
  <div className="mt-1 relative rounded-md shadow-sm flex flex-row justify-between w-full">
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
  <button onClick={fetchChart} className="mt-3 bg-secondary hover:bg-secondary/80 display-1 mb-6 text-white font-bold py-2 px-4 rounded">
    Send Email
  </button>
  </div>
</div>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="py-3 px-6">Roll Number</th>
        <th scope="col" className="py-3 px-6">Student ID</th>
        <th scope="col" className="py-3 px-6">Name</th>
        <th scope="col" className="py-3 px-6">Course</th>
        <th scope="col" className="py-3 px-6">Email</th>
        <th scope="col" className="py-3 px-6">Timeslot</th>
        <th scope="col" className="py-3 px-6">created_at</th>
        <th scope="col" className="py-3 px-6">Status</th>
        <th scope="col" className="py-3 px-6">Payment Status</th>
 
      </tr>
    </thead>
    <tbody>
      {reg.map((student, index) => (
        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
          <td className="py-4 px-6 font-bold">{index + 1 + offset}</td>
          <td className="py-4 px-6">{student.StudentId}</td>
          <td className="py-4 px-6">{student.Name}</td>
          <td className="py-4 px-6">{student.Course}</td>
          <td className="py-4 px-6">{student.Semester}</td>
          <td className="py-4 px-6">{student.time}</td>
          <td className="py-4 px-6">{student.created_at.slice(0, 10)}</td> 
          <td className="py-4 px-6">{student.Status}</td>
          <td className="py-4 px-6">
            <span className={student.PaymentStatus === "0" ? 'text-red-500 border border-red-500 rounded-md mx-2 px-2 py-1' : 'text-green-500 border border-green-500 rounded-md mx-2 px-2 py-1'}>
              {student.PaymentStatus === "0" ? 'Unpaid' : 'Paid'}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-col gap-4">
                              
                                <button onClick={() => { if (window.confirm('Are you sure you want to delete this student?')) handleDelete(student.id); }} className='text-red-700 hover:text-red-900 px-6 py-2 border border-red-700 rounded-md ml-2'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>                <div className='flex justify-end mt-8 mx-10'>

<button onClick={handlePrevious} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl'disabled={offset > length} >Next</button>

</div>
</div>
               </div>
    );
}


export default RegisteredStudents;
