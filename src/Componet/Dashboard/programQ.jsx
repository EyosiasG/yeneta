import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import Hero1 from '../../assets/img/hero7.png'
import { faCoffee, faPenToSquare, faPlus, faTrash, faClock } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

library.add(fas);

// Add these animation variants
const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const Programs = () => {
    const [showForm, setShowForm] = useState(false);
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
  const [data, setData] = useState([]);
     const [offset, setOffset] = useState(0);
     const [length, setlength] = useState("");
     const [proid, setProid] = useState("");
     const {bg , setBg} = useStore();
  const limit = 10; // Items per page

  // Fetch items from the backend

const sortedData = data.sort((a, b) => {
  if (a.level === b.level) {
      return new Date(a.created_at) - new Date(b.created_at);
  }
  return a.level - b.level;
});

console.log(sortedData);
  // Pagination handlers
  const getSchedule = async (programId) => {
    setProid(programId);
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/Schedule/${programId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch schedule");
      }
      const data = await response.json();
      if (data.status === 1) {
        setData(data.data); // Assuming the API returns the schedule data
      } else {
        setData([]); // Clear the list if no schedule is found or in case of other statuses
      }

    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };
  const handleNext = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };
  const toggleForm1 = () => {
    setShowForm1(!showForm1);
};

