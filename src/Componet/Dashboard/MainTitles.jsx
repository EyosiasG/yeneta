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
import { toast } from 'react-toastify';
library.add(fas);
const MainTitles = () => {
    const [showForm, setShowForm] = useState(false);

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
    }/api/mainTitle`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_MainTitles(data.data);
   
    } else {
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/mainTitle/${id}`);
        
        fetchPrograms();
        toast.success('MainTitles deleted successfully');
      } catch (error) {
        console.error('Failed to delete the MainTitles', error);
        toast.error(error.response.data.message);
      }
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
      axios.post(`${import.meta.env.VITE_API}/api/mainTitle/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
   
      });

    const responseData = response.data;
    console.log(responseData);
    toast.success('MainTitles updated successfully');
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.response.data.message);
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
    toast.success('MainTitles added successfully');
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.response.data.message);
  }}
};


  return (
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Programs</h1>
      <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Program</button>
     

      </div>
  <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'>
  <table className="min-w-[90%] divide-y divide-gray-200   ">
  <thead className="py-2 ">
    <tr className='mt-8'>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Program
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Price
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Description
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Description(Ahmaric)
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Teacher
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Teacher(Ahmaric)
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Course
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Time
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Seats
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 ">
    {a_Program.map((program) => (
      <tr key={program.id}>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">
              {en ? program.title : program.title_am}
            </div>
          </div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.price}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">
          <div className="text-sm text-gray-900">{ program.description}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">
          <div className="text-sm text-gray-900">{ program.description_am}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.teachers}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.teachers_am}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Course}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.time}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.no_sit}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium divide-x  gap-2 divide-gray-200 ">
        <button onClick={() => { setEditingProgram(program); toggleForm(true); }}> <div className='border border-color1 -700 px-1 py-2 rounded-md  text-color1 -700'><FontAwesomeIcon icon={faPenToSquare} /></div> 
</button>
          <button onClick={() => handleDelete(program.id)} ><div className='border border-color1 -700 px-1 rounded-md py-2 text-color1 -700'><FontAwesomeIcon icon="fa-solid fa-trash" /></div> </button>
        
        </td>
      </tr>
    ))}
  </tbody>
</table>
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

export default Programs;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='rounded-md bg-white shadow-lg' style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', overflowY: 'auto', padding: '20px' }}>

<div>
 <h1 className='text-color1 -700 display-1  text-center sm:text-2xl  lg:text-5xl'> Program</h1>
</div>
   
    <form className='flex  flex-wrap gap-1 pt-10 items-center ' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className='flex  flex-wrap gap-1 pt-10 items-center ' >
     <div className='w-full flex flex-wrap flex-row gap-2 sm:text-xs'>
        <div className='flex flex-col gap-1 xs:w-full flex-grow flex-shrink-0 w-32 '>
          <label>Title</label>
          <input className='border  border-color1 -600  rounded-md p-2 '{...register('title')} placeholder="Title" />
        </div>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Title in Amharic</label>
          <input className='border border-color1 -600  rounded-md p-2'{...register('title_am')} placeholder="Title in Amharic" />
        </div>
       </div>
   
        <div className='w-full flex flex-wrap flex-row gap-2'>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Description</label>
          <textarea className='border border-color1 -600  rounded-md  p-2'{...register('description')} placeholder="Description" />
        </div>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label className='sm:text-xs'>Description in Amharic</label>
          <textarea className='border border-color1 -600  rounded-md p-2'{...register('description_am')} placeholder="Description in Amharic" />
        </div>
        </div>
       
        <div className='w-full flex flex-wrap flex-row gap-2'>
       
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Teachers</label>
          <input className='border border-color1 -600  rounded-md p-2'{...register('teachers')} placeholder="Teachers" />
        </div>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Teacher in Amharic</label>
          <input className='border border-color1 -600  rounded-md p-2'{...register('teacher_am')} placeholder="Teacher in Amharic" />
        </div>
        </div>
       
        <div className='w-full flex flex-wrap flex-row gap-2'>
       
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>

          <label>Course</label>
          <input className='border border-color1 -600  rounded-md p-2'{...register('Course')} placeholder="Course" />
        </div>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>

          <label>Price</label>
          <input className='border border-color1 -600  rounded-md p-2' type="number" {...register('price')} placeholder="Price" />
        </div>
        </div>
       
        <div className='w-full flex  flex-wrap  flex-row gap-2'>

        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Number of Seats</label>
          <input className='border border-color1 -600  rounded-md p-2' type="number" {...register('no_sit')} placeholder="Number of Seats" />
        </div>
        <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
          <label>Time</label>
          <input className='border border-color1 -600  rounded-md p-2'{...register('time')} placeholder="Time" />
        </div>
        </div>
        <div className='w-full flex  flex-row gap-2'>
        <div className='flex flex-col gap-1'>
          <label>Image</label>
          <input className='border border-color1 -600  rounded-md p-2' type="file" {...register('img')} placeholder="Image URL" />
        </div>
</div>
<div className='w-full flex justify-center '>
<button type="submit" className='bg-color1 -700 hover:bg-color1 -500 w-full mx-20 py-3 text-white px-4 rounded-md '>Submit</button>

</div>
  
</div>
  
    </form>
    </div>
  );
}