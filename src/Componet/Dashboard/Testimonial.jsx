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
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchPrograms = async () => {
    const allRides = `${import.meta.env.VITE_API}/api/Testimonial?offset=0&limit=10`;

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
    }
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

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
        const response = await axios.post(`${import.meta.env.VITE_API}/api/Testimonial/${editingProgram.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Testimonial updated successfully',
        });
        setEditingProgram(null);
        toggleForm();
        fetchPrograms();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
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
        const response = await axios.post(`${import.meta.env.VITE_API}/api/Testimonial`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        Swal.fire({
          icon: 'success', 
          title: 'Success',
          text: 'Testimonial created successfully',
        });
        setEditingProgram(null);
        toggleForm();
        fetchPrograms();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className=" mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Testimonial Management
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Author
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter author name..."
                onChange={async (e) => {
                  const authorName = e.target.value;
                  if (authorName.trim() !== '') {
                    try {
                      const response = await fetch(`${import.meta.env.VITE_API}/api/Testimonial/${authorName}`);
                      if (!response.ok) throw new Error("Failed to fetch data");
                      const data = await response.json();
                      if (data.status === 1) {
                        setA_Testimonials(data.data);
                      } else {
                        setA_Testimonials([]);
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Add New Testimonial
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author (Amharic)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional (Amharic)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {a_Testimonials.map((testimonial, index) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1 + offset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{testimonial.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{testimonial.author_am}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{testimonial.professional}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{testimonial.professional_am}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={testimonial.image} alt={testimonial.author} className="h-12 w-12 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => { setEditingProgram(testimonial); toggleForm(true); }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash" className="h-5 w-5" />
                        </button>
                      </div>
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
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProgram ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button
                  onClick={toggleForm}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

export default Testimonial;

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
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            {...register('author', { required: "Author is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author (Amharic)</label>
          <input
            type="text"
            {...register('author_am', { required: "Author in Amharic is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.author_am && (
            <p className="mt-1 text-sm text-red-600">{errors.author_am.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            {...register('professional', { required: "Professional title is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.professional && (
            <p className="mt-1 text-sm text-red-600">{errors.professional.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Title (Amharic)</label>
          <input
            type="text"
            {...register('professional_am', { required: "Professional title in Amharic is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.professional_am && (
            <p className="mt-1 text-sm text-red-600">{errors.professional_am.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={value}
                {...register('rating', { required: "Rating is required" })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">{value}</span>
            </label>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600 text-center">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          {...register('img', { required: !initialValues.id })}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {errors.img && (
          <p className="mt-1 text-sm text-red-600">{errors.img.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues.id ? 'Update Testimonial' : 'Create Testimonial'}
        </button>
      </div>
    </form>
  );
}