const toggleForm2 = () => {
  setShowForm2(!showForm2);
  setShowForm1(!showForm1);
};
    const toggleForm = () => {
        setShowForm(!showForm);
    };
  const [programs, setPrograms] = useState({});
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/programs?offset=0&limit=20`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Program(data.data);
     setlength(data.length);
   
    } else {
      setA_Program([]); // Clear the list if no data is found
      setlength(0); // Reset length to 0
      Swal.fire({
        icon: 'info',
        title: 'No Data',
        text: 'No programs found.',
      });
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);
     const handleDelete1 = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Schedule/${id}`);
        
        getSchedule(proid);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Schedule deleted successfully',
        });
      } catch (error) {
        console.error('Failed to delete the Schedule', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      }
    };  
     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/programs/${id}`);
        
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Program deleted successfully',
        });
      } catch (error) {
        console.error('Failed to delete the program', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      }
    };  

  const onSubmit1 = async (data) => {
    const formData = new FormData();
    if (editingProgram) {
    // Loop through the data object and append each item to formData
    for (const [key, value] of Object.entries(data)) {
      if (key === 'img' && data.img) {
        // Assuming data.img is a FileList (e.g., from <input type="file" multiple />)
        // If it's a single file, not a list, you can append it directly without looping
        if (data.img.length) {
          // Append each file if multiple files are supported
          formData.append(key, data.img[0]); // Only append the first file if multiple files are supported
        } else {
          // Directly append the file if only single file upload is supported
          formData.append(key, data.img);
        }
      } else {
        // Append non-file data normally
        formData.append(key, value);
        formData.append("_method", "PUT");
        
        
        
      }
    }
  
    try {
      const response = await 
        axios.post(`${import.meta.env.VITE_API}/api/Schedule/${editingProgram.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        
     
        });
  
      const responseData = response.data;
      console.log(responseData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Program updated successfully',
      });
      setEditingProgram(null);
      toggleForm2();
      getSchedule(proid);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      });
    }
  } else{
    for (const [key, value] of Object.entries(data)) {
      if (key === 'img' && data.img) {
        // Assuming data.img is a FileList (e.g., from <input type="file" multiple />)
        // If it's a single file, not a list, you can append it directly without looping
        if (data.img.length) {
          // Append each file if multiple files are supported
          formData.append(key, data.img[0]); // Only append the first file if multiple files are supported
        } else {
          // Directly append the file if only single file upload is supported
          formData.append(key, data.img);
        }
      } else {
        // Append non-file data normally
        formData.append(key, value);      
        formData.append("ClassId", proid);
      }
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/api/Schedule`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
      const responseData = response.data;
      console.log(responseData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Program added successfully',
      });
      setEditingProgram(null);
      toggleForm2();
      getSchedule(proid);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      });
    }}
  };
      
  // Ensure 'data.img' is appended correctly if it's a file
// Update the onSubmit function to handle file uploads properly
const onSubmit = async (data) => {
  const formData = new FormData();
  if (editingProgram) {
  // Loop through the data object and append each item to formData
  for (const [key, value] of Object.entries(data)) {
    if (key === 'img' && data.img) {
      // Assuming data.img is a FileList (e.g., from <input type="file" multiple />)
      // If it's a single file, not a list, you can append it directly without looping
      if (data.img.length) {
        // Append each file if multiple files are supported
        formData.append(key, data.img[0]); // Only append the first file if multiple files are supported
      } else {
        // Directly append the file if only single file upload is supported
        formData.append(key, data.img);
      }
    } else {
      // Append non-file data normally
      formData.append(key, value);
      formData.append("_method", "PUT");

      
    }
  }

  try {
    const response = await 
      axios.post(`${import.meta.env.VITE_API}/api/programs/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
   
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Program updated successfully',
    });
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response.data.message,
    });
  }
} else{
  for (const [key, value] of Object.entries(data)) {
    if (key === 'img' && data.img) {
      // Assuming data.img is a FileList (e.g., from <input type="file" multiple />)
      // If it's a single file, not a list, you can append it directly without looping
      if (data.img.length) {
        // Append each file if multiple files are supported
        formData.append(key, data.img[0]); // Only append the first file if multiple files are supported
      } else {
        // Directly append the file if only single file upload is supported
        formData.append(key, data.img);
      }
    } else {
      // Append non-file data normally
      formData.append(key, value);      
    }
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/api/programs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Program added successfully',
    });
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response.data.message,
    });
  }}
};


  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 p-6"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Program Management</h1>
        <p className="text-gray-600">Manage and organize your educational programs</p>
      </div>

      {/* Search and Add Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Search Programs
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by program name..."
                onChange={async (e) => {
                  const searchTerm = e.target.value;
                  if (searchTerm.trim() !== '') {
                    try {
                      const response = await fetch(`${import.meta.env.VITE_API}/api/programs/${searchTerm}`);
                      if (!response.ok) throw new Error("Failed to fetch data");
                      const data = await response.json();
                      setA_Program(data.status === 1 ? data.data : []);
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  } else {
                    fetchPrograms();
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>

          {/* Add Program Button */}
          <button
            onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Program
          </button>
        </div>
      </div>

      {/* Programs Table */}
      <motion.div 
        variants={tableVariants}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'No', 'Program', 'Price', 'Description', 'Description (አማርኛ)',
                  'Teacher', 'Teacher (አማርኛ)', 'Priority', 'Start Date', 'End Date', 'Actions'
                ].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {a_Program.map((program, index) => (
                <motion.tr 
                  key={program.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1 + offset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {en ? program.title : program.title_am}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => { toggleForm1(true); getSchedule(program.id); }}
                        className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        TimeSlot
                      </button>
                      <button
                        onClick={() => { setEditingProgram(program); toggleForm(true); }}
                        className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(program.id);
                            }
                          });
                        }}
                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset > length - 10}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal Forms */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingProgram ? 'Edit Program' : 'Add New Program'}
                  </h2>
                  <button
                    onClick={toggleForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Similar structure for showForm1 and showForm2 */}
      </AnimatePresence>
    </motion.div>
  );
};

export default Programs;

