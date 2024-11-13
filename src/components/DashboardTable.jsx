import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const DashboardTable = ({ 
  columns, 
  data, 
  onEdit,
  offset = 0,
  onPrevious,
  onNext,
  totalLength,
  limit = 10,
  showActions = true,
  customRowRender
}) => {
  return (
    <div className='bg-white/80 backdrop-blur-lg border border-gray-200/20 rounded-3xl shadow-2xl p-8 mx-auto max-w-7xl'>
      <div className='overflow-hidden'>
        <div className="relative w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200/30">
                <th scope="col" className="px-6 py-5 font-medium text-gray-600">No</th>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="px-6 py-5 font-medium text-gray-600">
                    {column.header}
                  </th>
                ))}
                {showActions && <th scope="col" className="px-6 py-5 font-medium text-gray-600">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/30">
              {data.length > 0 ? (
                data.map((item, index) => (
                  customRowRender ? (
                    customRowRender(item, index + 1 + offset)
                  ) : (
                    <tr key={item.id || index} className="group hover:bg-gray-50/50 transition-all duration-200">
                      <td className="px-6 py-5 text-gray-600">{index + 1 + offset}</td>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-6 py-5 text-gray-700">
                          {column.render ? column.render(item) : item[column.field]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="px-6 py-5">
                          <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => onEdit(item)} 
                              className="p-2.5 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className='flex justify-between items-center mt-8 px-2'>
            <div className="text-sm text-gray-500">
              {`Showing ${offset + 1} to ${Math.min(offset + limit, totalLength)} of ${totalLength} entries`}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={onPrevious} 
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200
                  ${offset === 0 
                    ? 'text-gray-400 bg-gray-100/50 cursor-not-allowed' 
                    : 'text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'}`}
                disabled={offset === 0}
              >
                Previous
              </button>
              <button 
                onClick={onNext} 
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200
                  ${offset + limit >= totalLength
                    ? 'text-gray-400 bg-gray-100/50 cursor-not-allowed'
                    : 'text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'}`}
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