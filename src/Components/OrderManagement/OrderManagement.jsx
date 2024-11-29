import React, { useState } from 'react';

const OrderManagement = () => {
  // Sample data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St, City, Country',
        phone: '123-456-7890',
      },
      items: [
        { id: 1, name: 'Product A', quantity: 2, price: 99.99 },
        { id: 2, name: 'Product B', quantity: 1, price: 49.99 },
      ],
      totalAmount: 249.97,
      orderDate: '2024-11-06',
      status: 'Pending',
      paymentMethod: 'Credit Card',
      deliveryStatus: 'Processing',
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        address: '456 Elm St, City, Country',
        phone: '987-654-3210',
      },
      items: [
        { id: 3, name: 'Product C', quantity: 1, price: 199.99 },
      ],
      totalAmount: 199.99,
      orderDate: '2024-11-05',
      status: 'Completed',
      paymentMethod: 'PayPal',
      deliveryStatus: 'Delivered',
    },
    {
      id: 3,
      customer: {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        address: '789 Oak St, City, Country',
        phone: '555-555-5555',
      },
      items: [
        { id: 4, name: 'Product D', quantity: 1, price: 499.99 },
        { id: 5, name: 'Product E', quantity: 1, price: 299.99 },
      ],
      totalAmount: 799.98,
      orderDate: '2024-11-04',
      status: 'Cancelled',
      paymentMethod: 'Bank Transfer',
      deliveryStatus: 'Cancelled',
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Handle filters
  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    setFilteredOrders(filtered);
  };

  // Handle status update
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    filterOrders();
  };

  // Handle order cancellation
  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'Cancelled', deliveryStatus: 'Cancelled' } : order
    ));
    filterOrders();
  };

  const statusOptions = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            filterOrders();
          }}
          className="px-4 py-2 border rounded-md"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Date Range Picker */}
        <div className="flex space-x-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => {
              setDateRange({ ...dateRange, start: e.target.value });
              filterOrders();
            }}
            className="px-4 py-2 border rounded-md"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => {
              setDateRange({ ...dateRange, end: e.target.value });
              filterOrders();
            }}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Order Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer.name}</td>
                <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2">{order.orderDate}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetails(true);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Processing')}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Order Details #{selectedOrder.id}</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Name:</strong> {selectedOrder.customer.name}</div>
                <div><strong>Email:</strong> {selectedOrder.customer.email}</div>
                <div><strong>Phone:</strong> {selectedOrder.customer.phone}</div>
                <div><strong>Address:</strong> {selectedOrder.customer.address}</div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Order Items</h3>
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Item Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-right font-bold">Total Amount</td>
                    <td className="px-4 py-2 font-bold">${selectedOrder.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment and Delivery Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Payment and Delivery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
                <div><strong>Delivery Status:</strong> {selectedOrder.deliveryStatus}</div>
                <div><strong>Order Date:</strong> {selectedOrder.orderDate}</div>
                <div><strong>Order Status:</strong> {selectedOrder.status}</div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