function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset , formState: { errors }  } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);
  const isEditing = Boolean(initialValues && initialValues.id);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
  <div className='bg-white rounded-lg shadow-2xl p-8 max-w-5xl w-full max-h-screen overflow-y-auto'>
    <h1 className='text-3xl text-center font-bold text-blue-500'>Program Registration</h1>
    <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* Title Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Title</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('title', { required: true })} placeholder="Title" />
          {errors.title && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Title in Amharic</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('title_am', { required: true })} placeholder="Title in Amharic" />
          {errors.title_am && <span className='text-red-600'>This field is required</span>}
        </div>
      </div>
      
      {/* Teacher Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Teachers</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('teachers', { required: true })} placeholder="Teachers" />
          {errors.teachers && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Teacher in Amharic</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('teacher_am', { required: true })} placeholder="Teacher in Amharic" />
          {errors.teacher_am && <span className='text-red-600'>This field is required</span>}
        </div>
      </div>

      {/* Course and Price Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Priority</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('Course', { required: true })} placeholder="Priority" />
          {errors.Course && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Price</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="number" {...register('price', { required: true })} placeholder="Price" />
          {errors.price && <span className='text-red-600'>This field is required</span>}
        </div>
      </div>

      {/* Start and End Date Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Start Date</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="date" {...register('start_date', { required: true })} />
          {errors.start_date && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>End Date</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="date" {...register('end_date', { required: true })} />
          {errors.end_date && <span className='text-red-600'>This field is required</span>}
        </div>
      </div>

      {/* Image Upload */}
      <div className='flex flex-col'>
            <label className='font-semibold'>Image</label>
            <input className='form-input border border-blue-300 rounded-md p-2'
              type="file"
              {...register('img', {
                required: !isEditing  // Only require when not editing
              })}
            />
        {errors.img && <span className='text-red-600'>This field is required</span>}
      </div>

      {/* Description Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Description</label>
          <textarea className='form-input border border-blue-300 rounded-md p-2' rows="3" {...register('description', { required: true })} placeholder="Description" />
          {errors.description && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Description in Amharic</label>
          <textarea className='form-input border border-blue-300 rounded-md p-2' rows="3" {...register('description_am', { required: true })} placeholder="Description in Amharic" />
          {errors.description_am && <span className='text-red-600'>This field is required</span>}
        </div>
      </div>
    
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>1st Strip Frist payment link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('P3', { required: true })} placeholder="Frist payment link" />
          {errors.P3 && <span className='text-red-600'>This field is required</span>}
        </div>
        
       
      
       <div className='flex flex-col'>
          <label className='font-semibold'>2nd Discount Frist payment link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('P4', { required: true })} placeholder="Frist payment link Discount" />
          {errors.P4 && <span className='text-red-600'>This field is required</span>}
        </div> 
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>3rd Discount Strip Frist payment link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('f3', { required: true })} placeholder="Frist payment link" />
          {errors.P3 && <span className='text-red-600'>This field is required</span>}
        </div>
        
       
      
       <div className='flex flex-col'>
          <label className='font-semibold'> 4th Discount Frist payment link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('f4', { required: true })} placeholder="Frist payment link Discount" />
          {errors.P4 && <span className='text-red-600'>This field is required</span>}
        </div> 
      </div>
      

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>1st Strip Subscription link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('P1', { required: true })} placeholder="Price ID" />
          {errors.P1 && <span className='text-red-600'>This field is required</span>}
        </div>
        
       
      
       <div className='flex flex-col'>
          <label className='font-semibold'>2nd Discount Subscription link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('P2', { required: true })} placeholder="Discount Price ID" />
          {errors.P2 && <span className='text-red-600'>This field is required</span>}
        </div> 
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>3rd Discount Strip Subscription link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('f3d', { required: true })} placeholder="Price ID" />
          {errors.P1 && <span className='text-red-600'>This field is required</span>}
        </div>
        
       
      
       <div className='flex flex-col'>
          <label className='font-semibold'> 4th Discount Subscription link</label>
          <input className='form-input border border-blue-300 rounded-md p-2' type="text" {...register('f4d', { required: true })} placeholder="Discount Price ID" />
          {errors.P2 && <span className='text-red-600'>This field is required</span>}
        </div> 
      </div>
      {/* Submit Button */}
      <div className='flex justify-center'>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-full max-w-xs'>
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

