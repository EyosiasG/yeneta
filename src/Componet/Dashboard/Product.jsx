import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';

library.add(fas);

const Product = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offset, setOffset] = useState(0);
  const [length, setlength] = useState("");
  const limit = 10;
  const [editingProgram, setEditingProgram] = useState(null);
  const setProduct = useStore((state) => state.setProduct);
  const product = useStore((state) => state.product);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(!showDetails);
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/Product?offset=${offset}&limit=${limit}`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      if (data.status === 1) {
        setProduct(data.data);
        setlength(data.length);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch products'
      });
    }
  };

  useEffect(() => {
    fetchPrograms();
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
        await axios.delete(`${import.meta.env.VITE_API}/api/Product/${id}`);
        fetchPrograms();
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the product'
      });
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'img' && value?.[0]) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }

    if (editingProgram) {
      formData.append("_method", "PUT");
    }

    try {
      const url = editingProgram 
        ? `${import.meta.env.VITE_API}/api/Product/${editingProgram.id}`
        : `${import.meta.env.VITE_API}/api/Product`;

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Product ${editingProgram ? 'updated' : 'added'} successfully`
      });

      setEditingProgram(null);
      toggleForm();
      fetchPrograms();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className=" mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Products Management</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={async (e) => {
                const searchTerm = e.target.value;
                if (searchTerm.trim()) {
                  try {
                    const response = await fetch(`${import.meta.env.VITE_API}/api/Product/${searchTerm}`);
                    const data = await response.json();
                    if (data.status === 1) setProduct(data.data);
                    else setProduct([]);
                  } catch (error) {
                    console.error('Search error:', error);
                  }
                } else {
                  fetchPrograms();
                }
              }}
            />
          </div>

          <button
            onClick={() => { setEditingProgram(null); toggleForm(); }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + offset + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs truncate">{item.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                    <td className="px-6 py-4">
                      <img 
                        src={`${import.meta.env.VITE_IMG_URL}/${item.image}`}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-lg cursor-pointer"
                        onClick={() => toggleDetails(item)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <video controls className="h-16 w-24 object-cover rounded-lg">
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => toggleDetails(item)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FontAwesomeIcon icon="eye" />
                        </button>
                        <button 
                          onClick={() => { setEditingProgram(item); toggleForm(); }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className={`px-4 py-2 rounded-lg ${offset === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset >= length - limit}
              className={`px-4 py-2 rounded-lg ${offset >= length - limit
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProgram ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={toggleForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon="times" className="text-xl" />
                </button>
              </div>
              <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
            </div>
          </div>
        </div>
      )}

      {showDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon="times" className="text-xl" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={`${import.meta.env.VITE_IMG_URL}/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Name</h3>
                    <p className="text-gray-600">{selectedProduct.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Price</h3>
                    <p className="text-gray-600">${selectedProduct.price}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Video</h3>
                    <video controls className="w-full rounded-lg shadow-lg">
                      <source src={selectedProduct.video} type="video/mp4" />
                    </video>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Stripe Link</h3>
                    <a 
                      href={selectedProduct.P1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedProduct.P1}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgramForm = ({ onSubmit, initialValues }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Video URL</label>
          <input
            {...register('video', { required: 'Video URL is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/video.mp4"
          />
          {errors.video && (
            <p className="mt-1 text-sm text-red-600">{errors.video.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stripe Link</label>
          <input
            {...register('P1', { required: 'Stripe link is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Stripe payment link"
          />
          {errors.P1 && (
            <p className="mt-1 text-sm text-red-600">{errors.P1.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
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
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues.id ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default Product;