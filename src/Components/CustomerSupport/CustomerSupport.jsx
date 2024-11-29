import React, { useState } from 'react';

const CustomerSupportTools = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'Login Issue',
      description: 'Unable to access account',
      status: 'open',
      priority: 'high',
      assignee: null,
      createdAt: '2024-11-06'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      ...formData,
      status: 'open',
      assignee: null,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTickets([...tickets, newTicket]);
    setFormData({ title: '', description: '', priority: 'low' });
  };

  const handleAssign = (ticketId) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignee: 'Current User', status: 'in-progress' }
        : ticket
    ));
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus }
        : ticket
    ));
  };

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      'open': 'bg-yellow-500',
      'in-progress': 'bg-blue-500',
      'resolved': 'bg-green-500',
      'closed': 'bg-gray-500'
    };
    return statusColors[status] || 'bg-gray-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Ticket Submission Form */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl text-white font-bold mb-4">Submit New Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ticket Title"
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Ticket Description"
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <select
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Assignee</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(ticket.status)} text-white`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize">{ticket.priority}</span>
                  </td>
                  <td className="px-6 py-4">{ticket.createdAt}</td>
                  <td className="px-6 py-4">{ticket.assignee || '-'}</td>
                  <td className="px-6 py-4 space-x-2">
                    {!ticket.assignee && (
                      <button
                        onClick={() => handleAssign(ticket.id)}
                        className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors"
                      >
                        Assign
                      </button>
                    )}
                    {ticket.status !== 'resolved' && ticket.assignee && (
                      <button
                        onClick={() => handleStatusChange(ticket.id, 'resolved')}
                        className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportTools;