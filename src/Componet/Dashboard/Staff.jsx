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
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

library.add(fas);

const Staff = () => {
    const [showForm, setShowForm] = useState(false);

    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const [last, setlast] = useState("");
    
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
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Staff?limit=10&offset=${offset}`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Staff(data.data);
     console.log(data.data);
    } else {
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Staff/${id}`);
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Staff deleted successfully',
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
          axios.post(`${import.meta.env.VITE_API}/api/Staff/${editingProgram.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          
       
          });
    
        const responseData = response.data;
        console.log(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Staff updated successfully',
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
        const response = await axios.post(`${import.meta.env.VITE_API}/api/Staff`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
        const responseData = response.data;
        console.log(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Staff added successfully',
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
    <div className='pt-10'>
   
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Staff DashBoard</h1>
            <div className="mb-4 flex flex-row justify-between">
            <div className="mb-4 flex flex-col mx-8">

  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Staff</label>
  <div className="mt-1 relative rounded-md flex-row gap-4  shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-700 rounded-md"
      placeholder="Enter name"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Staff/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Staff(data.data); // Assuming the API returns a single student object
            } else {
              setA_Staff([]); // Clear the list if no student is found or in case of other statuses
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
  <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1  h-11 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Staff</button>
     

      </div>
  </div>
      
              <div className='rounded-lg shadow-2xl shadow-color1  w-full -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
              <div className='overflow-x-auto w-full'>
              <div className="w-full overflow-x-auto">
                <div className="border-b border-gray-200">
                <table className="min-w-[76vw] divide-y  divide-color1">
  <thead className='bg-gray-200'>
    <tr >
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">No</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Name</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Name (Amharic)</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Position</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Position (Amharic)</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Email</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Details</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Details (Amharic)</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Subtitle</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Subtitle (Amharic)</th>
      <th className="px-2 sm:px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody className='divide-y'>
    {a_Staff.map((member, index) => (
      <tr key={member.id}>
        
        <td className="px-2 sm:px-6 py-4 font-bold">{index + 1 + offset}</td>
        <td className="px-2 sm:px-6 py-4">{member.name}</td>
        <td className="px-2 sm:px-6 py-4">{member.name_am}</td>
        <td className="px-2 sm:px-6 py-4">{member.position}</td>
        <td className="px-2 sm:px-6 py-4">{member.position_am}</td>
        <td className="px-2 sm:px-6 py-4">{member.social_link}</td>
        <td className="px-2 sm:px-6 py-4">
          <div className="truncate max-w-[200px]" title={member.details}>{member.details}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">
          <div className="truncate max-w-[200px]" title={member.details_am}>{member.details_am}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">{member.subtitle}</td>
        <td className="px-2 sm:px-6 py-4">{member.subtitle_am}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium gap-2">
        < button onClick={() => { setEditingProgram(member); toggleForm(true); }} > <div className='border border-color1 -700 px-1 py-2 rounded-md  text-color1 -700'><FontAwesomeIcon icon={faPenToSquare} /></div> 
</button>
          <button onClick={() => handleDelete(member.id)} ><div className='border border-color1 -700 px-1 rounded-md py-2 text-color1 -700'><FontAwesomeIcon icon="fa-solid fa-trash" /></div> </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<div className='flex justify-end mt-8 mx-10'>
<button onClick={handlePrevious} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' 
    disabled={offset > length - 10} 
    >Next</button>
</div>

                </div>
              </div>

</div>
</div>
<button onClick={toggleForm}>X</button>
  {showForm &&(  <div className='bg-black/60 ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm} className=' text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10 '>X</button>

  {showForm && (
        <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
      )}
   
    </div>
    
)};
    </div>
  );
};

export default Staff;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
    <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
      <h1 className='text-3xl text-center font-bold text-blue-500'>Staff Information</h1>
      <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Name and Amharic Name */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Name</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('name', { required: "Name is required" })} placeholder="Name" />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Name in Amharic</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('name_am', { required: "Name in Amharic is required" })} placeholder="ስም" />
            {errors.name_am && <p className="text-red-500 text-xs italic">{errors.name_am.message}</p>}
          </div>
  
          {/* Position and Position in Amharic */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Position</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('position', { required: "Position is required" })} placeholder="Position" />
            {errors.position && <p className="text-red-500 text-xs italic">{errors.position.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Position in Amharic</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('position_am', { required: "Position in Amharic is required" })} placeholder="ቦታ" />
            {errors.position_am && <p className="text-red-500 text-xs italic">{errors.position_am.message}</p>}
          </div>
        </div>
  
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Email and Subtitle */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Email</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('social_link', { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Entered value does not match email format" } })} placeholder="Email" />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Subtitle</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('subtitle', { required: "Subtitle is required" })} placeholder="Subtitle" />
            {errors.subtitle && <p className="text-red-500 text-xs italic">{errors.subtitle.message}</p>}
          </div>
  
          {/* Subtitle in Amharic and Image Upload */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Subtitle in Amharic</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('subtitle_am', { required: "Subtitle in Amharic is required" })} placeholder="ንዑስ ርዕስ" />
            {errors.subtitle_am && <p className="text-red-500 text-xs italic">{errors.subtitle_am.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Image</label>
            <input className='form-input border border-blue-300 rounded-md p-2' type="file" {...register('img', { required: !initialValues.id })} />
            {errors.img && <p className="text-red-500 text-xs italic">Image is required</p>}
          </div>
        </div>
  
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Details and Details in Amharic */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Details</label>
            <textarea className='form-input border border-blue-300 rounded-md p-2 h-48' {...register('details', { required: "Details are required" })} placeholder="Details"></textarea>
            {errors.details && <p className="text-red-500 text-xs italic">{errors.details.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Details in Amharic</label>
            <textarea className='form-input border border-blue-300 rounded-md p-2 h-48' {...register('details_am', { required: "Details in Amharic are required" })} placeholder="ዝርዝሮች"></textarea>
            {errors.details_am && <p className="text-red-500 text-xs italic">{errors.details_am.message}</p>}
          </div>
        </div>
  
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