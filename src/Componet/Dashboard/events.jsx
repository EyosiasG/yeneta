import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from 'react-toastify';
import swal from 'sweetalert2';
import DashboardTable from '../../components/DashboardTable';

library.add(fas);

const Events = () => {
    const [showForm, setShowForm] = useState(false);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState("");
    const limit = 10;

    const handleNext = () => setOffset(prev => prev + limit);
    const handlePrevious = () => setOffset(prev => Math.max(0, prev - limit));
    const toggleForm = () => setShowForm(!showForm);

    const [editingProgram, setEditingProgram] = useState(null);
    const { en, setA_Event, a_Event } = useStore();

    const fetchPrograms = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/Events?offset=${offset}&limit=${limit}`);
            if (!response.ok) throw new Error("Failed to fetch events");
            const data = await response.json();
            if (data.status === 1) {
                setA_Event(data.data);
                setLength(data.total);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            swal.fire({
                title: "Error",
                text: "Failed to fetch events",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, [offset]);

    const handleDelete = async (id) => {
        try {
            const result = await swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API}/api/Events/${id}`);
                fetchPrograms();
                swal.fire("Deleted!", "Event has been deleted.", "success");
            }
        } catch (error) {
            console.error('Failed to delete the event', error);
            swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Failed to delete event",
                icon: "error"
            });
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        const isEditing = !!editingProgram;

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'img' && value?.[0]) {
                formData.append(key, value[0]);
            } else if (value) {
                formData.append(key, value);
            }
        });

        if (isEditing) formData.append("_method", "PUT");

        try {
            const url = isEditing 
                ? `${import.meta.env.VITE_API}/api/Events/${editingProgram.id}`
                : `${import.meta.env.VITE_API}/api/Events`;

            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            swal.fire({
                title: "Success",
                text: `Event ${isEditing ? 'updated' : 'added'} successfully`,
                icon: "success"
            });

            setEditingProgram(null);
            toggleForm();
            fetchPrograms();
        } catch (error) {
            console.error('Error:', error);
            swal.fire({
                title: "Error",
                text: error.response?.data?.message || "An error occurred",
                icon: "error"
            });
        }
    };

    const columns = [
        {
            header: "Title",
            field: "title",
            render: (event) => en ? event.title : event.title_am
        },
        {
            header: "Description",
            field: "description",
            render: (event) => (
                <div className="truncate max-w-[200px]">{en ? event.description : event.description_am}</div>
            )
        },
        {
            header: "Location",
            field: "location",
            render: (event) => en ? event.location : event.location_am
        },
        {
            header: "Date & Time",
            field: "datetime",
            render: (event) => (
                <div className="flex flex-col">
                    <span className="font-medium">{event.date}</span>
                    <span className="text-sm text-gray-600">{event.time}</span>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <ToastContainer />
            
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">Events Management</h1>
                <p className="text-gray-600 text-center">Manage all your events in one place</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Events</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search by title..."
                            onChange={async (e) => {
                                const searchTerm = e.target.value.trim();
                                if (searchTerm) {
                                    try {
                                        const response = await fetch(`${import.meta.env.VITE_API}/api/Events/${searchTerm}`);
                                        const data = await response.json();
                                        if (data.status === 1) {
                                            setA_Event(data.data);
                                        } else {
                                            setA_Event([]);
                                        }
                                    } catch (error) {
                                        console.error('Error searching events:', error);
                                    }
                                } else {
                                    fetchPrograms();
                                }
                            }}
                        />
                    </div>

                    <button 
                        onClick={() => { setEditingProgram(null); toggleForm(true); }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon="plus" />
                        Add New Event
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <DashboardTable 
                    columns={columns}
                    data={a_Event}
                    onEdit={(event) => { setEditingProgram(event); toggleForm(true); }}
                    onDelete={handleDelete}
                    offset={offset}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    totalLength={length || a_Event.length}
                    limit={limit}
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editingProgram ? 'Edit Event' : 'Add New Event'}
                                </h2>
                                <button 
                                    onClick={toggleForm}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FontAwesomeIcon icon="times" className="text-gray-600" />
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

export default Events;

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        {...register('title', { required: "Title is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title in Amharic</label>
                    <input 
                        {...register('title_am', { required: "Title in Amharic is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter title in Amharic"
                    />
                    {errors.title_am && <p className="mt-1 text-sm text-red-600">{errors.title_am.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                        {...register('description', { required: "Description is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="4"
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description in Amharic</label>
                    <textarea 
                        {...register('description_am', { required: "Description in Amharic is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="4"
                        placeholder="Enter description in Amharic"
                    />
                    {errors.description_am && <p className="mt-1 text-sm text-red-600">{errors.description_am.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                        {...register('location', { required: "Location is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter location"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location in Amharic</label>
                    <input 
                        {...register('location_am', { required: "Location in Amharic is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter location in Amharic"
                    />
                    {errors.location_am && <p className="mt-1 text-sm text-red-600">{errors.location_am.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                        type="time"
                        {...register('time', { required: "Time is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                        type="date"
                        {...register('date', { required: "Date is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                <input 
                    type="file"
                    {...register('img', { required: !initialValues.id })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept="image/*"
                />
                {errors.img && <p className="mt-1 text-sm text-red-600">{errors.img.message}</p>}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    {initialValues.id ? 'Update Event' : 'Create Event'}
                </button>
            </div>
        </form>
    );
}