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
const Services = () => {
    const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
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
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Services`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Service(data.data);
     setlength(data.length);
   console.log(data.data ,"4");
    } else {
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Services/${id}`);
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Service deleted successfully'
        });
      } catch (error) {
        console.error('Failed to delete the program', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        });
      }
    };
  const onSubmit = async (data) => {
    if(editingProgram) {
      try{
         // If editingProgram is not null, we're editing an existing program
        await axios.put(`${import.meta.env.VITE_API}/api/Services/${editingProgram.id}`, data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Service updated successfully'
        });
      }catch(error){
        console.error('Failed to update the Service', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        });
      }   
    } else {
      try{
      // Otherwise, we're adding a new program
      await axios.post(`${import.meta.env.VITE_API}/api/Services`, data);
      Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Service added successfully'
        });
      }catch(error){
        console.error('Failed to add the Service', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        });
      }
    }
    setEditingProgram(null); // Reset editing state
    toggleForm(false); // Close the form
    fetchPrograms(); // Refresh the programs list
  };

  return (
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Services</h1>

            <div className="mb-4 mx-10">
  <label htmlFor="searchStudentId" className="block text-lg font-medium text-gray-700">Search by Services</label>
  <div className="mt-1  relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="    pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-900 rounded-md"
      placeholder="Enter title"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Services/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Service(data.data); // Assuming the API returns a single student object
            } else {
              setA_Service([]); // Clear the list if no student is found or in case of other statuses
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
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Services</button>
     

      </div>
              <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
              <div className='overflow-x-auto'>
              <table className="min-w-[78vw] divide-y divide-color1  bg-gray-200">
  <thead className="py-2">
    <tr className='mt-8'>
    <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1   text-gray-800 uppercase tracking-wider">No</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Title</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Title (Amharic)</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Icon</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Description</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Description (Amharic)</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Link</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {/* Assuming 'items' is an array of objects containing each item's information based on the new model */}
    {a_Service.map((item ,index) => (
      <tr key={item.id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-bold">{index +  1 + offset}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{item.title}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{item.title_am}</td>
        <td className="px-2 sm:px-6 py-4">
        <i className={`fas ${item.icon} text-4xl`}></i>

        </td>
        <td className="px-2 sm:px-6 py-4 truncate max-w-[200px]">{item.description}</td>
        <td className="px-2 sm:px-6 py-4 truncate max-w-[200px]">{item.description_am}</td>
        <td className="px-2 sm:px-6 py-4">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-color1 -500 hover:text-color1 -600 ">View</a>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium divide-x  gap-2 divide-gray-200 ">
        <button onClick={() => { setEditingProgram(item); toggleForm(true); }}> <div className='border border-color1 -700 px-1 py-2 rounded-md  text-color1 -700'><FontAwesomeIcon icon={faPenToSquare} /></div> 
</button>
          <button onClick={() => handleDelete(item.id)} ><div className='border border-color1 -700 px-1 rounded-md py-2 text-color1 -700'><FontAwesomeIcon icon="fa-solid fa-trash" /></div> </button>
        
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

export default Services;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
<div className='fixed inset-32  flex items-center justify-center p-10'>
  <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
    <h1 className='text-3xl text-center font-bold text-purple-700'>Add Service Details</h1>
    <form className='mt-10 space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Title input */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Title</label>
          <input className='border border-purple-600 rounded-md p-2' {...register('title')} placeholder="Title" />
        </div>
        
        {/* Title in Amharic input */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Title in Amharic</label>
          <input className='border border-purple-600 rounded-md p-2' {...register('title_am')} placeholder="አርእስት" />
        </div>

        {/* Icon URL input */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Icon</label>
          <input className='border border-purple-600 rounded-md p-2' {...register('icon')} placeholder="Icon URL" />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Description textarea */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Description</label>
          <textarea className='border border-purple-600 rounded-md p-2 h-24' {...register('description')} placeholder="Description"></textarea>
        </div>

        {/* Description in Amharic textarea */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Description in Amharic</label>
          <textarea className='border border-purple-600 rounded-md p-2 h-24' {...register('description_am')} placeholder="መግለጫ"></textarea>
        </div>

        {/* Link URL input */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Link</label>
          <input className='border border-purple-600 rounded-md p-2' {...register('link')} placeholder="Link URL" />
        </div>
      </div>

      {/* Submit button */}
      <div className='flex justify-center'>
        <button type="submit" className='bg-purple-700 text-white rounded-md px-10 py-3 transition duration-300 ease-in-out hover:bg-purple-800 w-full max-w-xs'>
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
}