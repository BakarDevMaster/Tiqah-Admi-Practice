import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 24000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 12000 },
    { month: 'Apr', revenue: 16680 },
    { month: 'May', revenue: 11340 },
    { month: 'Jun', revenue: 14340 },
  ];

  const ordersStatusData = [
    { status: 'Pending', value: 30 },
    { status: 'Processing', value: 50 },
    { status: 'Completed', value: 200 },
    { status: 'Cancelled', value: 20 },
  ];

  const vendorPerformanceData = [
    { vendor: 'Vendor A', sales: 40000 },
    { vendor: 'Vendor B', sales: 30000 },
    { vendor: 'Vendor C', sales: 20000 },
    { vendor: 'Vendor D', sales: 27800 },
    { vendor: 'Vendor E', sales: 18900 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Handle date range change
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

  // Handle report download (Placeholder functions)
  const handleDownloadReport = (reportType, format) => {
    // Implement report generation and download logic here
    alert(`Downloading ${reportType} report as ${format}`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Analytics & Reports
          </h1>
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateRangeChange}
              className="px-4 py-2 border rounded-md"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateRangeChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Total Revenue (Line Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Total Revenue</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#000000" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders by Status (Pie Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Orders by Status</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersStatusData}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {ordersStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vendor Performance (Bar Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Vendor Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#000000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Downloadable Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <h3 className="text-lg font-medium mb-4">Downloadable Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sales Report */}
            <div className="p-4 border rounded-md flex flex-col items-center">
              <h4 className="font-bold mb-2">Sales Report</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadReport('Sales Report', 'PDF')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleDownloadReport('Sales Report', 'CSV')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  CSV
                </button>
              </div>
            </div>

            {/* Vendor Activity */}
            <div className="p-4 border rounded-md flex flex-col items-center">
              <h4 className="font-bold mb-2">Vendor Activity</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadReport('Vendor Activity', 'PDF')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleDownloadReport('Vendor Activity', 'CSV')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  CSV
                </button>
              </div>
            </div>

            {/* Customer Insights */}
            <div className="p-4 border rounded-md flex flex-col items-center">
              <h4 className="font-bold mb-2">Customer Insights</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadReport('Customer Insights', 'PDF')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleDownloadReport('Customer Insights', 'CSV')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        {/* Optional: You can include a data table if necessary */}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
