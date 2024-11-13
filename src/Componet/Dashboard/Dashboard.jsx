import React, { useEffect, useState } from 'react';
import useStore from '../../store/store';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const { setAdminNav } = useStore();

  const [counts, setCounts] = useState({
    messages: 0,
    partners: 0,
    partners2: 0,
    registered: 0,
    events: 0,
    programs: 0,
    staff: 0,
    payments: 0,
    unpaid: 0,
    pendingOrders: 0,
    orders: 0,
    products: 0,
    products2: 0,
    onRouteOrders: 0,
    deliveredOrders: 0,
    unverifiedPaymentStudent: 0,
    totalStudents: 0,
    enrolledStudents: 0,
    activeStudents: 0,
    female: 0,
    male: 0
  });

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Students Per Course',
      data: [],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1
    }]
  });

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{
      label: 'Number Of Students By Gender',
      data: [counts.male, counts.female],
      backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(236, 72, 153, 0.8)'],
      borderColor: ['rgba(99, 102, 241, 1)', 'rgba(236, 72, 153, 1)'],
      borderWidth: 1,
    }]
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/getAllCounts`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      if (data.status === 1) {
        const { data: apiData } = data;
        
        setCounts({
          programs: apiData.programs_count || 0,
          totalStudents: apiData.students_count || 0,
          products: apiData.products_count || 0,
          events: apiData.events_count || 0,
          messages: apiData.messages_count || 0,
          staff: apiData.staff_count || 0,
          registered: apiData.registered_students_count.total || 0,
          unverifiedPaymentStudent: apiData.registered_students_count.totalP || 0,
          male: apiData.registered_students_count.male || 0,
          female: apiData.registered_students_count.female || 0,
          enrolledStudents: apiData.registered_students_count.enrolled || 0,
          orders: apiData.orders_count.total || 0,
          unpaid: apiData.orders_count.unpaid || 0,
          pendingOrders: apiData.orders_count.Pending || 0,
          deliveredOrders: apiData.orders_count.delivered || 0,
          onRouteOrders: apiData.orders_count.Onroute || 0
        });

        setBarData({
          labels: Object.keys(apiData.enrolled_students_by_program1),
          datasets: [{
            label: 'Number of Students Per Course',
            data: Object.values(apiData.enrolled_students_by_program1),
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1
          }]
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStatCard = (count, label, icon, bgColor, onClick = null) => (
    <div 
      onClick={onClick} 
      className={`group relative overflow-hidden rounded-2xl p-6 ${bgColor} shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">{label}</h3>
          <p className="text-3xl font-bold text-white">{count || 0}</p>
        </div>
        <div className="rounded-full bg-white/10 p-3">
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Student Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Student Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderStatCard(counts.registered, 'Total Students', 'fas fa-user-graduate', 'bg-indigo-600')}
            {renderStatCard(counts.enrolledStudents, 'Active Students', 'fas fa-user-graduate', 'bg-pink-600', () => setAdminNav('VerfiyStatus'))}
            {renderStatCard(counts.products2, 'Completed', 'fas fa-user-graduate', 'bg-purple-600', () => setAdminNav('VerfiyStatus1'))}
            {renderStatCard(counts.programs, 'Classes', 'fas fa-chalkboard-teacher', 'bg-blue-600')}
          </div>
        </section>

        {/* Administrative Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Administrative Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderStatCard(counts.staff, 'Staff', 'fas fa-user-tie', 'bg-emerald-600')}
            {renderStatCard(counts.events, 'Events', 'fas fa-calendar-alt', 'bg-cyan-600')}
            {renderStatCard(counts.messages, 'Messages', 'fas fa-envelope', 'bg-teal-600')}
            {renderStatCard(counts.partners, 'Partners', 'fas fa-handshake', 'bg-green-600')}
          </div>
        </section>

        {/* Product Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Product Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderStatCard(counts.products, 'Products', 'fas fa-box', 'bg-violet-600', () => setAdminNav('Products'))}
            {renderStatCard(counts.orders, 'Total Orders', 'fas fa-cart-shopping', 'bg-fuchsia-600', () => setAdminNav('Order'))}
            {renderStatCard(counts.deliveredOrders, 'Delivered', 'fas fa-truck', 'bg-rose-600', () => setAdminNav('Delivered'))}
            {renderStatCard(counts.pendingOrders, 'Pending', 'fas fa-clock', 'bg-orange-600', () => setAdminNav('PendingOrder'))}
          </div>
        </section>

        {/* Payment Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Payment Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {renderStatCard(counts.unverifiedPaymentStudent, 'Unverified Student Payments', 'fas fa-money-check-alt', 'bg-red-600', () => setAdminNav('Verify'))}
            {renderStatCard(counts.unpaid, 'Unpaid Orders', 'fas fa-exclamation-circle', 'bg-red-700', () => setAdminNav('UnPaid'))}
          </div>
        </section>

        {/* Analytics */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-center text-lg font-semibold text-gray-800">Gender Distribution</h3>
            <Pie data={genderData} options={{ plugins: { legend: { position: 'bottom' } } }} />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-center text-lg font-semibold text-gray-800">Students per Course</h3>
            <Bar 
              data={barData} 
              options={{ 
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;