function ProgramForm1({ onSubmit1, initialValues }) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  const startTime = watch('StartTime');
  const endTime = watch('EndTime');

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10 '>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
        <h1 className='text-4xl text-center font-bold text-purple-700 mb-6'>Class Schedule</h1>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit1)}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* ClassId input */}
            <div className='flex flex-col'>
              <label className='font-semibold text-lg'>Number of Seats</label>
              <input 
                className='border border-purple-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500' 
                {...register('nosit', { required: 'Number of seats is required' })} 
                placeholder="13" 
              />
              {errors.nosit && <span className='text-red-600'>{errors.nosit.message}</span>}
            </div>
            
            {/* Day input */}
            <div className='flex flex-col'>
              <label className='font-semibold text-lg'>Day</label>
              <select 
                className='border border-purple-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500' 
                {...register('Day', { required: 'Day is required' })}
              >
                <option value="">Select a day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              {errors.Day && <span className='text-red-600'>{errors.Day.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='font-semibold text-lg'>Start Time</label>
                <select 
                  className='border border-purple-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500' 
                  {...register('startTime', { required: 'Start Time is required' })}
                >
                  <option value="">Select Start Time</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    ['AM', 'PM'].map(period => (
                      <>
                        <option key={`${hour} ${period}`} value={`${hour}:00 ${period}`}>{`${hour}:00 ${period}`}</option>
                        <option key={`${hour}:10 ${period}`} value={`${hour}:10 ${period}`}>{`${hour}:10 ${period}`}</option>
                        <option key={`${hour}:15 ${period}`} value={`${hour}:15 ${period}`}>{`${hour}:15 ${period}`}</option>
                        <option key={`${hour}:30 ${period}`} value={`${hour}:30 ${period}`}>{`${hour}:30 ${period}`}</option>
                        <option key={`${hour}:45 ${period}`} value={`${hour}:45 ${period}`}>{`${hour}:45 ${period}`}</option>
                        <option key={`${hour}:50 ${period}`} value={`${hour}:50 ${period}`}>{`${hour}:50 ${period}`}</option>
                      </>
                    ))
                  ))}
                </select>
                {errors.startTime && <span className='text-red-600'>{errors.startTime.message}</span>}
              </div>

              <div className='flex flex-col '>
                <label className='font-semibold text-lg'>End Time</label>
                <select 
                  className='border border-purple-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500' 
                  {...register('endTime', { required: 'End time is required' })}
                >
                  <option value="">Select End Time</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                    ['AM', 'PM'].map(period => (
                      <>
                        <option key={`${hour} ${period}`} value={`${hour}:00 ${period}`}>{`${hour}:00 ${period}`}</option>
                        <option key={`${hour}:10 ${period}`} value={`${hour}:10 ${period}`}>{`${hour}:10 ${period}`}</option>
                        <option key={`${hour}:15 ${period}`} value={`${hour}:15 ${period}`}>{`${hour}:15 ${period}`}</option>
                        <option key={`${hour}:30 ${period}`} value={`${hour}:30 ${period}`}>{`${hour}:30 ${period}`}</option>
                        <option key={`${hour}:45 ${period}`} value={`${hour}:45 ${period}`}>{`${hour}:45 ${period}`}</option>
                        <option key={`${hour}:50 ${period}`} value={`${hour}:50 ${period}`}>{`${hour}:50 ${period}`}</option>
                      </>
                    ))
                  ))}
                </select>
                {errors.endTime && <span className='text-red-600'>{errors.endTime.message}</span>}
              </div>
            {/* Time input */}
            <div className='flex flex-col'>
              <label className='font-semibold text-lg'>Level</label>
              <select 
                className='border border-purple-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500' 
                {...register('level', { required: 'Level is required' })}
              >
                <option value="">Select a level</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}`}>{`${i + 1}`}</option>
                ))}
              </select>
              {errors.level && <span className='text-red-600'>{errors.level.message}</span>}
            </div>
          </div>

          {/* Submit button */}
          <div className='flex justify-center mt-8'>
            <button type="submit" className='bg-purple-700 text-white rounded-md px-10 py-3 transition duration-300 ease-in-out hover:bg-purple-800 w-full max-w-xs'>
              Submit
            </button>
          </div>
        </form>
        </div>    </div>
 

  );
}
  