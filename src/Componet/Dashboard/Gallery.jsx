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
const Gallerys = () => {
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
    const [Catagory, setCatagory] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
  const [programs, setPrograms] = useState({});
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchGallery = async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Gallerys?offset=${offset}&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Gallery(data.data);
     setlength(data.length); 
   
    } else {
      setA_Gallery([]); // Set to empty array if no data
      setlength(0); // Set length to 0 if no data
      return;
    }
  }
  useEffect(() => {
  
 
    fetchGallery();},
     [offset]);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Gallerys/${id}`);
        fetchGallery()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Gallery deleted successfully',
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
      axios.post(`${import.meta.env.VITE_API}/api/Gallerys/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
   
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Gallery Updated successfully',
    });
    setEditingProgram(null);
    toggleForm();
    fetchGallery()
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
    const response = await axios.post(`${import.meta.env.VITE_API}/api/Gallerys`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Gallery Added successfully',
    });
    setEditingProgram(null);
    toggleForm();    
    fetchGallery()
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
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Gallery</h1>
      <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Image</button>
     

      </div>
  <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'>

  <div className="overflow-x-auto py-10">
    <table className="min-w-[80vw] divide-y divide-color1 ">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
           No
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
            Image
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
           Type
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {a_Gallery.map((event,index) => (
          <tr key={event.id}>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-bold text-gray-900">{index + 1 + offset}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <img src={`${import.meta.env.VITE_IMG_URL}/${event.img_url}`} alt="Event" className="w-32 h-32 object-cover rounded-md"/>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{en ? event.title : event.title_am}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 truncate ">{en ? event.description : event.description_am}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 truncate ">{event.group_name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        ))}
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
  {showForm &&(  <div className='bg-black/50 ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm} className=' text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10 '>X</button>

  {showForm && (
    <>
        <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} toggleForm={toggleForm} />
        </>
    
      )}
   
    </div>
    
)};
    </div>
  );
};

export default Gallerys;
function ProgramForm({ onSubmit, initialValues, toggleForm }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
<div className='fixed inset-40  z-20 flex items-center justify-center p-10'>

  <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
    <h1 className='text-3xl text-center font-bold text-purple-700'>Upload Image</h1>
    <form className='mt-10 space-y-6' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* Inputs for text fields with full width and modern design */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col'>
          <input className='border p-2 rounded-md' {...register('title', { required: "Title is required" })} placeholder="Title" />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
        </div>
        <div className='flex flex-col'>
          <input className='border p-2 rounded-md' {...register('title_am', { required: "Title in Amharic is required" })} placeholder="Title in Amharic" />
          {errors.title_am && <p className="text-red-500 text-xs italic">{errors.title_am.message}</p>}
        </div>
        <div className='flex flex-col'>
          <textarea className='border p-2 rounded-md h-24' {...register('description', { required: "Description is required" })} placeholder="Description" />
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
        </div>
        <div className='flex flex-col'>
          <textarea className='border p-2 rounded-md h-24' {...register('description_am', { required: "Description in Amharic is required" })} placeholder="Description in Amharic" />
          {errors.description_am && <p className="text-red-500 text-xs italic">{errors.description_am.message}</p>}
        </div>
        <div className='flex flex-col'>
          <input className='border p-2 rounded-md' {...register('category', { required: "Category is required", value: "video" })} placeholder="Category (if for videos just use 'video')" />
          {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
        </div>
        <div className='flex flex-col'>
          <input className='border p-2 rounded-md' {...register('category_am', { required: "Youtube Link is required" })} placeholder="YouTube Link" />
          {errors.category_am && <p className="text-red-500 text-xs italic">{errors.category_am.message}</p>}
        </div>

        <div className='flex flex-col'>
       
        <div className='flex items-center space-x-4 bg-gray-100 p-3 rounded-lg'>
          <input type="radio" id="group1" className='form-radio h-5 w-5 text-teal-600' {...register('group_name', { required: "Type is required" })} value="Video" />
          <label htmlFor="group1" className='text-lg text-gray-700'>Video</label>
          <input type="radio" id="group2" className='form-radio h-5 w-5 text-teal-600' {...register('group_name')} value="Gallery" />
          <label htmlFor="group2" className='text-lg text-gray-700'>Gallery</label>
        </div>
        {errors.group_name && <p className="text-red-500 text-xs italic">{errors.group_name.message}</p>}
         </div>
      </div>

      {/* File upload input */}
      <div className='flex flex-col justify-center items-center w-full'>
        <label className='block w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center'>
          <input type="file" className='opacity-0 w-full h-full' {...register('img', { required: !initialValues.id })} />
          <span className='text-gray-500'>Drag and drop image here or click to select file</span>
        </label>
        {errors.img && <p className="text-red-500 text-xs italic">Image is required</p>}
      </div>

      {/* Submit button */}
      <div className='flex justify-center'>
        <button type="submit" className='bg-purple-700 text-white rounded-md px-10 py-3 transition duration-300 ease-in-out hover:bg-purple-800'>
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
  );
}