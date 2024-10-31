import React, { useState, useEffect } from 'react';
import { MessagePopup } from './MessagePopup';
import useStore from '../../store/store';
import Swal from 'sweetalert2';

const MessageRow = ({ companyName, email, phone, message, index, offset }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <tr className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
      <td className="p-4 font-bold">{index + 1 + offset}</td>
      <td className="p-4">{companyName}</td>
      <td className="p-4">{email}</td>
      <td className="p-4">{phone}</td>
      <td className="p-4 truncate " style={{ maxWidth: '150px' }}>{message}</td>
      <td className="p-4">
        <button onClick={() => setShowPopup(!showPopup)} className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded transition-colors duration-300">
          More
        </button>
        {showPopup && <MessagePopup message={message} name={companyName} onClose={() => setShowPopup(false)} />}
      </td>
    </tr>
  );
};

const CompanyMessageList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10; // Items per page
  const { setA_Message, a_Message } = useStore();
  const [showPopup, setShowPopup] = useState(false);
  const [noData, setNoData] = useState(false);

  const fetchMessage = async () => {
    const allRides = `${import.meta.env.VITE_API}/api/Partner?offset=${offset}&limit=10`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1 && data.data.length > 0) {
      setA_Message(data.data);
      setNoData(false);
    } else {
      setA_Message([]);
      setNoData(true);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, [offset]);

  const handleDelete = async (messageId) => {
    console.log(messageId);
    const deleteUrl = `${import.meta.env.VITE_API}/api/Partner/${messageId}`;
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

  const handleNext = () => setOffset(prev => prev + limit);
  const handlePrevious = () => setOffset(prev => Math.max(0, prev - limit));

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-10 text-color1 display-1">Partner Messages</h1>
      <div className="m-8 mx-16 max-w-8xl bg-white shadow-xl rounded-xl p-4 flex flex-col items-center">
        {noData ? (
          <p className="text-gray-500">No messages available.</p>
        ) : (
          <>
            <table className="min-w-full divide-y divide-color1">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Company Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {a_Message.map((company, index) => (
                  <MessageRow
                    key={company.id}
                    companyName={company.companyName}
                    email={company.email}
                    phone={company.phone}
                    message={company.message}
                    index={index}
                    offset={offset}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-8 w-full px-4">
              <button onClick={handlePrevious} className={`px-3 py-2 rounded-xl font-medium ${offset === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-500'}`} disabled={offset === 0}>
                Previous
              </button>
              <button onClick={handleNext} className="px-3 py-2 rounded-xl font-medium text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-500">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyMessageList;
