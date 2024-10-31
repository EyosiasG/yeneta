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
import { toast } from 'react-toastify';
library.add(fas);
const Students = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
  const [programs, setPrograms] = useState({});
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Ceo, en,setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Student, setA_Blog, setA_Event , setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,a_Student,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();

  const { register, handleSubmit, formState: { errors } } = useForm();



 
  const fetchPrograms =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Students`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Student(data.data);
   console.log(data.data);
    } else {
      return;
    }
  }
  useEffect(() => {
  
 
    fetchPrograms();},
     []);

     const handleDelete = async (id) => {
      try {
        await axios.delete(`${import.meta.env.VITE_API}/api/Students/${id}`);
        fetchPrograms();
        toast.success('Register deleted successfully');
      } catch (error) {
        console.error('Failed to delete the program', error);
        toast.error(error.response.data.message);
      }
    };
  const onSubmit = async (data) => {
    if(editingProgram) {
      // If editingProgram is not null, we're editing an existing program
      await axios.put(`${import.meta.env.VITE_API}/api/Students/${editingProgram.id}`, data);
    } else {
      // Otherwise, we're adding a new program
      await axios.post(`${import.meta.env.VITE_API}/api/Students`, data);
    }
    setEditingProgram(null); // Reset editing state
    toggleForm(false); // Close the form
    fetchPrograms(); // Refresh the programs list
  };

  return (
    <div className='pt-10'>
            <h1 className='text-center text-5xl text-color1 -700 display-1'>Staff</h1>
      <div className='w-full flex flex-row justify-end px-4 mb-4'>
      <button onClick={() => { setEditingProgram(null); toggleForm(!showForm); }}className=' display-1 text-white font-semibold bg-color1 -600  rounded-lg px-3 py-2'>Add New Staff</button>
     

      </div>
              <div className='rounded-lg shadow-2xl shadow-color1 -900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh] '>
              <div className='overflow-x-auto'>
              <table className="min-w-[90%] divide-y divide-gray-200">
  <thead className="py-2">
    <tr className='mt-8'>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">First Name</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Last Name</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Email</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Date of Birth</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Parent Name</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Parent Email</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Mobile Number</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Fixed Number</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Course</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Address</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Emergency Contact</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Emergency Number</th>
      <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-bold display-1 text-color1 -500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {/* Example of mapping through an array of person objects */}
    {a_Student.map((person) => (
      <tr key={person.id}>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.first_name}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.last_name}</td>
        <td className="px-2 sm:px-6 py-4">{person.email}</td>
        <td className="px-2 sm:px-6 py-4">{person.dob}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.parent_name}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.parent_email}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.mobile_number}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.fixed_number}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.course}</td>
        <td className="px-2 sm:px-6 py-4">{person.address}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.emergency_contact}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">{person.emergency_contact_number}</td>
        <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex flex-col text-right text-sm font-medium divide-x  gap-2 divide-gray-200 ">
        <button onClick={() => { setEditingProgram(person); toggleForm(true); }}> <div className='border border-color1 -700 px-1 py-2 rounded-md  text-color1 -700'><FontAwesomeIcon icon={faPenToSquare} /></div> 
</button>
          <button onClick={() => handleDelete(person.id)} ><div className='border border-color1 -700 px-1 rounded-md py-2 text-color1 -700'><FontAwesomeIcon icon="fa-solid fa-trash" /></div> </button>
        
        </td>
      </tr>
    ))}
  </tbody>
</table>


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

export default Students;
function ProgramForm({ onSubmit, initialValues }) {

  const { register, handleSubmit, reset } = useForm({
    
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues); // Reset form with initialValues when they change
  }, [initialValues, reset]);

  return (
    <div className='rounded-md bg-white shadow-lg' style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', overflowY: 'auto', padding: '20px' }}>

<div>
 <h1 className='text-color1 -700 display-1  text-center sm:text-2xl  lg:text-5xl'> Students</h1>
</div>
   
<form className='flex flex-wrap gap-1 pt-10 items-center' onSubmit={handleSubmit(onSubmit)}>
  <div className='w-full flex flex-wrap flex-row gap-2 sm:text-xs'>
    <div className='flex flex-col gap-1 xs:w-full flex-grow flex-shrink-0 w-32'>
      <label>First Name</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('first_name')} placeholder="First Name" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Last Name</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('last_name')} placeholder="Last Name" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Email</label>
      <input type="email" className='border border-color1 -600  rounded-md p-2' {...register('email')} placeholder="Email" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Date of Birth</label>
      <input type="date" className='border border-color1 -600  rounded-md p-2' {...register('dob')} />
    </div>
  </div>

  <div className='w-full flex flex-wrap flex-row gap-2'>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Parent Name</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('parent_name')} placeholder="Parent Name" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Parent Email</label>
      <input type="email" className='border border-color1 -600  rounded-md p-2' {...register('parent_email')} placeholder="Parent Email" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Mobile Number</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('mobile_number')} placeholder="Mobile Number" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Fixed Number</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('fixed_number')} placeholder="Fixed Number" />
    </div>
  </div>

  <div className='w-full flex flex-wrap flex-row gap-2'>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Course</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('course')} placeholder="Course" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Address</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('address')} placeholder="Address" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Emergency Contact</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('emergency_contact')} placeholder="Emergency Contact" />
    </div>
    <div className='flex flex-col gap-1 flex-grow flex-shrink-0 w-32'>
      <label>Emergency Contact Number</label>
      <input className='border border-color1 -600  rounded-md p-2' {...register('emergency_contact_number')} placeholder="Emergency Contact Number" />
    </div>
  </div>

  <div className='w-full flex justify-center'>
    <button type="submit" className='bg-color1 -700 hover:bg-color1 -500 w-full mx-20 py-3 text-white px-4 rounded-md'>Submit</button>
  </div>
</form>



    </div>
  );
}