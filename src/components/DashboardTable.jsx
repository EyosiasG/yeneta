import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const DashboardTable = ({ 
  columns, 
  data, 
  onEdit,
  onDelete,
  offset = 0,
  onPrevious,
  onNext,
  totalLength,
  limit = 10,
  showActions = true,
  customRowRender
}) => {
  return (
    <div className='bg-white/90 backdrop-blur-xl border border-gray-200/30 rounded-3xl shadow-2xl p-8 mx-auto hover:shadow-indigo-500/10 transition-all duration-300'>
      <div className='overflow-x-auto'>
        <div className="relative min-w-full">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200/50">
                <th scope="col" className="sticky left-0 bg-white/90 backdrop-blur-xl px-6 py-5 font-semibold text-gray-700">No</th>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-5 font-semibold text-gray-700">
                    {column.header}
                  </th>
                ))}
                {showActions && <th scope="col" className="sticky right-0 bg-white/90 backdrop-blur-xl px-6 py-5 font-semibold text-gray-700">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {data.length > 0 ? (
                data.map((item, index) => (
                  customRowRender ? (
                    customRowRender(item, index + 1 + offset)
                  ) : (
                    <tr key={item.id || index} className="group hover:bg-indigo-50/30 transition-all duration-200">
                      <td className="sticky left-0 bg-white/90 group-hover:bg-indigo-50/30 backdrop-blur-xl px-6 py-5 text-gray-700 font-medium">{index + 1 + offset}</td>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-6 py-5 text-gray-600">
                          {column.render ? column.render(item) : item[column.field]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="sticky right-0 bg-white/90 group-hover:bg-indigo-50/30 backdrop-blur-xl px-6 py-5">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <button 
                              onClick={() => onEdit(item)} 
                              className="p-2.5 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all duration-200 hover:scale-110"
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                            </button>
                            <button
                              onClick={() => onDelete(item)}
                              className="p-2.5 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrash} className="text-lg" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 2} className="px-6 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <span className="font-medium">No data available</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className='flex justify-between items-center mt-8 px-2'>
            <div className="text-sm text-gray-600 font-medium">
              {`Showing ${offset + 1} to ${Math.min(offset + limit, totalLength)} of ${totalLength} entries`}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={onPrevious} 
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200
                  ${offset === 0 
                    ? 'text-gray-400 bg-gray-100/50 cursor-not-allowed' 
                    : 'text-indigo-600 hover:text-white hover:bg-indigo-500 active:bg-indigo-600 border border-indigo-200 hover:border-transparent'}`}
                disabled={offset === 0}
              >
                Previous
              </button>
              <button 
                onClick={onNext} 
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200
                  ${offset + limit >= totalLength
                    ? 'text-gray-400 bg-gray-100/50 cursor-not-allowed'
                    : 'text-indigo-600 hover:text-white hover:bg-indigo-500 active:bg-indigo-600 border border-indigo-200 hover:border-transparent'}`}
                disabled={offset + limit >= totalLength}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;