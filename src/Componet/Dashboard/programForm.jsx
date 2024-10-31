import React from 'react';
import { useForm } from 'react-hook-form';

function ProgramForm({ defaultValues, onSave }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues
  });

  const submitForm = async (data) => {
    // Call your API to save the data
    await onSave(data);
    // Optionally reset the form to initial values or clear it after save
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input {...register('title')} placeholder="Title" />
      <input {...register('title_am')} placeholder="Title AM" />
      <textarea {...register('description')} placeholder="Description" />
      <textarea {...register('description_am')} placeholder="Description AM" />
      <input type="number" {...register('price')} placeholder="Price" />
      <input {...register('teachers')} placeholder="Teachers" />
      <input {...register('teacher_am')} placeholder="Teacher AM" />
      <input {...register('Course')} placeholder="Course" />
      <input type="number" {...register('no_sit')} placeholder="Number of Seats" />
      <input {...register('time')} placeholder="Time" />
      <input {...register('img_url')} placeholder="Image URL" />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProgramForm;
