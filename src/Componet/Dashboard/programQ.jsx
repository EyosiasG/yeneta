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
import Swal from 'sweetalert2';

library.add(fas);
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
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Programs</h1>

           
      <div className='w-full flex flex-row justify-between px-4 mb-4'>
        
      <div className="mb-4 mx-10">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Program</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-400 rounded-md"
      placeholder="Enter Program"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/programs/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Program(data.data); // Assuming the API returns a single student object
            } else {
              setA_Program([]); // Clear the list if no student is found or in case of other statuses
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
    
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold h-12 bg-color1 -600  rounded-lg px-3 py-2'>Add New Program</button>
     

      </div>
  <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto '>
  <div className="overflow-x-auto relative w-full shadow-md sm:rounded-lg ">
  <table className=" text-sm text-left text-gray-500 dark:text-gray-400 divide-y divide-color1  w-[77vw]">
    <thead className="text-xs text-gray-600 uppercase bg-gray-300  ">
      <tr>
        <th scope="col" className="px-6 py-3">No</th>
        <th scope="col" className="px-6 py-3">Program</th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Description</th>
        <th scope="col" className="px-6 py-3">Description (Amharic)</th>
        <th scope="col" className="px-6 py-3">Teacher</th>
        <th scope="col" className="px-6 py-3">Teacher (Amharic)</th>
        <th scope="col" className="px-6 py-3">Priority</th>
        <th scope="col" className="px-6 py-3">Start Date</th>
        <th scope="col" className="px-6 py-3">End Date</th>

       
        <th scope="col" className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {a_Program.map((program, index) => (
        <tr key={program.id}>
          <td className="px-6 py-4 whitespace-nowrap truncate max-w-[100px] font-bold">{index + 1 + offset}</td>
          <td className="px-6 py-4 whitespace-nowrap">{en ? program.title : program.title_am}</td>
          <td className="px-6 py-4 whitespace-nowrap">{program.price}</td>
          <td className="px-6 py-4 truncate max-w-[200px]">{program.description}</td>
          <td className="px-6 py-4 truncate max-w-[200px]">{program.description_am}</td>
          <td className="px-6 py-4 whitespace-nowrap">{program.teachers}</td>
          <td className="px-6 py-4 whitespace-nowrap">{program.teacher_am}</td>
          <td className="px-6 py-4 whitespace-nowrap w-96 ">{program.Course}</td>
          <td className="px-6 py-4 whitespace-nowrap">{program.start_date}</td>
          <td className="px-6 py-4 whitespace-nowrap">{program.end_date}</td>
          {/*<td className="px-6 py-4 whitespace-nowrap">{program.P1}</td> */} 

          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex justify-end flex-col gap-3 space-x-2">
            <button onClick={() => {  toggleForm1(true); getSchedule(program.id); }} className="text-green-500 hover:text-green-600 border border-green-700 px-2 py-1 rounded-lg">
                <FontAwesomeIcon icon={faPenToSquare} />TimeSlot
              </button>

              <button onClick={() => { setEditingProgram(program); toggleForm(true); }} className="text-blue-500 hover:text-blue-600 px-4 py-2 border border-blue-600 rounded-md">
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button onClick={() => { if (window.confirm('Are you sure you want to delete this program?')) handleDelete(program.id); }} className="text-red-500 hover:text-red-600 px-6 py-2 border rounded-md border-red-600">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </div>
          </td>
        </tr>
      ))}
      {a_Program.length === 0 && (
        <tr>
          <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
            No programs available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
<div className='flex justify-end mt-8 mx-10'>

<button onClick={handlePrevious} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' 
    disabled={offset > length - 10} 
    >Next</button>

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
  {showForm2 &&(  <div className='bg-black/60 ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm2} className=' text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10 '>X</button>

  {showForm2 && (
        <ProgramForm1 onSubmit1={onSubmit1} initialValues={editingProgram || {}} />
      )}
    
   
    </div>
    
)};
 {showForm1 &&(  <div className='bg-black/60 max-w-screen ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm1} className=' text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10 '>X</button>

 
        {showForm1 && (
  <>
  <div className='flex justify-center items-center min-h-[80vh] '>
     
    <div className='w-full max-w-4xl p-8 mx-2 bg-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Class Schedule</h1>
      <div className="flex flex-row justify-end"><button onClick={() => { setEditingProgram(null); toggleForm2(!showForm2); }} className='display-1 my-2 text-white font-semibold h-12 bg-secondary -600  rounded-lg px-3 py-2'>Add New TimeSlot</button>
     </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left text-gray-600">Day</th>
              <th className="py-3 px-4 text-left text-gray-600">Start Time</th>
              <th className="py-3 px-4 text-left text-gray-600">End Time</th>
              <th className="py-3 px-4 text-left text-gray-600">Level</th>
              <th className="py-3 px-4 text-left text-gray-600">No of sit</th>
              <th className="py-3 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.sort((a, b) => {
              if (a.level === b.level) {
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return daysOfWeek.indexOf(a.Day) - daysOfWeek.indexOf(b.Day);
              }
              return a.level - b.level;
            }).map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-3 px-4">{item.Day}</td>
                <td className="py-3 px-4">{item.startTime}</td>
                <td className="py-3 px-4">{item.endTime}</td>
                <td className="py-3 px-4">{item.level}</td>
                <td className="py-3 px-4">{item.nosit}</td>
                <td className="py-3 px-4 flex space-x-2">
              
                  <button onClick={() => { setEditingProgram(item); toggleForm2(true); }} className="text-blue-500 hover:text-blue-600 border border-blue-600 px-3 py-1 rounded">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => handleDelete1(item.id)} className="text-red-500 hover:text-red-600 border border-red-600 px-3 py-1 rounded">
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </>
      )}
   
    </div>
    
)};
    </div>
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
  