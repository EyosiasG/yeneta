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
const Testimonial = () => {
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
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Testimonial?offset=0&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Testimonials(data.data);
     setlength(data.length); 
    } else {
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Testimonial/${id}`);
        
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Testimonial deleted successfully',
        });
      } catch (error) {
        console.error('Failed to delete the Testimonial', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      }
    };
  // Ensure 'data.img' is appended correctly if it's a file
// Update the onSubmit function to handle file uploads properly
const onSubmit = async (data) => {
  console.log("w");
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
      axios.post(`${import.meta.env.VITE_API}/api/Testimonial/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Testimonial updated successfully',
    });
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
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
    const response = await axios.post(`${import.meta.env.VITE_API}/api/Testimonial`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Testimonial created successfully',
    });
    setEditingProgram(null);
    toggleForm();
    fetchPrograms();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    });
  }}
};

  return (
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Testimonial</h1>

            <div className="mb-4 px-5">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Author</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-700 rounded-md"
      placeholder="Enter Author"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Testimonial/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Testimonials(data.data); // Assuming the API returns a single student object
            } else {
              setA_Testimonials([]); // Clear the list if no student is found or in case of other statuses
            }
          } catch (error) {
            console.error('Error fetching student by ID:', error);
          }
        } else {
          fetchPrograms(); // Reset to original list if input is cleared
        }
      }}
  
  />
   <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Testmonial</button>
     

      </div>
  </div>
  
</div>
     
  <div className='rounded-lg shadow-2xl shadow-color1  bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'>
  <table className="min-w-[77vw] divide-y divide-color1 bg-gray-200">
  <thead className="py-2">
    <tr className='mt-8'>
    <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
    Roll No
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Author
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Author (Amharic)
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Professional
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Professional (Amharic)
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Rating
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Image
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1-500 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {a_Testimonials.map((testimonial , index) => (
      <tr key={testimonial.id}>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {index + 1+ offset}
          </div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {testimonial.author}
          </div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{testimonial.author_am}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">
          <div className="text-sm text-gray-900">{testimonial.professional}</div>
        </td>
        <td className="px-2 sm:px-6 py-4">
          <div className="text-sm text-gray-900">{testimonial.professional_am}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{testimonial.rating}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <img src={testimonial.image} alt="testimonial" className="w-10 h-10 rounded-full" />
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium divide-x gap-2 divide-gray-200">
          <button onClick={() => { setEditingProgram(testimonial); toggleForm(true); }}>
            <div className='border border-color1-700 px-1 py-2 rounded-md text-color1-700'>
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          </button>
          <button onClick={() => handleDelete(testimonial.id)}>
            <div className='border border-color1-700 px-1 rounded-md py-2 text-color1-700'>
              <FontAwesomeIcon icon="fa-solid fa-trash" />
            </div>
          </button>
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

export default Testimonial;
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
    <h1 className='text-3xl text-center font-bold text-blue-500'>Testimonial</h1>
    <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* Author Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Author</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('author', { required: "Author is required" })} placeholder="Author" />
          {errors.author && <p className="text-red-500 text-xs italic">{errors.author.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Author in Amharic</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('author_am', { required: "Author in Amharic is required" })} placeholder="Author in Amharic" />
          {errors.author_am && <p className="text-red-500 text-xs italic">{errors.author_am.message}</p>}
        </div>
      </div>

      {/* Professional Title Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <label className='font-semibold'>Professional</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('professional', { required: "Professional title is required" })} placeholder="Professional" />
          {errors.professional && <p className="text-red-500 text-xs italic">{errors.professional.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='font-semibold'>Professional in Amharic</label>
          <input className='form-input border border-blue-300 rounded-md p-2' {...register('professional_am', { required: "Professional title in Amharic is required" })} placeholder="Professional in Amharic" />
          {errors.professional_am && <p className="text-red-500 text-xs italic">{errors.professional_am.message}</p>}
        </div>
      </div>

      {/* Rating Field */}
      <div className='flex flex-col'>
        <label className='font-semibold text-lg mb-2 text-center'>Rating</label>
        <div className='flex items-center space-x-4 border shadow-xl justify-center p-2'>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className='flex items-center text-secondary display-1 space-x-1'>
              <input
                type="radio"
                value={value}
                {...register('rating', { required: "Rating is required" })}
                className='form-radio h-6 w-6 text-secondary focus:ring-blue-500'
              />
              <span className='text-xl font-medium'>{value}</span>
            </label>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-sm italic">{errors.rating.message}</p>}
      </div>

      {/* Image Upload */}
      <div className='flex flex-col'>
        <label className='font-semibold'>Image</label>
        <input className='form-input border border-blue-300 rounded-md p-2' type="file" {...register('img', { required: !initialValues.id })} />
        {errors.img && <p className="text-red-500 text-xs italic">{errors.img.message}</p>}
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