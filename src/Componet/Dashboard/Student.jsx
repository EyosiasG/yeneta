import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

library.add(fas);

const Students = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [offset, setOffset] = useState(0);
    const [length, setlength] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
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

    const toggleDetail = (student) => {
      setSelectedStudent(student);
      setShowDetail(!showDetail);
    };

    const [programs, setPrograms] = useState({});
    const [editingProgram, setEditingProgram] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {id,setId, name,setName ,email,setEmail, title, setTitle, enddates, setEndDates, startdates ,setStartDates , setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

    const [formData1, setFormData1] = useState({
      StudentId: id,
      Name: name, 
      Course: title,
      start_date: startdates,
      end_date: enddates,
      Semester: email,
    });

    const [triggerPay, setTriggerPay] = useState(false);

    useEffect(() => {
      if (triggerPay) {
        handlepay();
        setTriggerPay(false);
      }
    }, [triggerPay, id, name]);

    const handlepay = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/api/RegisteredStudents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            StudentId: id,
            Name: name,
            Course: title, 
            start_date: startdates,
            end_date: enddates,
            Semester: email,
            time:"1234567890"
          }),
        });

        if (response.ok) {
          setShowForm(false);
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 3000
          });
        } else {
          throw new Error('Failed to save data');
        }
      } catch (error) {
        console.error("Failed to save data", error);
        toast.error("Registration failed", {
          position: "top-right",
          autoClose: 3000
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/Students?offset=${offset}&limit=10`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.status === 1) {
          setA_Student(data.data);
          setlength(data.length);
        } else {
          toast.error("Failed to load students");
        }
      } catch (error) {
        toast.error("Error fetching students");
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchPrograms();
    }, [offset]);

    const handleDelete = async (id) => {
      try {
        const result = await swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
          await axios.delete(`${import.meta.env.VITE_API}/api/Students/${id}`);
          fetchPrograms();
          toast.success("Student deleted successfully");
        }
      } catch (error) {
        toast.error("Failed to delete student");
      }
    };

    const handleSearch = async (value) => {
      setSearchTerm(value);
      if (!value.trim()) {
        fetchPrograms();
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/api/showbyname/${value}`);
        if (!response.ok) throw new Error("Search failed");
        
        const data = await response.json();
        if (data.status === 1) {
          setA_Student(data.data);
        }
      } catch (error) {
        toast.error("Search failed");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className='pt-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-8 text-center'>
            Student Management System
          </h1>
          
          <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
            <div className='w-full md:w-1/3'>
              <div className='relative'>
                <input
                  type="text"
                  placeholder="Search students..."
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200'
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className='absolute right-3 top-2.5 text-gray-400'>
                  <FontAwesomeIcon icon="search" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => { setEditingProgram(null); toggleForm(); }}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2'
            >
              <FontAwesomeIcon icon="plus" />
              Add New Student
            </button>
          </div>

          <div className='bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 hover:shadow-2xl'>
            {isLoading ? (
              <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>No.</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Student ID</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Parent Name</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {a_Student.map((student, index) => (
                      <tr key={student.id} className='hover:bg-gray-50 transition duration-150'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{index + 1 + offset}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>{student.first_name} {student.last_name}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{student.uuid}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{student.email}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{student.parent_name}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-3'>
                            <button
                              onClick={() => toggleDetail(student)}
                              className='text-blue-600 hover:text-blue-900 transition duration-150'
                              title="View Details"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button
                              onClick={() => { setEditingProgram(student); toggleForm(); }}
                              className='text-green-600 hover:text-green-900 transition duration-150'
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              onClick={() => handleDelete(student.id)}
                              className='text-red-600 hover:text-red-900 transition duration-150'
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className='px-6 py-4 flex justify-between items-center bg-gray-50'>
              <span className='text-sm text-gray-700'>
                Showing {offset + 1} to {Math.min(offset + limit, length)} of {length} entries
              </span>
              <div className='space-x-2'>
                <button
                  onClick={handlePrevious}
                  disabled={offset === 0}
                  className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition duration-150'
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={offset + limit >= length}
                  className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition duration-150'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Detail Modal */}
        {showDetail && selectedStudent && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Student Details</h2>
                  <button 
                    onClick={() => setShowDetail(false)} 
                    className='text-gray-500 hover:text-gray-700 transition duration-150'
                  >
                    <FontAwesomeIcon icon="times" className='text-xl' />
                  </button>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-lg text-gray-900 mb-4'>Personal Information</h3>
                    <div className='space-y-3'>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Full Name:</span>
                        <span className='font-medium'>{selectedStudent.first_name} {selectedStudent.last_name}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Student ID:</span>
                        <span className='font-medium'>{selectedStudent.uuid}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Email:</span>
                        <span className='font-medium'>{selectedStudent.email}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Date of Birth:</span>
                        <span className='font-medium'>{selectedStudent.dob}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Gender:</span>
                        <span className='font-medium'>{selectedStudent.gender}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-lg text-gray-900 mb-4'>Contact Information</h3>
                    <div className='space-y-3'>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Address:</span>
                        <span className='font-medium'>{selectedStudent.address}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Mobile:</span>
                        <span className='font-medium'>{selectedStudent.mobile_number}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Parent Name:</span>
                        <span className='font-medium'>{selectedStudent.parent_name}</span>
                      </p>
                      <p className='flex justify-between'>
                        <span className='text-gray-600'>Parent Email:</span>
                        <span className='font-medium'>{selectedStudent.parent_email}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className='mt-6 bg-gray-50 p-4 rounded-lg'>
                  <h3 className='font-semibold text-lg text-gray-900 mb-4'>Emergency Contact</h3>
                  <div className='space-y-3'>
                    <p className='flex justify-between'>
                      <span className='text-gray-600'>Name:</span>
                      <span className='font-medium'>{selectedStudent.emergency_contact}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span className='text-gray-600'>Number:</span>
                      <span className='font-medium'>{selectedStudent.emergency_contact_number}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form Modal */}
        {showForm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <ProgramForm 
              onSubmit={editingProgram ? onSubmit : onSubmit1} 
              initialValues={editingProgram || {}}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
};

export default Students;