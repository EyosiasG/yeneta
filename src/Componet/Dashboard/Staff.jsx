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
    
    const limit = 10;

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

    const fetchPrograms = async () => {
      const allRides = `${import.meta.env.VITE_API}/api/Staff?limit=10&offset=${offset}`;

      const response = await fetch(allRides, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status === 1) {
        setA_Staff(data.data);
      }
    }

    useEffect(() => {
      fetchPrograms();
    }, [offset]);

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
          const response = await axios.post(`${import.meta.env.VITE_API}/api/Staff/${editingProgram.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
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
          const response = await axios.post(`${import.meta.env.VITE_API}/api/Staff`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
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
        }
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className=" mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Staff Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Staff</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter name"
                  onChange={async (e) => {
                    const searchTerm = e.target.value;
                    if (searchTerm.trim()) {
                      try {
                        const response = await fetch(`${import.meta.env.VITE_API}/api/Staff/${searchTerm}`);
                        if (!response.ok) throw new Error("Failed to fetch data");
                        const data = await response.json();
                        if (data.status === 1) {
                          setA_Staff(data.data);
                        } else {
                          setA_Staff([]);
                        }
                      } catch (error) {
                        console.error('Error:', error);
                      }
                    } else {
                      fetchPrograms();
                    }
                  }}
                />
              </div>
              
              <button 
                onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
              >
                Add New Staff
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['No', 'Name', 'Name (አማርኛ)', 'Position', 'Position (አማርኛ)', 'Email', 'Details', 'Details (አማርኛ)', 'Subtitle', 'Subtitle (አማርኛ)', 'Actions'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {a_Staff.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1 + offset}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.name_am}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position_am}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.social_link}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="truncate max-w-[200px]" title={member.details}>{member.details}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="truncate max-w-[200px]" title={member.details_am}>{member.details_am}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.subtitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.subtitle_am}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => { setEditingProgram(member); toggleForm(true); }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={handlePrevious}
                disabled={offset === 0}
                className={`px-4 py-2 rounded-md ${
                  offset === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={offset > length - 10}
                className={`px-4 py-2 rounded-md ${
                  offset > length - 10
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingProgram ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h2>
                  <button 
                    onClick={toggleForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default Staff;

function ProgramForm({ onSubmit, initialValues }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            {...register('name', { required: "Name is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name in Amharic</label>
          <input
            {...register('name_am', { required: "Name in Amharic is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ስም"
          />
          {errors.name_am && <p className="mt-1 text-sm text-red-600">{errors.name_am.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            {...register('position', { required: "Position is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter position"
          />
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position in Amharic</label>
          <input
            {...register('position_am', { required: "Position in Amharic is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ቦታ"
          />
          {errors.position_am && <p className="mt-1 text-sm text-red-600">{errors.position_am.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('social_link', { 
              required: "Email is required",
              pattern: { 
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address"
              }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="email@example.com"
          />
          {errors.social_link && <p className="mt-1 text-sm text-red-600">{errors.social_link.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            {...register('img', { required: !initialValues.id })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.img && <p className="mt-1 text-sm text-red-600">Image is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            {...register('subtitle', { required: "Subtitle is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter subtitle"
          />
          {errors.subtitle && <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle in Amharic</label>
          <input
            {...register('subtitle_am', { required: "Subtitle in Amharic is required" })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ንዑስ ርዕስ"
          />
          {errors.subtitle_am && <p className="mt-1 text-sm text-red-600">{errors.subtitle_am.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
          <textarea
            {...register('details', { required: "Details are required" })}
            rows="4"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter details"
          ></textarea>
          {errors.details && <p className="mt-1 text-sm text-red-600">{errors.details.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Details in Amharic</label>
          <textarea
            {...register('details_am', { required: "Details in Amharic are required" })}
            rows="4"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="ዝርዝሮች"
          ></textarea>
          {errors.details_am && <p className="mt-1 text-sm text-red-600">{errors.details_am.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          {initialValues.id ? 'Update Staff Member' : 'Add Staff Member'}
        </button>
      </div>
    </form>
  );
}