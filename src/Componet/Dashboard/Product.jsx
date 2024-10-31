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
const Product = () => {
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
  const setProduct = useStore((state) => state.setProduct);
  const product = useStore((state) => state.product);
  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Product?offset=0&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setProduct(data.data);
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
        await axios.delete(`${import.meta.env.VITE_API}/api/Product/${id}`);
        
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Program deleted successfully',
        });
      } catch (error) {
        console.error('Failed to delete the Product', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the Product',
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
      axios.post(`${import.meta.env.VITE_API}/api/Product/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
   
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Product updated successfully',
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
    const response = await axios.post(`${import.meta.env.VITE_API}/api/Product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Product added successfully',
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
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Product</h1>

           
      <div className='w-full flex flex-row justify-between px-4 mb-4'>
      <div className="mb-4 mx-10">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Product</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-400 rounded-md"
      placeholder="Enter Product name"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Product/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setProduct(data.data); 
              console.log(data,"fewf")// Assuming the API returns a single student object
            } else {
              setProduct([]); // Clear the list if no student is found or in case of other statuses
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
    
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold h-12 bg-color1 -600  rounded-lg px-3 py-2'>Add New Product</button>
     

      </div>
  <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white  flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'><div className="overflow-x-auto relative w-full shadow-md sm:rounded-lg">
  <table className="min-w-[77vw] text-sm text-left text-gray-500 dark:text-gray-400  divide-y divide-color1">
    <thead className="text-xs text-gray-600 uppercase bg-gray-300 ">
      <tr>
        
        <th scope="col" className="px-6 py-3">No</th>
        <th scope="col" className="px-6 py-3">Name</th>
        <th scope="col" className="px-6 py-3">Description</th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Image</th>
        <th scope="col" className="px-6 py-3">Video</th>
        <th scope="col" className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {product.map((product, index) => (
        <tr key={product.id}>
          <td className="px-6 py-4 whitespace-nowrap font-bold">{index + offset + 1}</td>
          <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
          <td className="px-6 py-4 whitespace-wrap truncate max-w-[200px]">{product.description}</td>
          <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <img src={`${import.meta.env.VITE_IMG_URL}/${product.image}`} alt={product.name + ' image'} style={{width: '75px', maxHeight: '75px'}} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <video controls style={{width: '100px'}}>
              <source src={product.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex justify-end space-x-2">
              <button onClick={() => { setEditingProgram(product); toggleForm(true); }} className="text-blue-500 hover:text-blue-600">
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600">
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </button>
            </div>
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

export default Product;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset , formState: { errors } }  = useForm({
    
    defaultValues: initialValues,
  });
  
  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10 '>
    <form className="flex flex-col gap-4 p-10 bg-white shadow-lg rounded-lg w-full max-w-lg" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h1 className='text-blue-500 text-3xl font-bold text-center'>Add Product</h1>
     
      {/* Product Name */}
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Name</label>
          <input className="form-input border border-gray-300 px-4 py-2 rounded-lg" {...register('name', { required: true })} placeholder="Product Name" />
          {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
  
      {/* Description */}
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Description</label>
          <textarea className="form-input border border-gray-300 px-4 py-2 rounded-lg" rows={6} {...register('description', { required: true })} placeholder="Product Description" />
          {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
  
      {/* Price */}
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Price</label>
          <input className="form-input border border-gray-300 px-4 py-2 rounded-lg" type="float" {...register('price', { required: true })} placeholder="Product Price" />
          {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
      </div>
  
      {/* Video Upload */}
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Video URL</label>
          <input className="form-input border border-gray-300 px-4 py-2 rounded-lg" type="text" {...register('video', { required: true })} placeholder="Video URL" />
          {errors.video && <span className="text-red-500 text-sm">A video is required</span>}
      </div>
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Strip Link</label>
          <input className="form-input border border-gray-300 px-4 py-2 rounded-lg" type="text" {...register('P1', { required: true })} placeholder="Strip Link" />
          {errors.video && <span className="text-red-500 text-sm">A video is required</span>}
      </div>
      {/* Image Upload */}
      <div className="flex flex-col gap-1">
          <label className="font-semibold">Image</label>
          <input className="form-input border border-gray-300 px-4 py-2 rounded-lg" type="file" accept="image/*" {...register('img', { required: !initialValues.id })} />
          {errors.img && <span className="text-red-500 text-sm">An image is required</span>}
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
      </div>
    </form>
  </div>
  
  );
}