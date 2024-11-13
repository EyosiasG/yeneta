import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { faCoffee, faPenToSquare, faTrash, faPlus, faImage } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';

library.add(fas);

// Animation variants
const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 }
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4
    }
  })
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  }
};

const Gallerys = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [length, setlength] = useState("");
  const limit = 10;
  const [Catagory, setCatagory] = useState([]);
  const [programs, setPrograms] = useState({});
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus, a_Event, a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/api/Gallerys?offset=${offset}&limit=10`);
      if (response.data.status === 1) {
        setA_Gallery(response.data.data);
        setlength(response.data.length);
      } else {
        setA_Gallery([]);
        setlength(0);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load gallery items'
      });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [offset]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API}/api/Gallerys/${id}`);
        fetchGallery();
        Swal.fire(
          'Deleted!',
          'Gallery item has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to delete item'
      });
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Handle file upload
    if (data.img?.[0]) {
      formData.append('img', data.img[0]);
    }

    // Add other form fields
    Object.keys(data).forEach(key => {
      if (key !== 'img') {
        formData.append(key, data[key]);
      }
    });

    if (editingProgram) {
      formData.append("_method", "PUT");
    }

    try {
      const url = editingProgram 
        ? `${import.meta.env.VITE_API}/api/Gallerys/${editingProgram.id}`
        : `${import.meta.env.VITE_API}/api/Gallerys`;

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Gallery ${editingProgram ? 'updated' : 'added'} successfully`,
        showConfirmButton: false,
        timer: 1500
      });

      setEditingProgram(null);
      toggleForm();
      fetchGallery();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred'
      });
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-8"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Gallery Management
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New Image
          </motion.button>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["No", "Image", "Title", "Description", "Type", "Actions"].map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {a_Gallery.map((event, index) => (
                    <motion.tr 
                      key={event.id}
                      custom={index}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1 + offset}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          src={`${import.meta.env.VITE_IMG_URL}/${event.img_url}`} 
                          alt="Gallery" 
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {en ? event.title : event.title_am}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {en ? event.description : event.description_am}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                          {event.group_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-lg" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-4 p-4 bg-gray-50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={offset === 0}
              className={`px-4 py-2 rounded-lg ${offset === 0 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-purple-600 text-white hover:bg-purple-700'} transition-all duration-200`}
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={offset > length - 10}
              className={`px-4 py-2 rounded-lg ${offset > length - 10
                ? 'bg-gray-200 text-gray-400'
                : 'bg-purple-600 text-white hover:bg-purple-700'} transition-all duration-200`}
            >
              Next
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <ProgramForm 
                onSubmit={onSubmit} 
                initialValues={editingProgram || {}} 
                toggleForm={toggleForm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Gallerys;

function ProgramForm({ onSubmit, initialValues, toggleForm }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full m-4 overflow-y-auto max-h-[90vh]"
      variants={modalVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {initialValues.id ? 'Edit Image' : 'Upload New Image'}
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleForm}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title', { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title (Amharic)</label>
            <input
              {...register('title_am', { required: "Amharic title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="በአማርኛ ያስገቡ"
            />
            {errors.title_am && <p className="text-red-500 text-xs">{errors.title_am.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: "Description is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="4"
              placeholder="Enter description"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description (Amharic)</label>
            <textarea
              {...register('description_am', { required: "Amharic description is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="4"
              placeholder="መግለጫውን በአማርኛ ያስገቡ"
            />
            {errors.description_am && <p className="text-red-500 text-xs">{errors.description_am.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('group_name', { required: "Type is required" })}
                  value="Video"
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Video</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('group_name')}
                  value="Gallery"
                  className="form-radio text-purple-600"
                />
                <span className="ml-2">Gallery</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      {...register('img', { required: !initialValues.id })}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleForm}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
          >
            {initialValues.id ? 'Update' : 'Submit'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}