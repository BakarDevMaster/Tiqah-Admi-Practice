import React, { useState } from 'react';

// Mock data for service requests
const initialRequests = [
  {
    id: 1,
    user: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '123-456-7890',
    },
    type: 'Sand Truck',
    description: 'Need sand for construction at site A',
    status: 'Pending',
    scheduledTime: '2024-11-10 09:00 AM',
    adminNotes: 'High priority client',
  },
  {
    id: 2,
    user: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '987-654-3210',
    },
    type: 'Water Tank',
    description: 'Water supply for landscaping project',
    status: 'Scheduled',
    scheduledTime: '2024-11-11 02:00 PM',
    adminNotes: '',
  },
  {
    id: 3,
    user: {
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      phone: '555-555-5555',
    },
    type: 'Sand Truck',
    description: 'Additional sand required for site B',
    status: 'Completed',
    scheduledTime: '2024-11-08 10:00 AM',
    adminNotes: 'Repeat customer',
  },
];

const ServiceManagement = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState(initialRequests);
  const [serviceTypeFilter, setServiceTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const serviceTypes = ['All', 'Sand Truck', 'Water Tank'];
  const statusOptions = ['All', 'Pending', 'Scheduled', 'Completed'];

  // Handle filters
  const filterRequests = () => {
    let filtered = requests;

    // Filter by service type
    if (serviceTypeFilter !== 'All') {
      filtered = filtered.filter(
        (request) => request.type === serviceTypeFilter
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  // Handle update status
  const handleUpdateStatus = (requestId, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
    filterRequests();
  };

  // Handle redirect (placeholder function)
  const handleRedirect = (requestId) => {
    // Implement redirect logic here
    console.log(`Redirecting request ID: ${requestId}`);
  };

  // Handle opening details modal
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  // Handle closing details modal
  const handleCloseModal = () => {
    setSelectedRequest(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Service Orders</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Service Type Filter */}
        <select
          value={serviceTypeFilter}
          onChange={(e) => {
            setServiceTypeFilter(e.target.value);
            filterRequests();
          }}
          className="px-4 py-2 border rounded-md"
        >
          {serviceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            filterRequests();
          }}
          className="px-4 py-2 border rounded-md"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Service Orders Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Service ID</th>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Service Type</th>
              <th className="px-4 py-2 text-left">Scheduled Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{request.id}</td>
                <td className="px-4 py-2">{request.user.name}</td>
                <td className="px-4 py-2">{request.type}</td>
                <td className="px-4 py-2">{request.scheduledTime}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      request.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request.id, 'Scheduled')}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleRedirect(request.id)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm"
                    >
                      Redirect
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No service orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Service Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Service Request #{selectedRequest.id}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            {/* User Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {selectedRequest.user.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedRequest.user.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedRequest.user.phone}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Service Details
              </h3>
              <p>
                <strong>Type:</strong> {selectedRequest.type}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description}
              </p>
              <p>
                <strong>Scheduled Time:</strong>{' '}
                {selectedRequest.scheduledTime}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
            </div>

            {/* Admin Notes */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Admin Notes</h3>
              <textarea
                value={selectedRequest.adminNotes}
                onChange={(e) =>
                  setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                      request.id === selectedRequest.id
                        ? { ...request, adminNotes: e.target.value }
                        : request
                    )
                  )
                }
                className="w-full h-24 p-2 border rounded-md"
                placeholder="Add notes here..."
              ></textarea>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
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

export default ServiceManagement;
