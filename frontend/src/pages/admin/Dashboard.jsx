import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardStats } from '../../services/adminService';
import { 
  FaHotel, FaUsers, FaBookmark, FaMoneyBillWave, 
  FaClock, FaChartLine, FaBed, FaStar, FaCheckCircle, 
  FaCalendarAlt, FaArrowUp, FaArrowDown, FaCalendarCheck,
  FaBuilding, FaPercentage
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [hotelPerformance, setHotelPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data.stats);
      setRecentBookings(res.data.recentBookings || []);
      setHotelPerformance(res.data.hotelPerformance || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Booking Trends Chart Data
  const bookingTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 78, 90, 85, 105, 120, 145, 160, 155, 170, 185, 210],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Revenue (PKR)',
        data: [450000, 520000, 680000, 720000, 850000, 980000, 1150000, 1320000, 1450000, 1580000, 1720000, 1950000],
        borderColor: 'rgb(244, 162, 97)',
        backgroundColor: 'rgba(244, 162, 97, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  // Rating Distribution Chart
  const ratingDistributionData = {
    labels: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],
    datasets: [
      {
        data: [
          stats?.ratingDistribution?.[5] || 0,
          stats?.ratingDistribution?.[4] || 0,
          stats?.ratingDistribution?.[3] || 0,
          stats?.ratingDistribution?.[2] || 0,
          stats?.ratingDistribution?.[1] || 0,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Bookings' } },
      y1: { position: 'right', title: { display: true, text: 'Revenue (PKR)' }, grid: { drawOnChartArea: false } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };

  const statCards = [
    { title: 'Total Hotels', value: stats?.totalHotels || 0, icon: <FaHotel />, color: 'bg-blue-500', change: '+12%', trend: 'up' },
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: <FaUsers />, color: 'bg-green-500', change: '+8%', trend: 'up' },
    { title: 'Total Rooms', value: stats?.totalRooms || 0, icon: <FaBed />, color: 'bg-purple-500', change: '+5%', trend: 'up' },
    { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: <FaBookmark />, color: 'bg-indigo-500', change: '+15%', trend: 'up' },
    { title: 'Total Revenue', value: `PKR ${(stats?.revenue || 0).toLocaleString()}`, icon: <FaMoneyBillWave />, color: 'bg-yellow-500', change: '+23%', trend: 'up' },
    { title: 'Pending Bookings', value: stats?.pendingBookings || 0, icon: <FaClock />, color: 'bg-orange-500', change: '-3%', trend: 'down' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <AdminLayout><div className="flex justify-center items-center h-64">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
              Export Report
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <div className={`${card.color} text-white p-2 rounded-lg`}>{card.icon}</div>
                <div className={`flex items-center gap-1 text-xs ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {card.trend === 'up' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                  {card.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-gray-500 text-sm">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Today's Check-ins/Check-outs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaCalendarCheck className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-900">{stats?.todayCheckIns || 0}</p>
                <p className="text-sm text-gray-600">Check-ins</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-900">{stats?.todayCheckOuts || 0}</p>
                <p className="text-sm text-gray-600">Check-outs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <FaPercentage className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-semibold text-gray-800">Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-900">{stats?.occupancyRate || 0}%</p>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-900">{stats?.averageStay || 0}</p>
                <p className="text-sm text-gray-600">Avg Stay (Nights)</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <p className="text-2xl font-bold text-indigo-900">{stats?.averageRating?.toFixed(1) || 0}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-900">{stats?.repeatCustomers || 0}%</p>
                <p className="text-sm text-gray-600">Repeat Customers</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-900" /> Booking & Revenue Trends
            </h3>
            <div className="h-80">
              <Line data={bookingTrendsData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Rating Distribution
            </h3>
            <div className="h-80">
              <Doughnut data={ratingDistributionData} options={doughnutOptions} />
            </div>
          </div>
        </div>
        
        {/* Hotel Performance Table */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaBuilding className="text-blue-900" /> Top Performing Hotels
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Hotel Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">City</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Stars</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total Bookings</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {hotelPerformance.map((hotel, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{hotel.name}</td>
                    <td className="px-4 py-3 text-sm">{hotel.city}</td>
                    <td className="px-4 py-3 text-sm">{'★'.repeat(hotel.stars)}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" /> {hotel.rating?.toFixed(1) || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{hotel.totalBookings || 0}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">
                      PKR {(hotel.revenue || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Bookings Table */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-900" /> Recent Bookings
            </h3>
            <Link to="/admin/bookings" className="text-blue-900 text-sm hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Booking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Guest</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Hotel</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Room</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Check In</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{booking.bookingId}</td>
                    <td className="px-4 py-3 text-sm">{booking.user?.name}</td>
                    <td className="px-4 py-3 text-sm">{booking.hotel?.name}</td>
                    <td className="px-4 py-3 text-sm">{booking.room?.name}</td>
                    <td className="px-4 py-3 text-sm">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm font-semibold">PKR {booking.totalAmount?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {booking.paymentStatus || 'unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;