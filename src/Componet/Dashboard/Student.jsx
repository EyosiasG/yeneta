import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import Hero1 from '../../assets/img/hero7.png'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

library.add(fas);
const Students = () => {
    const [showForm, setShowForm] = useState(false);
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
      setTriggerPay(false); // Reset the trigger
    }
  }, [triggerPay, id, name]); 
  
    const handlepay = async () => {
      try {
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
        setShowForm(!showForm);
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Students?offset=${offset}&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Student(data.data);
     setlength(data.length);
   console.log(data.data);
    } else {
      swal.fire({
        title: "Error",
        text:"Failed to load Programs.",
        icon: "error",
        confirmButtonColor: "red",
      });
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     [offset]);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Students/${id}`);
        fetchPrograms();
        swal.fire({
          title: "Success",
          text: "It have be Deleted!",
          icon: "success",
          confirmButtonColor: "teal",
        });
      } catch (error) {
        console.error('Failed to delete the program', error);
  
        swal.fire({
          title: "Error",
          text:"Failed to delete the student",
          icon: "error",
          confirmButtonColor: "red",
        });
      }
    };
  const onSubmit = async (data) => {
      // Otherwise, we're adding a new program
      await axios.post(`${import.meta.env.VITE_API}/api/Students?offset=0&limit=10`, data);
  };
  const onSubmit1 = async (data) => {
    if(editingProgram) {
      try {
        // If editingProgram is not null, we're editing an existing program
        await axios.put(`${import.meta.env.VITE_API}/api/Students/${editingProgram.id}`, data);
        swal.fire({
          title: "Success",
          text: "Student updated successfully",
          icon: "success",
          confirmButtonColor: "green",
        });
      } catch (error) {
        console.error('Failed to update the Student', error);
        swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonColor: "red",
        });
      }
    } else {
      try {
        // Otherwise, we're adding a new student
        const response = await axios.post(`${import.meta.env.VITE_API}/api/Students`, data);
          swal.fire({
            title: "Success",
            text: "Student added successfully",
            icon: "success",
            confirmButtonColor: "green",
          });
          setId(response.data.id);
          setName(data.first_name +" "+data.last_name) // Set the id using the response data
          setEmail(data.parent_email);
          console.log(response.data.id,"s111")
          console.log(email, "ss1")
          console.log(id , "s12")
          console.log(name, "s11")
          
          setTriggerPay(true); // Set the trigger to initiate payment handling in useEffect
 
        
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.email) {
          swal.fire({
            title: "Error",
            text: error.response.data.errors.email,
            icon: "error",
            confirmButtonColor: "red",
          });
        } else {
          swal.fire({
            title: "Error",
            text: "An unexpected error occurred",
            icon: "error",
            confirmButtonColor: "red",
          });
        }
        console.error('Failed to add the Student', error);
       
      }
    }
    setEditingProgram(null); // Reset editing state
    toggleForm(false); // Close the form
    fetchPrograms(); // Refresh the programs list
  };
  const fetchProgram =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/programs`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Program(data.data);
      setA_Program(data.data);
     setLenprograms(data.data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      return;
    }
  }


  return (
    <div className='pt-10'>
            
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Student DashBoard</h1>
      <div className='w-full flex flex-row justify-between px-4 mb-4'>
      <div className="mb-4">
  <label htmlFor="searchStudentId" className="block text-sm font-medium text-gray-700">Search by Student Name:</label>
  <div className="mt-1 relative rounded-md flex-row gap-4 shadow-sm">
    <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-700 rounded-md"
      placeholder="Enter Student Name"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/showbyname/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Student(data.data); // Assuming the API returns a single student object
            } else {
              setA_Student([]); // Clear the list if no student is found or in case of other statuses
            }
          } catch (error) {
            console.error('Error fetching student by ID:', error);
          }
        } else {
          fetchPrograms(); // Reset to original list if input is cleared
        }
      }}
  
  />
  <input
      type="text"
      name="searchStudentId"
      id="searchStudentId"
      className="focus:ring-indigo-500 focus:border-indigo-500 block  pl-7 h-11 w-72 pr-12 sm:text-sm border border-gray-300 rounded-md"
      placeholder="Enter Student ID"
      onChange={async (e) => {
        const studentId = e.target.value;
        if (studentId.trim() !== '') {
          try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/showbyid/${studentId}`, { 
              method: 'GET',
            });
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.status === 1) {
              setA_Student([data.data]); // Assuming the API returns a single student object
            } else {
              setA_Student([]); // Clear the list if no student is found or in case of other statuses
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
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1 text-white font-semibold h-12 bg-color1 -600  rounded-lg px-3 py-2'>Register Student</button>
     

      </div>
              <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-start p-1 mx-5 min-h-[80vh] '>
              <div className='overflow-x-auto'>
              <div className="p-5">
            <table className="min-w-full divide-y divide-color1">
                <thead className="bg-gray-50">
                    <tr>
                      
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Student ID</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date of Birth</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Parent</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Parent Email</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Mobile</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Emergency Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Emergency Number</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {a_Student.map((person , index) => (
                        <tr key={person.id}>
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{index + 1 + offset}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.first_name} {person.last_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.uuid}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.dob}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.parent_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.parent_email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.mobile_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.gender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.emergency_contact}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.emergency_contact_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-col gap-4">
                                <button onClick={() => { setEditingProgram(person); toggleForm(true); }} className='text-blue-700 px-4 py-2 border border-blue-700 hover:text-blue-900 rounded-md'>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button onClick={() => { if (window.confirm('Are you sure you want to delete this student?')) handleDelete(person.id); }} className='text-red-700 hover:text-red-900 px-6 py-2 border border-red-700 rounded-md ml-2'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-end mt-8 mx-10'>
<button onClick={handlePrevious} className='border text-teal-700  hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' disabled={offset === 0}>Previous</button>
    <button onClick={handleNext} className='border text-teal-700 hover:bg-teal-600 hover:text-white border-teal-500 px-3 py-2 mx-2 rounded-xl' 
    disabled={offset > length - 10} 
    >Next</button>
</div>
        </div>


</div>
</div>
<button onClick={toggleForm}>X</button>
  {showForm &&(  <div className='bg-black/60 ' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto',  padding: '20px' }}>
  <button onClick={toggleForm} className=' text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10 '>X</button>

  {showForm && (
        <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
      )}
        {showForm && (
        <ProgramForm onSubmit={onSubmit1} initialValues={editingProgram || {}} />
      )}
   
    </div>
    
)};
    </div>
  );
};

export default Students;
function ProgramForm({ onSubmit, initialValues }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
    mode: 'onChange', // Validation will trigger on the change event for each input
  });


  const {id,setId, name,setName ,email,setEmail, title, setTitle, enddates, setEndDates, startdates ,setStartDates , setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  // Handle selection from the dropdown
  const handleSelect = (event) => {
    const title = event.target.value;
    const item = a_Program.find(item => item.title === title);
    if (item) {
      console.log(item.title, item.end_date, item.start_date);
      setStartDates(item.start_date);
      setEndDates(item.end_date);
      setTitle(item.title);
    }
  };

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-5xl w-full overflow-y-auto'>
        <h1 className='text-3xl text-center font-bold text-blue-500'>Student Registration</h1>
        <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>First Name</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('first_name', { required: 'First name is required' })} placeholder="First Name" />
              {errors.first_name && <p className='text-red-500'>{errors.first_name.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Last Name</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('last_name', { required: 'Last name is required' })} placeholder="Last Name" />
              {errors.last_name && <p className='text-red-500'>{errors.last_name.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Email</label>
              <input type="email" className='form-input border border-blue-300 rounded-md p-2' {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Entered value does not match email format' } })} placeholder="Email" />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Date of Birth</label>
              <input type="date" className='form-input border border-blue-300 rounded-md p-2' {...register('dob', { required: 'Date of birth is required' })} />
              {errors.dob && <p className='text-red-500'>{errors.dob.message}</p>}
            </div>
          </div>

          {/* Parent Information */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>Parent Name</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('parent_name', { required: 'Parent name is required' })} placeholder="Parent Name" />
              {errors.parent_name && <p className='text-red-500'>{errors.parent_name.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Parent Email</label>
              <input type="email" className='form-input border border-blue-300 rounded-md p-2' {...register('parent_email', { required: 'Parent email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Entered value does not match email format' } })} placeholder="Parent Email" />
              {errors.parent_email && <p className='text-red-500'>{errors.parent_email.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Mobile Number</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('mobile_number', { required: 'Mobile number is required', minLength: { value: 10, message: 'Minimum length should be 10 digits' } })} placeholder="Mobile Number" />
              {errors.mobile_number && <p className='text-red-500'>{errors.mobile_number.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Gender</label>
              <select className='form-select border border-blue-300 rounded-md p-2' {...register('gender', { required: 'Please select a gender' })} defaultValue="">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
            </div>
          </div>

          {/* Additional Information */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>Course</label>
              <select
                className='form-select border border-blue-300 rounded-md p-2'
                {...register('course', { required: 'Please select a course' })}
                defaultValue=""
                onChange={handleSelect}
              >
                <option value="">Select a Course</option>
                {a_Program.map((item, index) => (
                  <option key={index} value={item.title}>{item.title}</option>
                ))}
              </select>
              {errors.course && <p className='text-red-500'>{errors.course.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Address</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('address', { required: 'Address is required' })} placeholder="Address" />
              {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Emergency Contact</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('emergency_contact', { required: 'Emergency contact is required' })} placeholder="Emergency Contact" />
              {errors.emergency_contact && <p className='text-red-500'>{errors.emergency_contact.message}</p>}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Emergency Contact Number</label>
              <input className='form-input border border-blue-300 rounded-md p-2' {...register('emergency_contact_number', { required: 'Emergency contact number is required', minLength: { value: 10, message: 'Minimum length should be 10 digits' } })} placeholder="Emergency Contact Number" />
              {errors.emergency_contact_number && <p className='text-red-500'>{errors.emergency_contact_number.message}</p>}
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
