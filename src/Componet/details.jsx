import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dat from '../assets/img/fot.webp'
import useStore from "../store/store";
import Swal from 'sweetalert2';
const ProgramModal = () => {
  const location = useLocation();
  const { items ,  } = location.state || {}; // Default to an empty object if state is undefined
  const {en  } = useStore();
 
  const [program, setProgram] = useState(null);
  const [id, setid] = useState("");  
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);

console.log(items.id ,"detail id");

  useEffect(() => {
    const tam =items.id;
   console.log(tam,"tam");


    const getSchedule = async () => {

      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/Schedule/${tam}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data = await response.json();
        if (data.status === 1) {
          setData(data.data);
          console.log(data,"ss"); // Assuming the API returns the schedule data
        } else {
          setData([]); // Clear the list if no schedule is found or in case of other statuses
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    if (items && items.id) {
      getSchedule(items.id);
    }
  }, [items]);
  const data1 = [
    {
        "ClassId": 13,
        "Day": "Monday",
        "Time": "10:00 AM",
        "id": 3,
        "level": 2,
        "updated_at": "2024-05-27T11:03:26.000000Z",
        "created_at": "2024-05-27T11:03:26.000000Z"
    },
    {
      "ClassId": 13,
      "Day": "Monday",
      "Time": "11:00 AM",
      "id": 3,
      "level": 2,
      "updated_at": "2024-05-27T11:03:26.000000Z",
      "created_at": "2024-05-27T11:03:26.000000Z"
  },
    {
        "ClassId": 13,
        "Day": "Tuesday",
        "Time": "11:00 AM",
        "id": 4,
        "level": 2,
        "updated_at": "2024-05-27T11:05:14.000000Z",
        "created_at": "2024-05-27T11:05:14.000000Z"
    },
    {
        "ClassId": 13,
        "Day": "Wednesday",
        "Time": "12:00 PM",
        "id": 5,
        "level": 2,
        "updated_at": "2024-05-27T11:08:33.000000Z",
        "created_at": "2024-05-27T11:08:33.000000Z"
    },
    {
        "ClassId": 13,
        "Day": "Thursday",
        "Time": "01:00 PM",
        "id": 6,
        "level": 1,
        "updated_at": "2024-05-27T11:08:33.000000Z",
        "created_at": "2024-05-27T11:08:33.000000Z"
    },
    {
        "ClassId": 13,
        "Day": "Friday",
        "Time": "02:00 PM",
        "id": 7,
        "level": 2,
        "updated_at": "2024-05-27T11:08:33.000000Z",
        "created_at": "2024-05-27T11:08:33.000000Z"
    },
    {
        "ClassId": 13,
        "Day": "Saturday",
        "Time": "03:00 PM",
        "id": 8,
        "level": 3,
        "updated_at": "2024-05-27T11:08:33.000000Z",
        "created_at": "2024-05-27T11:08:33.000000Z"
    },
    {
        "ClassId": 13,
        "Day": "Sunday",
        "Time": "04:00 PM",
        "id": 9,
        "level": 1,
        "updated_at": "2024-05-27T11:08:33.000000Z",
        "created_at": "2024-05-27T11:08:33.000000Z"
    }
  ]

  if (!items) return <div className='h-[90vh]'>Loading...</div>;

  return (
    <div className="bg-stone-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-4 relative shadow-color1 h-fit min-h-[90vh] md:min-h-[90vh] z-10 shadow-2xl w-full max-w-[90vw] bg-cover" style={{ backgroundImage: `linear-gradient(rgba(250,250, 250, 0.6), rgba(255, 255, 255, 0.7)), url(${dat})` }}>
        <h1 className='text-center text-4xl font-bold display-1 text-secondary pb-10'>Description</h1>
        <a href='/' className="absolute top-2 right-2 text-xl font-bold">&times;</a>
        <div className='flex flex-col lg:flex-row w-full justify-around gap-8'>
          <div className='h-full '>
            <img src={`${import.meta.env.VITE_IMG_URL}/${items.img_url}`} alt="Program" className="w-full max-w-[40rem] object-contain h-full rounded-lg" />
          </div>
          <div className='bg-white/60 shadow p-1 md:p-8 w-full flex flex-col justify-around overflow-scroll min-h-[70vh]'>
            <div>
              <h2 className="text-2xl font-bold text-center mb-4 text-amber-700">{en ? items.title : items.title_am}</h2>
              <h2 className="text-xl font-bold text-center mb-4 text-red-700">${items.price}</h2>
              <p className="text-lg mt-4">{en ? items.description : items.description_am}</p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-8 w-full '>
              <div className='w-full px-1 md:px-8 py-6  rounded-lg shadow-lg  '>
                <h1 className='text-3xl font-bold text-purple-500 text-center mb-6'>Class Schedule</h1>
                {[...new Set(data.map(item => item.level))].sort((a, b) => a - b).map((level, index) => (
                  <details key={level} className='mb-8' open={index === 0} onToggle={(e) => {
                    if (e.target.open) {
                      document.querySelectorAll('details').forEach((detail) => {
                        if (detail !== e.target) {
                          detail.removeAttribute('open');
                        }
                      });
                    }
                  }}>
                    <summary className="cursor-pointer text-2xl font-bold text-indigo-600 py-2">
                      Level {level}
                    </summary>
                    <div className="overflow-x-scroll w-[screen] mt-4">
                      <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Day
                          </th>
                          <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Start Time
                          </th>
                          <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            End Time
                          </th>
                          <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Select
                          </th>
                          <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Availability
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.filter(item => item.level === level)
                             .sort((a, b) => {
                               const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                               return daysOfWeek.indexOf(a.Day) - daysOfWeek.indexOf(b.Day) || a.startTime.localeCompare(b.startTime);
                             })
                             .map((item) => (
                          <tr key={item.id}>
                            <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap">{item.Day}</div>
                            </td>
                            <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap">{item.startTime} (EST)</div>
                            </td>
                            <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="text-gray-900 whitespace-no-wrap">{item.endTime} (EST)</div>
                            </td>
                            <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="classTime" value={item.Time} onChange={() => {
                                  setTime(item.nosit < 1 ? `Time:${item.startTime}-${item.endTime}   Lvl:${item.level}    Day:${item.Day} /n(waitlist)` : `Time:${item.startTime}-${item.endTime}   Lvl:${item.level}    Day:${item.Day}`);
                                  setid(item.id);
                                }} />
                                <span>Select</span>
                              </label>
                            </td>
                            <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                              {item.nosit < 1 ? (
                                <div className="text-red-500 mt-2">No available space in this class. You can register for the waitlist.</div>
                              ) : (
                                <div className="text-green-500 mt-2">Available</div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </details>

                ))}
              </div>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <Link
                to="/add"
                state={{
                  id: items.id,
                  title: items.title,
                  startDate: items.start_date,
                  endDate: items.end_date,
                  price: items.price,
                  email: items.title_am,
                  time: time,
                  sid: id,
                  P1: items.P1,
                  P2: items.P2,
                  P3: items.P3,
                  P4: items.P4,
                  f3: items.f3,
                  f3d: items.f3d,
                  f4d: items.f4d,
                  f4: items.f4
                }}
                className="inline-block bg-secondary font-bold btn2 text-white px-8 py-2 text-2xl rounded"
                onClick={(e) => {
               
                  if (!time) {
                    e.preventDefault();
                    Swal.fire('Error', 'Please select a class Schedule before enrolling.', 'error');
                  }
                  window.scrollTo(0, 0);
                }}
              >
                Enroll
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
export  default ProgramModal;
