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
const Invoice = () => {
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
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, setA_Invoice, a_Invoice, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/invoices?offset=${offset}&limit=10`;

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
      setA_Program([]);
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     [ offset]);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/invoices/${id}`);
        
        fetchPrograms();
        Swal.fire({
          icon: 'success',
          title: 'Invoice Deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Failed to delete the invoices', error);
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
      axios.post(`${import.meta.env.VITE_API}/api/invoices/${editingProgram.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
   
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Invoice Updated successfully',
      showConfirmButton: false,
      timer: 1500
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
    const response = await axios.post(`${import.meta.env.VITE_API}/api/invoices`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    const responseData = response.data;
    console.log(responseData);
    Swal.fire({
      icon: 'success',
      title: 'Invoice Added successfully',
      showConfirmButton: false,
      timer: 1500
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
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Invoice</h1>
            <div className="mb-2 px-4">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by invoce</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 border focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border-gray-700 rounded-md"
      placeholder="Enter here"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/invoices/${studentId}`, { 
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
    <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }} className='display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Invoice</button>
     

      </div>
  </div>

</div>
     
  <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
  <div className='overflow-x-auto'>
  <table className="min-w-[90%] divide-y divide-color1 bg-gray-200">
  <thead className="py-2">
    <tr className='mt-8'>
    <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1   text-gray-800 uppercase tracking-wider">
        No
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Invoice ID
      </th>
      <th scope="col" className="px-1 sm:px-1 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Student Name
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Student ID
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Email
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Phone
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Issue Date
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Payment Type
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Amount
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Transaction ID
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Status
      </th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-gray-800 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {a_Program.map((program ,index) => (
      <tr key={program.id}>
        
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm font-bold text-gray-900">{index + 1 + offset}</div>
          </div>
        </td>

        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">{program.invoiceId}</div>
          </div>
        </td>
        <td className="px-1 sm:px-1 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Student_name}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Student_id}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Email}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Phone}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Issue_date}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Paymenttype}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Amount}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.Tx_id}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{program.status}</div>
        </td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium divide-x gap-2 divide-gray-200">
          <button onClick={() => { setEditingProgram(program); toggleForm(true); }}>
            <div className='border border-color1 -700 px-1 py-2 rounded-md text-color1 -700'>Edit</div>
          </button>
          <button onClick={() => { if (window.confirm('Are you sure you want to delete this invoice?')) handleDelete(program.id); }}>
            <div className='border border-color1 -700 px-1 rounded-md py-2 text-color1 -700'>Delete</div>
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

export default Invoice;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
    <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full overflow-y-auto'>
      <h1 className='text-3xl text-center font-bold text-blue-500'>Invoice Details</h1>
      <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Invoice ID and Student Name */}
          <div className='flex flex-col hidden'>
            <label className='font-semibold'>Invoice ID</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('invoiceId')} placeholder="Invoice ID" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Student Name</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('Student_name')} placeholder="Student Name" />
          </div>
  
          {/* Student ID and Email */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Student ID</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('Student_id')} placeholder="Student ID" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Email</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('Email')} placeholder="Email" />
          </div>
  
          {/* Phone and Issue Date */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Phone</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('Phone')} placeholder="Phone" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Issue Date</label>
            <input className='form-input border border-blue-300 rounded-md p-2' type="date" {...register('Issue_date')} />
          </div>
  
          {/* Payment Type and Amount */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Payment Type</label>
            <select className='form-select border border-blue-300 rounded-md p-2' {...register('Paymenttype')}>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Square">Square</option>
              <option value="Zelle">Zelle</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Amount</label>
            <input className='form-input border border-blue-300 rounded-md p-2' type="number" {...register('Amount')} placeholder="Amount" />
          </div>
  
          {/* Transaction ID and Status */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Transaction ID</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('Tx_id')} placeholder="Transaction ID" />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Status</label>
            <input className='form-input border border-blue-300 rounded-md p-2' {...register('status')} placeholder="Status" />
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