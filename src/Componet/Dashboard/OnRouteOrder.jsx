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
const OnRouteOrder = () => {
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
  const { setA_Ceo, en,setOrder, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, order, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/OrderStatus?offset=${offset}&limit=10&deliveryStatus=OnRoute`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setOrder(data.data);
     setlength(data.length);
   
    } else {
      setOrder([]);
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     [offset]);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Order/${id}`);
        
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
      axios.post(`${import.meta.env.VITE_API}/api/Order/${editingProgram.id}`, formData, {
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
    const response = await axios.post(`${import.meta.env.VITE_API}/api/Order`, formData, {
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
return(
<div className='pt-10'>
<h1 className='text-center text-5xl text-color1 -700 display-1'>OnRoute Order</h1>


<div className='w-full flex flex-row justify-between px-4 mb-4'>
<div className="mb-4 mx-10">
<label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Order</label>
<div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
<input
type="text"
name="searchStudentId"
id="searchStudentId"
className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-400 rounded-md"
placeholder="Enter Order"
onChange={async (e) => {
const studentId = e.target.value;
if (studentId.trim() !== '') {
try {
const response = await fetch(`${import.meta.env.VITE_API}/api/Search/${studentId}`, { 
  method: 'GET',
});
if (!response.ok) {
  throw new Error("Failed to fetch data");
}
const data = await response.json();
if (data.status === 1) {
  setOrder(data.data); // Assuming the API returns a single student object
} else {
  setOrder([]); // Clear the list if no student is found or in case of other statuses
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

<button >.</button>


</div>
<div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
<div className='overflow-x-auto'><div className="overflow-x-auto relative w-full shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left text-black ">
<thead className="text-xs text-black uppercase bg-gray-300 ">
<tr>
<th scope="col" className="px-6 py-3">No</th>
<th scope="col" className="px-6 py-3">First Name</th>
<th scope="col" className="px-6 py-3">Last Name</th>
<th scope="col" className="px-6 py-3">Email</th>
<th scope="col" className="px-6 py-3">Phone</th>
<th scope="col" className="px-6 py-3">Address 1</th>
<th scope="col" className="px-6 py-3">Address 2</th>
<th scope="col" className="px-6 py-3">City</th>
<th scope="col" className="px-6 py-3">State</th>
<th scope="col" className="px-6 py-3">Zip Code</th>
<th scope="col" className="px-6 py-3">Delivery Status</th>
<th scope="col" className="px-6 py-3">Order No</th>
<th scope="col" className="px-6 py-3">Action</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{order.length > 0 ? (
  order.map((order, index) => (
    <tr key={order.id}>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1 + offset}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.first_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.last_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.address1}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.address2}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.city}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.state}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.zipcode}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-lg font-bold border-2 ${order.deliveryStatus === 'Unpaid' ? 'text-red-500 border-red-500' : order.deliveryStatus === 'Pending' ? 'text-yellow-500 border-yellow-500' : order.deliveryStatus === 'OnRoute' ? 'text-blue-500 border-blue-500' : 'text-green-500 border-green-500'}`}>
          {order.deliveryStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-bold">{order.orderNo}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-end space-x-2">
          <button onClick={() => { setEditingProgram(order); toggleForm(true); }} className="w-full px-6 py-1 text-lg rounded-md border-2 border-teal-600 text-teal-500 hover:text-teal-700">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="13" className="px-6 py-4 text-center text-gray-500">No orders found</td>
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
</div>
);
};

export default OnRouteOrder;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset , formState: { errors } }  = useForm({
    
    defaultValues: initialValues,
  });
  
  
  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);
if (initialValues && initialValues.email) {
  console.log(22);
} else {
  console.log(99);
}
console.log(initialValues ,"fef");
  return (
    <div className='fixed inset-32 flex items-center justify-center'>
    <div className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full'>
      <h1 className='text-2xl font-semibold text-center text-blue-700 mb-6'>Product Registration</h1>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className='grid grid-cols-2 gap-4'>
          {/* First Name and Last Name */}
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>First Name</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id}  {...register('first_name')} placeholder="First Name" />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Last Name</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('last_name')} placeholder="Last Name" />
          </div>
  
          {/* Email and Phone */}
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Email</label>
            <input type="email" className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('email')} placeholder="Email" />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Phone</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('phone')} placeholder="Phone" />
          </div>
  
          {/* Address1 and Address2 */}
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Address 1</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('address1')} placeholder="Address 1" />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Address 2</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('address2')} placeholder="Address 2" />
          </div>
  
          {/* City and State */}
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>City</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('city')} placeholder="City" />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>State</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('state')} placeholder="State" />
          </div>
  
          {/* Zip Code and Delivery Status */}
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Zipcode</label>
            <input className='form-input border border-gray-300 rounded-lg p-2 focus:ring-blue-500' disabled={initialValues.id} {...register('zipcode')} placeholder="Zipcode" />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 font-semibold'>Delivery Status</label>
            <select className='form-select border border-gray-300 rounded-lg p-2 focus:ring-blue-500'  {...register('deliveryStatus', { required: true })} defaultValue="Unpaid">
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
              <option value="OnRoute">OnRoute</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
  
        <div className='flex justify-center mt-6'>
          <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1'>Submit</button>
        </div>
      </form>
    </div>
  </div>
  
  );
}