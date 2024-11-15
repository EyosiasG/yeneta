import React, { useEffect, useState } from 'react';
import { MessagePopup } from './MessagePopup';
import useStore from '../../store/store';
import Swal from 'sweetalert2';
import DashboardTable from '../../components/DashboardTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const MessageList = () => {
  const [offset, setOffset] = useState(0);
  const [length, setLength] = useState(0);
  const limit = 10;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleNext = () => setOffset(prev => prev + limit);
  const handlePrevious = () => setOffset(prev => Math.max(0, prev - limit));

  const { setA_Message, a_Message } = useStore();

  const fetchMessage = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/Messages?offset=${offset}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === 1) {
        setA_Message(data.data);
        setLength(data.total || 0);
      } else {
        setA_Message([]);
        setLength(0);
        Swal.fire({
          icon: 'info',
          title: 'No Messages',
          text: 'No messages found',
          customClass: {
            container: 'font-sans'
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch messages',
        customClass: {
          container: 'font-sans'
        }
      });
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [offset]);

  const handleDelete = async (item) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          container: 'font-sans'
        }
      });

      if (result.isConfirmed) {
        const response = await fetch(`${import.meta.env.VITE_API}/api/Messages/${item.id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Message has been deleted.',
          customClass: {
            container: 'font-sans'
          }
        });
        
        fetchMessage();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the message',
        customClass: {
          container: 'font-sans'
        }
      });
    }
  };

  const columns = [
    {
      header: "Name",
      field: "name"
    },
    {
      header: "Email",
      field: "email"
    },
    {
      header: "Message",
      field: "message",
      render: (item) => (
        <div className="truncate max-w-[300px]">
          {item.message}
        </div>
      )
    }
  ];

  const customRowRender = (item, index) => (
    <tr key={item.id} className="group hover:bg-indigo-50/30 transition-all duration-200">
      <td className="sticky left-0 bg-white/90 group-hover:bg-indigo-50/30 backdrop-blur-xl px-6 py-5 text-gray-700 font-medium">
        {index}
      </td>
      {columns.map((column, colIndex) => (
        <td key={colIndex} className="px-6 py-5 text-gray-600">
          {column.render ? column.render(item) : item[column.field]}
        </td>
      ))}
      <td className="sticky right-0 bg-white/90 group-hover:bg-indigo-50/30 backdrop-blur-xl px-6 py-5">
        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => {
              setSelectedMessage(item);
              setShowPopup(true);
            }}
            className="p-2.5 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:scale-110"
            title="View Message"
          >
            <FontAwesomeIcon icon={faEye} className="text-lg" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="p-2.5 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} className="text-lg" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Messages</h1>
      
      <DashboardTable
        columns={columns}
        data={a_Message}
        onDelete={handleDelete}
        offset={offset}
        onPrevious={handlePrevious}
        onNext={handleNext}
        totalLength={length}
        limit={limit}
        customRowRender={customRowRender}
      />

      {showPopup && selectedMessage && (
        <MessagePopup 
          message={selectedMessage.message} 
          name={selectedMessage.name} 
          onClose={() => {
            setShowPopup(false);
            setSelectedMessage(null);
          }} 
        />
      )}
    </div>
  );
};

export default MessageList;
