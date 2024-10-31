import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../store/store';
import { useForm } from 'react-hook-form';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';

library.add(fas);

const Why = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const { setA_Why, a_Why, en } = useStore();
  const { register, handleSubmit, reset } = useForm();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/why`, { method: "GET" });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.status === 1) setA_Why(data.data);
    } catch (error) {
      console.error('Failed to fetch programs', error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/api/why/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error('Failed to delete the program', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API}/api/why/1`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('Why Yeneta updated successfully');
      setEditingProgram(null);
      toggleForm();
      fetchPrograms();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className='pt-10'>
        <h1 className='text-center text-5xl text-color1-700 display-1'>Why</h1>
        <div className='w-full flex flex-row justify-end px-4 mb-4 relative'></div>
        <div className='rounded-lg shadow-2xl shadow-color1-900/70 bg-white flex justify-center p-1 mx-5 min-h-[80vh]'>
          <div className='overflow-x-auto'>
            <div className="py-20 about">
              <div className="container mx-auto py-20">
                <div className="flex flex-wrap mx-8 justify-center items-center">
                  {a_Why.map((Why, index) => (
                    <div key={index} className="w-full lg:w-3/4 px-4 text-2xl wow fadeIn" data-wow-delay="0.3s">
                      <button onClick={() => { setEditingProgram(Why); toggleForm(true); }} className='absolute top-[10%] right-10 border border-color1 display-1 px-1 py-2 rounded-md text-white bg-color1'>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                      </button>
                      <h4 className="text-color1-600 px-2 mb-12 border-b-2 border-color1-600 text-xl inline-block py-2 rounded-l-2xl mb-20 rounded-r-md">
                        {en ? <h1 className='font-bold text-yellow-500 text-center'>Why Yeneta</h1> : <h1 className='font-bold text-yellow-500 text-center'>Why Yeneta AM</h1>}
                      </h4>
                      <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                        {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Mission</h1> : <h1 className='font-bold text-yellow-500 text-center'>Our Mission AM</h1>}
                      </h1>
                      {en ? (
                        <p className="text-dark text-[darkblue] mb-4">{Why.mission}</p>
                      ) : (
                        <p className="text-dark text-[darkblue] text-6xl mb-4">"ተልዕኮ: በየነታ ባህልና ቋንቋ ማህደር ላይ የእኛ ተልዕኮ የኢትዮጵያን ባህልና ቋንቋ ሀብት ለማስቀመጥ፣ ለማበረታታት እና ለማክበር ነው። ልጆች ህብረተሰባቸውን እንዲቀበሉ፣ ዝርዝር ባህላዊ እውቀት እንዲያገኙ፣ እና በዓለም አቀፍ ምንካራት የሚሆኑ እንዲሆኑ የሚያበረታታ ትምህርት እና የባህል ልምድ ማቅረብ እንዳብረን ነው።"</p>
                      )}
                      <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                        {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Vision</h1> : <h1 className='font-bold text-yellow-500 text-center'>Our Vision AM</h1>}
                      </h1>
                      {en ? (
                        <p className="text-dark text-[darkblue] mb-4">{Why.Vision}</p>
                      ) : (
                        <p className="text-dark text-[darkblue] mb-4">"ተመንናችን እንደ አንድ አናቀማምት ትምህርታዊ ተቋም ሆነን በአሜሪካ እና በሌሎችም ቦታዎች የኢትዮጵያ ቋንቋና ባህልን ለማብራር መሰንበር መሆን ነው። ልጆች በሁሉም በተለያዩ ቃላተኛዊ እና ባህላዊ መሰረቶች እንዲማሩ፣ እንዲያዳግሙ፣ እና እንዲያገናኙ የተለዋዋጭ ማህበረሰብ መፍጠር እንፈልጋለን።"</p>
                      )}
                      <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                        {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Goals</h1> : <h1 className='font-bold text-yellow-500 text-center'>Our Goals AM</h1>}
                      </h1>
                      {en ? (
                        <p className="text-dark text-[darkblue] mb-4">{Why.value.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}</p>
                      ) : (
                        <p className="text-dark text-[darkblue] mb-4">{Why.value_am}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={toggleForm}>X</button>
        {showForm && (
          <div className='bg-black/60' style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%', overflowY: 'auto', padding: '20px' }}>
            <button onClick={toggleForm} className='text-white text-xl mx-[95%] my-12 z-50 bg-red-600 rounded-full h-10 w-10'>X</button>
            <ProgramForm onSubmit={onSubmit} initialValues={editingProgram || {}} />
          </div>
        )}
      </div>
    </>
  );
};

export default Why;

function ProgramForm({ onSubmit, initialValues }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <div className='fixed inset-32 flex items-center justify-center p-10'>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-scroll'>
        <h1 className='text-3xl text-center font-bold text-blue-500'>Our Vision, Mission, and Values</h1>
        <form className='space-y-6 mt-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>Vision</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('Vision')} placeholder="Vision" />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Vision in Amharic</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('Vision_am')} placeholder="Vision in Amharic" />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>Mission</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('mission')} placeholder="Mission" />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Mission in Amharic</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('mission_am')} placeholder="Mission in Amharic" />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='font-semibold'>Value</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('value')} placeholder="Value" />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold'>Value in Amharic</label>
              <textarea className='form-input border border-blue-300 rounded-md p-2' rows="7" {...register('value_am')} placeholder="Value in Amharic" />
            </div>
          </div>
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
