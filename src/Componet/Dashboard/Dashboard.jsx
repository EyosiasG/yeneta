import React ,{useEffect,useState}from 'react';
import Programs from './programQ';
import Events from './events';
import PaymentForm from './PaymentForm';
import useStore from '../../store/store';

import CheckoutButton from './PaymentForm';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import CalendarComponent from './CompanyMessage';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';// Register Chart.js components

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
  return (
<>


<div className='h-full w-full '>
 




<div className='flex flex-col justify-center p-8 shadow-2xl m-10 rounded-xl border '>
 
<div>
    <h1 className=' w-full py-3 text-green-800 rounded-xl px-2 text-xl font-semibold'>Student information</h1>
    <div>


  </div>
  </div>
<div className=' flex flex-row justify-start flex-wrap gap-2  '>
<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-red-700 to-red-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenreg || 0}</h1>
  <h1 className='text-4xl font-normal'>Students</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-user-graduate fa-5x "></i>
  </div>
</div>
<div onClick={() => setAdminNav('VerfiyStatus')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-red-700 to-red-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{le2 || 0}</h1>
  <h1 className='text-4xl font-normal'>Active Students</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-user-graduate fa-5x "></i>
  </div>
</div>
<div onClick={() => setAdminNav('VerfiyStatus1')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-yellow-700 to-yellow-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenprod1 || 0}</h1>
  <h1 className='text-4xl font-normal'>Students Completed</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-user-graduate fa-5x "></i>
  </div>
</div>

<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-teal-700 to-teal-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-teal-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{le1 || 0}</h1>
  <h1 className='text-3xl font-normal'>All Registered Student</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-money-check-alt fa-4x "></i>
  </div>
</div>

<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-green-700 to-green-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenprogram || 0}</h1>
  <h1 className='text-4xl font-normal'>Classes</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-chalkboard-teacher fa-5x"></i>
  </div>
</div>

</div>
<div>

<div>
    <h1 className=' w-full py-3 text-green-800 rounded-xl px-2 text-xl font-semibold'>Administrative information</h1>
    </div>
<div className=' flex flex-row justify-start flex-wrap gap-2'>


<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-yellow-500 to-yellow-400 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenstaff || 0}</h1>
  <h1 className='text-4xl font-normal'>Staff</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-user-tie fa-5x "></i>
  </div>
</div>

<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-blue-700 to-blue-500 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenevent || 0}</h1>
  <h1 className='text-4xl font-normal'>Events</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-calendar-alt fa-5x "></i>
  </div>
</div>


<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-orange-600 to-orange-400 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{length || 0}</h1>
  <h1 className='text-4xl font-normal'>Message</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-envelope fa-5x "></i>
  </div>
</div>


<div className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-green-900 to-white/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenpan || 0}</h1>
  <h1 className='text-4xl font-normal'>Partner</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-handshake fa-5x "></i>
  </div>
</div>

</div>


</div>
<div>

<div>
    <h1 className=' w-full py-3 text-green-800 rounded-xl px-2 text-xl font-semibold'>Product information</h1>
    </div>
<div className=' flex flex-row justify-start flex-wrap gap-2'>



<div onClick={() => setAdminNav('Products')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-pink-400 to-pink-400/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenprod || 0}</h1>
  <h1 className='text-4xl font-normal'>Product</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-box fa-5x "></i>
  </div>
</div>

<div onClick={() => setAdminNav('Delivered')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-green-700 to-green-400/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lendelord || 0}</h1>
  <h1 className='text-4xl font-normal'>Delivered</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-truck fa-4x "></i>
  </div>
</div>

<div onClick={() => setAdminNav('Order')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-yellow-600 to-White/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenOrd || 0}</h1>
  <h1 className='text-3xl  display-1 font-normal'> Total Order</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i class="fa-solid fa-cart-shopping fa-5x "></i>
  </div>
</div>

<div onClick={() => setAdminNav('PendingOrder')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-blue-600 to-White/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenpendOrd || 0}</h1>
  <h1 className='text-4xl font-normal'>Pending Order</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-cart-shopping fa-5x "></i>
  </div>
</div>

<div onClick={() => setAdminNav('OnRoute')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-teal-600 to-White/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenonord || 0}</h1>
  <h1 className='text-4xl font-normal'>OnRoute Order</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-cart-shopping fa-5x "></i>
  </div>
</div>
</div>


</div>
<div>

<div>
    <h1 className=' w-full py-3 text-green-800 rounded-xl px-2 text-xl font-semibold'>Payment information</h1>
    </div>
<div className=' flex flex-row'>

<div onClick={() => setAdminNav('Verify')} className='shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-orange-400 to-orange-200 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenpay || 0}</h1>
  <h1 className='text-2xl font-normal'>Students unverified payments</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-money-check-alt fa-5x "></i>
  </div>
</div>



<div onClick={() => setAdminNav('UnPaid')}  className=' shadow-lg flex flex-row gap-2 p-2 border border-gray-200 justify-between w-80 min-w-16 min-h-28 h-48 bg-gradient-to-r from-red-600 to-White/50 items-just rounded-md items-center  font-bold text-white  m-2 hover:transform hover:scale-105 hover:shadow-red-600'>
  <div className='flex flex-col text-white'> 
  <h1 className='text-5xl font-bold -mt-4 pb-4 '>{lenunord || 0}</h1>
  <h1 className='text-4xl font-normal'>Unverified Order</h1>
  </div>
  <div className='h-fit flex items-center px-4 py-2 text-black/20 '>
  <i className="fas fa-cart-shopping fa-5x "></i>
  </div>
</div>
</div>


</div>
</div>




<div className='w-[50%] pt-10' >

</div>
{/*
<div className="flex justify-around">
        <div className="w-96">
          <h2 className="text-center font-bold mb-4">Gender Distribution</h2>
          <Pie data={genderData} />
        </div>
        <div className="w-96">
          <h2 className="text-center font-bold mb-4">Number of Students in Classes</h2>
          <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
          <Bar data={classData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
     
      
</div>
*/}
      
      <div className="w-full flex flex-row">
      <div className="w-[40%] border rounded-xl shadow-2xl py-6 mx-3 px-8">
          <h2 className="text-center font-bold mb-4">Number Of Students By Gender</h2>
          <Pie data={genderData} />
        </div>
      <div className="w-[60%] border rounded-xl shadow-2xl py-6 mx-3 px-8">
          <h2 className="text-center font-bold mb-4">Number of Students in Classes</h2>
          <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
      
       </div>

       </div>

</div>

</>
  );
}

export default Dashboard;