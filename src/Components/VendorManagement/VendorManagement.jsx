// VendorManagement.jsx

import React, { useState } from 'react';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Tech Solutions Inc',
      email: 'contact@techsolutions.com',
      status: 'Pending Approval',
      totalSales: 12000,
    },
    {
      id: 2,
      name: 'Global Traders',
      email: 'info@globaltraders.com',
      status: 'Active',
      totalSales: 15000,
    },
    {
      id: 3,
      name: 'Digital Dynamics',
      email: 'sales@digitaldynamics.com',
      status: 'Suspended',
      totalSales: 8000,
    },
    // Add more vendors as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isVendorDetailsOpen, setIsVendorDetailsOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const searchMatch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toString() === searchTerm;

    const statusMatch =
      statusFilter === 'All' || vendor.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setIsVendorDetailsOpen(true);
  };

  const handleEdit = (vendor) => {
    // Implement edit functionality
    console.log('Edit vendor:', vendor);
  };

  const handleSuspendReactivate = (vendorId) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId
          ? {
              ...vendor,
              status:
                vendor.status === 'Active'
                  ? 'Suspended'
                  : 'Active',
            }
          : vendor
      )
    );
  };

  const handleApprove = (vendorId) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: 'Active' } : vendor
      )
    );
  };

  const handleDelete = (vendorId) => {
    setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition duration-300">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Vendors Management</h1>
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{vendor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{vendor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        vendor.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : vendor.status === 'Pending Approval'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${vendor.totalSales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(vendor)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    {vendor.status === 'Active' ||
                    vendor.status === 'Suspended' ? (
                      <button
                        onClick={() => handleSuspendReactivate(vendor.id)}
                        className={`px-3 py-1 ${
                          vendor.status === 'Active'
                            ? 'bg-red-500 hover:bg-red-700'
                            : 'bg-green-500 hover:bg-green-700'
                        } text-white text-sm rounded`}
                      >
                        {vendor.status === 'Active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(vendor.id)}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Details Modal */}
      <Modal
        isOpen={isVendorDetailsOpen}
        onClose={() => setIsVendorDetailsOpen(false)}
        title="Vendor Details"
      >
        {selectedVendor && (
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Name:</strong> {selectedVendor.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {selectedVendor.email}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {selectedVendor.status}
            </p>
            <p className="text-gray-600">
              <strong>Total Sales:</strong> $
              {selectedVendor.totalSales.toLocaleString()}
            </p>
            {/* Subscription Plan and Performance Metrics */}
            <p className="text-gray-600">
              <strong>Subscription Plan:</strong> Premium
            </p>
            <p className="text-gray-600">
              <strong>Performance Metrics:</strong> 95% positive feedback
            </p>
            {/* Quick Actions */}
            <div className="flex space-x-2 mt-4">
              {selectedVendor.status === 'Pending Approval' && (
                <button
                  onClick={() => {
                    handleApprove(selectedVendor.id);
                    setIsVendorDetailsOpen(false);
                  }}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-700"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => {
                  handleSuspendReactivate(selectedVendor.id);
                  setIsVendorDetailsOpen(false);
                }}
                className={`px-3 py-1 ${
                  selectedVendor.status === 'Active'
                    ? 'bg-red-500 hover:bg-red-700'
                    : 'bg-green-500 hover:bg-green-700'
                } text-white text-sm rounded`}
              >
                {selectedVendor.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedVendor.id);
                  setIsVendorDetailsOpen(false);
                }}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorManagement;
