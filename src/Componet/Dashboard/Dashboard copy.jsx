import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import useStore from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faUsers, 
  faUserCheck, 
  faChalkboardTeacher,
  faCalendarAlt,
  faBook,
  faEnvelope,
  faHandshake
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Galler, setA_Partner, setA_Message, setA_Testimonials, a_Why, a_Message, a_Partner, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  
  const [length, setLength] = useState(""); 
  const [lenpan, setLenpan] = useState(""); 
  const [lenpan1, setLenpan1] = useState("");
  const [lenreg, setLenreg] = useState("");
  const [lenevent, setLenevent] = useState(""); 
  const [lenprogram, setLenprograms] = useState(""); 
  const [lenstaff, setLenstaff] = useState(""); 
  const [lenpay, setLenpay] = useState(""); 
  const [lenunpay, setLenunpay] = useState("");
  const [lenpendOrd, setLenpendOrd] = useState(""); 
  const [lenOrd, setLenOrd] = useState(""); 
  const [lenprod, setLenprod] = useState(""); 
  const [lenprod1, setLenprod1] = useState(""); 
  const [lenonord, setLenOnOrd] = useState(""); 
  const [lendelord, setLenDelOrd] = useState("");
  const [lenunord,  setLenUnOrd] = useState(""); 
  const [le1,  setLe1] = useState(""); 
  const [le2,  setLe2] = useState(""); 
  const [lenactive,  setlenActive] = useState(); 
  const [fem,  setFem] = useState(""); 
  const [mal,  setMal] = useState(""); 


  const { setAdminNav , AdminNav,actStu, setActStu } = useStore();
 
 const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{
      label: 'Number Of Students By Gender',
      data: [mal, fem],
      backgroundColor: [ 'rgba(54, 162, 235, 0.9)','rgba(255, 99, 132, 0.9)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)',' rgba(255, 99, 132, 1)',  'rgba(255, 206, 86, 1)'],
      borderWidth: 2,
    }]
  };

 // Data for the bar chart
  const classData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
    datasets: [{
      label: '# of Students',
      data: [40, 50, 30, 35],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Students Per Course',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  });
  const [fem1, setFem1] = useState("");
  useEffect(() => {
    // Simulating an API response
    const fetchStudentData = async () => {
      const apiUrl = `${import.meta.env.VITE_API}/api/Chart`;
  
      try {
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === 1) {
          setFem1(data);
          console.log("sadamessage1222", data.data);
          const labels = Object.keys(data["Students in course"]);
          const values = Object.values(data["Students in course"]);

          setBarData(prevData => ({
            ...prevData,
            labels: labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: values,
                backgroundColor: [
                  'green',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255,1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                  'green',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
              }
            ]
          }));
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudentData();
  }, []);
 
  const fetchreg =   async () => {
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
     setA_Message(data.data);
     setLenreg(data.length);
     console.log("s111ada",data.length);
   
    } else {
      return;
    }
  }
  const fetchpayment =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/PendingPayment`;

    const response = await fetch(allRides, {
     method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setLenunpay(data.data);
     setLenpay(data.length);
     console.log("s111adeioads12345678976543a",data.length);
   
    } else {
      return;
    }
  }
  const fetchMessage =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Messages`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Message(data.data);
     setLength(data.length);
     console.log("sadamessage",data.length);
   
    } else {
      return;
    }
  }
  const fetchStudent1 =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/NumReg`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
    console.log( "wawaw",data);
    
     console.log("sadamessage1",data.length);
   
    } else {
      return;
    }
  }
 
  const fetchPartner =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Partner`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Partner(data.data);
     setLenpan(data.length);   
    } else {
      return;
    }
  }
  const fetchEvent =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Events`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Event(data.data);
     setLenevent(data.length);   
    } else {
      return;
    }
  }
  const fetchstaff =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Staff`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Staff(data.data);
     setLenstaff(data.length);
     console.log( "saa",data.length);
   
    } else {
      return;
    }
  }
  const fetchProgram =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/programs`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Program(data.data);
      setA_Program(data.data);
     setLenprograms(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      return;
    }
  }
  const fetchDeliveredOrder
   =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/OrderStatus?offset=0&limit=10&deliveryStatus=Delivered`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenDelOrd(data.length);
     console.log( "Deliverd",data.length);
   
    } else {
      setLenDelOrd(data.length);s
      return;
    }
  }
  const fetchOrder
   =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Order`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenOrd(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      setLenOrd(data.length);
      return;
    }
  }
  const fetchOnRouteOrder
   =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/OrderStatus?offset=0&limit=10&deliveryStatus=OnRoute`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenOnOrd(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      setLenOnOrd(data.length);
      return;
    }
  }
  const fetchPendingOrder = async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/OrderStatus?offset=0&limit=10&deliveryStatus=Pending`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenpendOrd(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      setLenpendOrd(data.length);
      return;
    }
  }
  const fetchProduct = async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Product`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenprod(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      setLenprod(0);
      return;
    }
  }
  const fetchProduct1 = async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/comp`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenprod1(data.length);
     console.log( "sa229999a",data.length);
   
    } else {
      setLenprod(0);
      return;
    }
  }
 
  const fetchUnPaidOrder = async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/getAllCounts`;
    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
      setLenUnOrd(data.data.orders_count.unpaid);
      setLe1(data.data.registered_students_count.total);
      setLe2(data.data.registered_students_count.enrolled);
      setMal(data.data.registered_students_count.male);
      setFem(data.data.registered_students_count.female);
     console.log( "0000000000000000000000000000000000000000000",data.data);
   
    } else {
      
      return;
    }
  }
  
  useEffect(() => {
    fetchpayment();
    fetchEvent();
    fetchreg();
    fetchProduct();
    fetchProduct1();
    fetchOrder();
    fetchPendingOrder();
    fetchOnRouteOrder();
    fetchDeliveredOrder();
    fetchUnPaidOrder();
    fetchstaff();
    fetchMessage();
    fetchProgram();
    fetchPartner();
    fetchStudent1();
  },
     []);
     const data = {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Number of Students',
          data: [lenpay, length], // Example data
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          
        }
      ],
    };
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Student Gender Distribution',
        },
      },
    };
    
    function GenderChart() {
      return <Bar data={data} options={options} />;
    }

  // Enhanced Stats Card Component with Hover Effects
  const StatsCard = ({ title, value, icon, gradient, onClick, trend }) => (
    <div 
      onClick={onClick}
      className={`${gradient} rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer relative overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
        <div className="absolute inset-0 bg-pattern transform rotate-12"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-white/20 rounded-lg p-2">
            <FontAwesomeIcon icon={icon} className="text-2xl" />
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${trend.type === 'increase' ? 'text-green-300' : 'text-red-300'}`}>
              <FontAwesomeIcon 
                icon={trend.type === 'increase' ? 'arrow-up' : 'arrow-down'} 
                className="mr-1" 
              />
              {trend.value}%
            </div>
          )}
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-1">{value || 0}</h3>
          <p className="text-white/80 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );

  // Analytics Card Component
  const AnalyticsCard = ({ title, value, subtitle, icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} bg-opacity-10 rounded-full p-3`}>
          <FontAwesomeIcon icon={icon} className={`text-xl ${color}`} />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">This week</span>
          <FontAwesomeIcon icon="chevron-down" className="text-xs" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );

  // Progress Card Component
  const ProgressCard = ({ title, current, total, color }) => {
    const percentage = (current / total) * 100;
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-gray-800 font-semibold mb-4">{title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{current} of {total}</span>
          <span className="text-sm font-medium" style={{ color }}>{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  };

  // Quick Action Card Component
  const QuickActionCard = ({ title, icon, onClick, color }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 border-gray-100 hover:border-${color}-500 group transition-all duration-300 flex items-center space-x-3`}
    >
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600 group-hover:bg-${color}-600 group-hover:text-white transition-colors`}>
        <FontAwesomeIcon icon={icon} className="text-lg" />
      </div>
      <span className="font-medium text-gray-700 group-hover:text-gray-900">{title}</span>
    </button>
  );

  // Add loading states
  const [isLoading, setIsLoading] = useState(true);

  // Add error state
  const [error, setError] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 p-6"
    >
      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <>
          {/* Your existing sections wrapped in motion.div */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Your StatsCards */}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Your AnalyticsCards */}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Your ProgressCards */}
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            {/* Your QuickActions */}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Your Charts */}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;