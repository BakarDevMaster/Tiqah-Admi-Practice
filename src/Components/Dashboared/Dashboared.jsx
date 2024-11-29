// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  ShoppingCart,
  DollarSign,
  Store,
  Calendar,
  Activity,
} from 'lucide-react';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Sample data
  const metrics = {
    totalVendors: 120,
    totalUsers: 2453,
    totalOrders: 156,
    revenueGenerated: {
      current: 45231,
      previous: 40200,
    },
  };

  const orderTrendsData = [
    { name: 'Week 1', orders: 40 },
    { name: 'Week 2', orders: 55 },
    { name: 'Week 3', orders: 75 },
    { name: 'Week 4', orders: 60 },
  ];

  const revenueTrendsData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New vendor approval request from "Vendor A".',
      timestamp: '2023-10-01 10:30 AM',
    },
    {
      id: 2,
      action: 'Order #12345 placed by User X.',
      timestamp: '2023-10-02 02:15 PM',
    },
    {
      id: 3,
      action: 'Vendor B updated product listings.',
      timestamp: '2023-10-03 09:45 AM',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border-gray-300 rounded-md"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Store className="text-purple-600" />}
            title="Total Vendors"
            value={metrics.totalVendors}
          />
          <MetricCard
            icon={<Users className="text-blue-600" />}
            title="Total Users"
            value={metrics.totalUsers}
          />
          <MetricCard
            icon={<ShoppingCart className="text-yellow-600" />}
            title="Total Orders"
            value={metrics.totalOrders}
          />
          <RevenueCard revenue={metrics.revenueGenerated} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Order Trends Line Chart */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Trends Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#4A90E2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trends Bar Chart */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue Trends ({dateRange})
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-6 w-6 text-gray-500 mr-2" />
            Recent Activity
          </h2>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
                <div>
                  {/* Quick-action links */}
                  <button className="text-blue-600 hover:underline">View</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-md shadow-md p-6 flex items-center space-x-4">
    <div className="p-4 bg-gray-200 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const RevenueCard = ({ revenue }) => {
  const percentageChange = (
    ((revenue.current - revenue.previous) / revenue.previous) *
    100
  ).toFixed(2);

  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white rounded-md shadow-md p-6 flex items-center space-x-4">
      <div className="p-4 bg-gray-200 rounded-full">
        <DollarSign className="text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">Revenue Generated</p>
        <p className="text-2xl font-bold text-gray-900">${revenue.current.toLocaleString()}</p>
        <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(percentageChange)}% from previous period
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
