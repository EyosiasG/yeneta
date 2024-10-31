import React, { useEffect, useState } from 'react';
import { MessagePopup } from './MessagePopup';
import useStore from '../../store/store'; 
import Swal from 'sweetalert2';

const MessageCard = ({ name, email, message ,index ,offset }) => {

  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="py-4 px-6 font-bold">{index + 1 + offset}</td>
      <td className="py-4 px-6">{name}</td>
      <td className="py-4 px-6">{email}</td>
      <td className="py-4 px-6 truncate max-w-[200px] ">{message.length > 75 ? `${message.substring(0, 72)}...` : message}</td>
      <td className="py-4 px-6">
        <button onClick={() => setShowPopup(!showPopup)} className="text-white bg-teal-500 hover:bg-teal-700 px-3 py-1 rounded transition-colors duration-200 ease-in-out">
          More
        </button>
        {showPopup && <MessagePopup message={message} name={name} onClose={() => setShowPopup(false)} />}
      </td>
    </tr>
  );
};
 
const MessageList = () => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [length, setlength] = useState("");
  const limit = 10; // Items per page
  const [showPopup, setShowPopup] = useState(false);
  const handleNext = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };
  const { setA_Message, a_Message } = useStore();
 
  const fetchMessage =   async () => {
    const allRides = `${import.meta.env.VITE_API}/api/Messages?offset=${offset}&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Network response was not ok'
      });
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Message(data.data);
     setlength(data.length || 0);
    } else {
      setA_Message([]);
      setlength(0);
      Swal.fire({
        icon: 'info',
        title: 'No data',
        text: 'No messages found'
      });
      return;
    }
  }
  useEffect(() => {
    fetchMessage();
  }, [offset]);
  const handleDelete = async (messageId) => {
    const deleteUrl = `${import.meta.env.VITE_API}/api/Messages/${messageId}`;
    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the message");
      }
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Message has been deleted.'
      });
      // Refresh the messages list after deletion
      fetchMessage();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the message'
      });
      console.error("Error deleting message:", error);
    }
  };

  return (
    <>
    <h1 className='text-4xl font-bold text-center pt-10 text-teal-800'>All Messages</h1>
    <div className="m-8 mx-12 bg-white shadow-xl rounded-2xl p-4 min-h-[100vh] flex flex-col justify-start items-center overflow-hidden">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            
          <th className="py-3 px-6">No</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Message</th>
            <th className="py-3 px-6">Actions</th>
            
          </tr>

        </thead>
        
        <tbody>
          {a_Message.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            a_Message.map((user, index) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-bold">{index + 1 + offset}</td>
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6 truncate max-w-[200px] ">{user.message}</td>
                <td className="py-4 px-6 flex flex-col gap-5">
                  <button onClick={() => setShowPopup(!showPopup)} className="text-white bg-teal-500 hover:bg-teal-700 px-3 py-1 rounded transition-colors duration-200 ease-in-out">
                    More
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-200 ease-in-out">
                    delete
                  </button>
                  {showPopup && <MessagePopup message={user.message} name={user.name} onClose={() => setShowPopup(false)} />}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='flex justify-end w-full px-8 py-4'>
        <button onClick={handlePrevious} className='text-teal-700 hover:bg-teal-600 hover:text-white border border-teal-500 px-3 py-2 rounded-xl mr-2' disabled={offset === 0}>
          Previous
        </button>
        <button onClick={handleNext} className='text-teal-700 hover:bg-teal-600 hover:text-white border border-teal-500 px-3 py-2 rounded-xl' disabled={offset > length}>
          Next
        </button>
      </div>
    </div>
  </>
  
     );
};

export default MessageList;


