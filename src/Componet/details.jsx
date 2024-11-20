import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import dat from '../assets/img/fot.webp';
import useStore from "../store/store";
import Swal from 'sweetalert2';

const ProgramModal = () => {
  const location = useLocation();
  const { items } = location.state || {};
  const { en } = useStore();
  const [data, setData] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!items?.id) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/Schedule/${items.id}`);
        if (!response.ok) throw new Error("Failed to fetch schedule");
        
        const result = await response.json();
        if (result.status === 1) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        Swal.fire('Error', 'Failed to load class schedule', 'error');
      }
    };

    fetchSchedule();
  }, [items]);

  if (!items) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#d4aa3b]"></div>
      </div>
    );
  }

  const handleTimeSelection = (item) => {
    const timeString = item.nosit < 1 
      ? `Time:${item.startTime}-${item.endTime} Lvl:${item.level} Day:${item.Day} (waitlist)`
      : `Time:${item.startTime}-${item.endTime} Lvl:${item.level} Day:${item.Day}`;
    
    setSelectedTime(timeString);
    setSelectedId(item.id);
  };

  const handleEnrollClick = (e) => {
    if (!selectedTime) {
      e.preventDefault();
      Swal.fire({
        title: 'Schedule Required',
        text: 'Please select a class schedule before enrolling.',
        icon: 'warning',
        confirmButtonColor: '#d4aa3b'
      });
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white/90 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
        <div className="relative p-8">
          <Link to="/" className="absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <svg className="w-6 h-6 text-[#d4aa3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative group">
              <img 
                src={`${import.meta.env.VITE_IMG_URL}/${items.img_url}`} 
                alt={items.title}
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#d4aa3b]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-[#d4aa3b] mb-4">
                  {en ? items.title : items.title_am}
                </h1>
                <div className="text-3xl font-bold text-[#d4aa3b]">
                  ${items.price}
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  {en ? items.description : items.description_am}
                </p>
              </div>

              <div className="bg-white/80 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center text-[#d4aa3b] mb-8">
                  Class Schedule
                </h2>

                {[...new Set(data.map(item => item.level))].sort().map((level, index) => (
                  <details 
                    key={level} 
                    className="mb-6 rounded-lg bg-white shadow-md" 
                    open={index === 0}
                  >
                    <summary className="cursor-pointer p-4 bg-gradient-to-r from-[#d4aa3b]/10 to-[#d4aa3b]/20 rounded-lg font-semibold text-[#d4aa3b]">
                      Level {level}
                    </summary>

                    <div className="p-4 overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[#d4aa3b]/10">
                            <th className="p-3 text-left">Day</th>
                            <th className="p-3 text-left">Time (EST)</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data
                            .filter(item => item.level === level)
                            .sort((a, b) => {
                              const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                              return days.indexOf(a.Day) - days.indexOf(b.Day);
                            })
                            .map(item => (
                              <tr key={item.id} className="border-b hover:bg-[#d4aa3b]/5 transition-colors">
                                <td className="p-3">{item.Day}</td>
                                <td className="p-3">{item.startTime} - {item.endTime}</td>
                                <td className="p-3">
                                  <span className={`px-3 py-1 rounded-full text-sm ${
                                    item.nosit < 1 
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {item.nosit < 1 ? 'Waitlist' : 'Available'}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <label className="inline-flex items-center space-x-2">
                                    <input 
                                      type="radio" 
                                      name="classTime"
                                      className="form-radio text-[#d4aa3b]"
                                      onChange={() => handleTimeSelection(item)}
                                    />
                                    <span>Select</span>
                                  </label>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                ))}
              </div>

              <div className="flex justify-center pt-6">
                <Link
                  to="/add"
                  state={{
                    id: items.id,
                    title: items.title,
                    startDate: items.start_date,
                    endDate: items.end_date,
                    price: items.price,
                    email: items.title_am,
                    time: selectedTime,
                    sid: selectedId,
                    P1: items.P1,
                    P2: items.P2,
                    P3: items.P3,
                    P4: items.P4,
                    f3: items.f3,
                    f3d: items.f3d,
                    f4d: items.f4d,
                    f4: items.f4
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#d4aa3b] to-color1 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleEnrollClick}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;
