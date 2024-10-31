import React, { useState, useEffect } from 'react';
import axios from 'axios';import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import Hero1 from '../../assets/img/hero7.png'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert2';
library.add(fas);
const Events = () => {
    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const limit = 10; // Items per page

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
    const { setA_Ceo, en, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus, a_Event, a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchPrograms = async () => {
        const allRides = `${import.meta.env.VITE_API}/api/Events?offset=${offset}&limit=10`;

        const response = await fetch(allRides, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === 1) {
            setA_Event(data.data);
        } else {
            return;
        }
    }
    useEffect(() => {
        fetchPrograms();
    }, [offset]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API}/api/Events/${id}`);
            fetchPrograms();
            swal.fire({
                title: "Success",
                text: "Program deleted successfully",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
        } catch (error) {
            console.error('Failed to delete the program', error);
            swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        if (editingProgram) {
            for (const [key, value] of Object.entries(data)) {
                if (key === 'img' && data.img) {
                    if (data.img.length) {
                        formData.append(key, data.img[0]);
                    } else {
                        formData.append(key, data.img);
                    }
                } else {
                    formData.append(key, value);
                    formData.append("_method", "PUT");
                }
            }

            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/api/Events/${editingProgram.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const responseData = response.data;
                console.log(responseData);
                swal.fire({
                    title: "Success",
                    text: "Event updated successfully",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                setEditingProgram(null);
                toggleForm();
                fetchPrograms();
            } catch (error) {
                console.error('Error:', error);
                swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } else {
            for (const [key, value] of Object.entries(data)) {
                if (key === 'img' && data.img) {
                    if (data.img.length) {
                        formData.append(key, data.img[0]);
                    } else {
                        formData.append(key, data.img);
                    }
                } else {
                    formData.append(key, value);
                }
            }

            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/api/Events`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const responseData = response.data;
                console.log(responseData);
                swal.fire({
                    title: "Success",
                    text: "Event Added successfully",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                setEditingProgram(null);
                toggleForm();
                fetchPrograms();
            } catch (error) {
                console.error('Error:', error);
                swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        }
    };
  return (
    <div className='pt-10'>
      <ToastContainer />

      <h1 className='text-center text-5xl text-color1 -700 display-1'>Events</h1>
      <div className='w-full flex flex-row justify-between px-4 mb-4'>
      <div className="mb-4 mx-10">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Events</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchEvents"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-400 rounded-md"
      placeholder="Enter title"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Events/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Event(data.data); // Assuming the API returns a single student object
            } else {
              setA_Event([]); // Clear the list if no student is found or in case of other statuses
            }
          } catch (error) {
            console.error('Error fetching event:', error);
          }
        } else {
          fetchPrograms(); // Reset to original list if input is cleared
        }
      }}
  
  />
  
  </div>
  
</div>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1 text-white font-semibold bg-color1 -600 h-12  rounded-lg px-3 py-2'>Add New Events</button>
     

      </div>
              <div className='rounded-lg shadow-2xl shadow-color2 -900/70 bg-white p-1 mx-5 min-h-[80vh] '>
              <div className='overflow-x-auto'>
              <table className="min-w-full divide-y divide-color1">
  <thead className="bg-gray-200">
    <tr>
    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        No
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Title
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Description
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Description in Amharic
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Location
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Location in Amharic
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Time & Date
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {a_Event.map((event , index) => (
      <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-bold text-gray-900">
            {index + 1 + offset}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {en ? event.title : event.title_am}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 truncate max-w-[200px]">{event.description}</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 truncate max-w-[200px]">{ event.description_am}</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">{ event.location }</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">{ event.location_am}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{`${event.time}, ${event.date}`}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap flex flex-row justify-end gap-2">
        <button onClick={() => { setEditingProgram(event); toggleForm(true); }} className='text-blue-500 hover:text-blue-700'>
          <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
        </button>
          <button onClick={() => handleDelete(event.id)} className='text-red-500 hover:text-red-700'>
          <FontAwesomeIcon icon="fa-solid fa-trash" className="text-lg" />
        </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<div className='flex justify-end mt-8 mx-10'>

<button onClick={handlePrevious} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl'>Next</button>

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

export default Events;
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
      <h1 className='text-3xl text-center font-bold text-purple-700'>Add Event Details</h1>
      <form className='mt-10 space-y-6' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Title and Title in Amharic */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Title</label>
            <input className='border border-purple-600 rounded-md p-2' {...register('title', { required: "Title is required" })} placeholder="Title" />
            {errors.title && <p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Title in Amharic</label>
            <input className='border border-purple-600 rounded-md p-2' {...register('title_am', { required: "Title in Amharic is required" })} placeholder="Title in Amharic" />
            {errors.title_am && <p className='text-red-500 text-xs mt-1'>{errors.title_am.message}</p>}
          </div>
  
          {/* Description and Description in Amharic */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Description</label>
            <textarea className='border border-purple-600 rounded-md p-2 h-24' {...register('description', { required: "Description is required" })} placeholder="Description" />
            {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Description in Amharic</label>
            <textarea className='border border-purple-600 rounded-md p-2 h-24' {...register('description_am', { required: "Description in Amharic is required" })} placeholder="Description in Amharic" />
            {errors.description_am && <p className='text-red-500 text-xs mt-1'>{errors.description_am.message}</p>}
          </div>
  
          {/* Location and Location in Amharic */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Location</label>
            <input className='border border-purple-600 rounded-md p-2' {...register('location', { required: "Location is required" })} placeholder="Location" />
            {errors.location && <p className='text-red-500 text-xs mt-1'>{errors.location.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Location in Amharic</label>
            <input className='border border-purple-600 rounded-md p-2' {...register('location_am', { required: "Location in Amharic is required" })} placeholder="Location in Amharic" />
            {errors.location_am && <p className='text-red-500 text-xs mt-1'>{errors.location_am.message}</p>}
          </div>
  
          {/* Time and Date */}
          <div className='flex flex-col'>
            <label className='font-semibold'>Time</label>
            <input className='border border-purple-600 rounded-md p-2' type="time" {...register('time', { required: "Time is required" })} placeholder="Time" />
            {errors.time && <p className='text-red-500 text-xs mt-1'>{errors.time.message}</p>}
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Date</label>
            <input className='border border-purple-600 rounded-md p-2' type="date" {...register('date', { required: "Date is required" })} />
            {errors.date && <p className='text-red-500 text-xs mt-1'>{errors.date.message}</p>}
          </div>
        </div>
  
        {/* Image Upload */}
        <div className='flex flex-col'>
          <label className='font-semibold'>Image</label>
          <input className='border border-purple-600 rounded-md p-2' type="file" {...register('img' ,{ required: !initialValues.id })} placeholder="Upload Image" />
          {errors.img && <p className="text-red-500 text-xs italic">Image is required</p>}
        </div>
  
        {/* Submit Button */}
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