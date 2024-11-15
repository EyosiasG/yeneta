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
import { IoClose, IoPerson, IoMail, IoCall, IoHome, IoCard, IoPricetag } from 'react-icons/io5';

library.add(fas);
const Order = () => {
    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const limit = 10; // Items per page

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
    const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setOrder, setA_Blog, setA_Event , setA_Staff, order, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchPrograms = async () => {
        const allRides = `${import.meta.env.VITE_API}/api/Order?offset=${offset}&limit=10`;

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
        fetchPrograms();
    }, [offset]);

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
                const response = await axios.post(`${import.meta.env.VITE_API}/api/Order/${editingProgram.id}`, formData, {
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
                    text: 'Order added successfully',
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

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-5xl font-bold text-indigo-700 text-center mb-12'>Order Management</h1>

                <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
                    <div className='flex justify-between items-center'>
                        <div className="w-1/3">
                            <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
                            <input
                                type="text"
                                name="searchStudentId"
                                id="searchStudentId"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter Order Number..."
                                onChange={async (e) => {
                                    const studentId = e.target.value;
                                    if (studentId.trim() !== '') {
                                        try {
                                            const response = await fetch(`${import.meta.env.VITE_API}/api/Search/${studentId}`);
                                            if (!response.ok) throw new Error("Failed to fetch data");
                                            const data = await response.json();
                                            if (data.status === 1) {
                                                setOrder(data.data);
                                            } else {
                                                setOrder([]);
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
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">No</th>
                                    <th className="px-6 py-4 text-left">Name</th>
                                    <th className="px-6 py-4 text-left">Contact</th>
                                    <th className="px-6 py-4 text-left">Location</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Order No</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {order.length > 0 ? (
                                    order.map((order, index) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{index + 1 + offset}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{order.first_name} {order.last_name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>{order.email}</div>
                                                <div className="text-sm text-gray-500">{order.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>{order.city}, {order.state}</div>
                                                <div className="text-sm text-gray-500">{order.zipcode}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    order.deliveryStatus === 'Unpaid' ? 'bg-red-100 text-red-800' :
                                                    order.deliveryStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.deliveryStatus === 'OnRoute' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {order.deliveryStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{order.orderNo}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button 
                                                    onClick={() => { setEditingProgram(order); toggleForm(true); }}
                                                    className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => openModal(order)}
                                                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='flex justify-end p-4 bg-gray-50 border-t'>
                        <button 
                            onClick={handlePrevious}
                            disabled={offset === 0}
                            className={`px-4 py-2 rounded-md mr-2 ${
                                offset === 0 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNext}
                            disabled={offset > length - 10}
                            className={`px-4 py-2 rounded-md ${
                                offset > length - 10
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                    <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
                        <div className='p-6'>
                            <div className='flex justify-between items-center mb-6'>
                                <h2 className='text-2xl font-bold text-gray-900'>
                                    {editingProgram ? 'Edit Order' : 'New Order'}
                                </h2>
                                <button 
                                    onClick={toggleForm}
                                    className='text-gray-400 hover:text-gray-500'
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>
                            <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
                        </div>
                    </div>
                </div>
            )}

            {modalVisible && (
                <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
            )}
        </div>
    );
};

function OrderDetailsModal({ order, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {detailRow('First Name', order.first_name, <IoPerson />)}
                            {detailRow('Last Name', order.last_name, <IoPerson />)}
                            {detailRow('Email', order.email, <IoMail />)}
                            {detailRow('Phone', order.phone, <IoCall />)}
                            {detailRow('Address 1', order.address1, <IoHome />)}
                            {detailRow('Address 2', order.address2, <IoHome />)}
                            {detailRow('City', order.city, <IoHome />)}
                            {detailRow('State', order.state, <IoHome />)}
                            {detailRow('Zip Code', order.zipcode, <IoHome />)}
                            {detailRow('Order No', order.orderNo, <IoCard />)}
                        </div>

                        {detailRow('Price', `$${order.price}`, <IoPricetag />)}
                        <OrderList items={order.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function detailRow(label, value, icon) {
    return (
        <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-500 mb-1">
                {icon}
                <span className="ml-2 font-medium">{label}</span>
            </div>
            <div className="text-gray-900">{value}</div>
        </div>
    );
}

function OrderList({ items }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-500 mb-3">
                <IoCard />
                <span className="ml-2 font-medium">Order Items</span>
            </div>
            <div className="space-y-2">
                {items.split('/').filter(Boolean).map((item, index) => (
                    <div key={index} className="bg-white p-2 rounded border border-gray-200">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProgramForm({ onSubmit, initialValues }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        {...register('first_name')}
                        disabled={initialValues.id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        {...register('last_name')}
                        disabled={initialValues.id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        disabled={initialValues.id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        {...register('phone')}
                        disabled={initialValues.id}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Phone"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status</label>
                    <select
                        {...register('deliveryStatus')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Pending">Pending</option>
                        <option value="OnRoute">OnRoute</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {initialValues.id ? 'Update Order' : 'Create Order'}
                </button>
            </div>
        </form>
    );
}

export default Order;