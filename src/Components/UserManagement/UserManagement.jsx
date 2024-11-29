import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      registrationDate: '2024-03-01',
      orders: [
        { id: 1, date: '2024-03-10', amount: 199.99 },
        { id: 2, date: '2024-03-01', amount: 149.99 }
      ],
      supportTickets: [
        { id: 1, subject: 'Order not received', date: '2024-03-12', status: 'Open' },
        { id: 2, subject: 'Issue with product', date: '2024-03-15', status: 'Closed' }
      ],
      lastLogin: '2024-03-15T10:30:00',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Inactive',
      registrationDate: '2024-02-25',
      orders: [
        { id: 3, date: '2024-03-05', amount: 299.99 }
      ],
      supportTickets: [
        { id: 3, subject: 'Account issues', date: '2024-03-13', status: 'Open' }
      ],
      lastLogin: '2024-03-14T09:15:00',
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (actionType === 'Suspend') {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: 'Suspended' } : u));
    } else if (actionType === 'Delete') {
      setUsers(users.filter(u => u.id !== selectedUser.id));
    }
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.id.toString().includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const Modal = ({ user, action, onClose, onConfirm }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Confirm {action}</h3>
        <p className="mb-4">
          Are you sure you want to {action.toLowerCase()} user {user.name}? This action{' '}
          {action === 'Suspend' ? 'can be reversed' : 'cannot be reversed'}.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );

  const UserDetails = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">User Details</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Close
          </button>
        </div>
        <div className="mb-4">
          <h4 className="font-bold mb-2">Profile</h4>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Status:</strong> {user.status}</div>
            <div><strong>Registration Date:</strong> {formatDate(user.registrationDate)}</div>
            <div><strong>Last Login:</strong> {formatDate(user.lastLogin)}</div>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-bold mb-2">Order History</h4>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map(order => (
                <tr key={order.id}>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{formatDate(order.date)}</td>
                  <td className="px-4 py-2">${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-bold mb-2">Support Tickets</h4>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.supportTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="px-4 py-2">{ticket.id}</td>
                  <td className="px-4 py-2">{ticket.subject}</td>
                  <td className="px-4 py-2">{formatDate(ticket.date)}</td>
                  <td className="px-4 py-2">{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Registration Date</th>
              <th className="px-4 py-2 text-left">Orders Placed</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{formatDate(user.registrationDate)}</td>
                <td className="px-4 py-2">{user.orders.length}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                    user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedUserDetails(user)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleAction(user, 'Suspend')}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleAction(user, 'Delete')}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUserDetails && (
        <UserDetails
          user={selectedUserDetails}
          onClose={() => setSelectedUserDetails(null)}
        />
      )}

      {showModal && selectedUser && (
        <Modal
          user={selectedUser}
          action={actionType}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default UserManagement;
