import React, { useState } from 'react';

const ProfessionalManagement = () => {
  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: 'John Doe',
      category: 'Architect',
      subscriptionPlan: 'Premium',
      bio: 'An experienced architect specializing in sustainable designs.',
      portfolio: [
        { id: 1, name: 'Green Building Project', description: 'A project focusing on eco-friendly materials.' },
        { id: 2, name: 'Urban Planning', description: 'Redesigning city landscapes for better living.' }
      ],
      activeProjects: [
        { id: 1, name: 'Community Center', status: 'In Progress' }
      ],
      projectsBidOn: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Contractor',
      subscriptionPlan: 'Basic',
      bio: 'Contractor with over 10 years of experience in residential buildings.',
      portfolio: [
        { id: 3, name: 'Luxury Villa', description: 'Constructed a modern luxury villa.' }
      ],
      activeProjects: [
        { id: 2, name: 'Apartment Complex', status: 'In Progress' }
      ],
      projectsBidOn: 3,
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleSuspend = (professionalId) => {
    // Implement suspend logic here
    console.log(`Suspended professional with ID: ${professionalId}`);
  };

  const handleEdit = (professionalId) => {
    // Implement edit logic here
    console.log(`Editing professional with ID: ${professionalId}`);
  };

  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      professional.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubscription =
      subscriptionFilter === 'All' || professional.subscriptionPlan === subscriptionFilter;
    const matchesCategory =
      categoryFilter === 'All' || professional.category === categoryFilter;
    return matchesSearch && matchesSubscription && matchesCategory;
  });

  const subscriptionPlans = ['All', 'Basic', 'Standard', 'Premium'];
  const categories = ['All', 'Architect', 'Contractor', 'Engineer', 'Designer'];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Professional Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search professionals"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3"
        />
        <div className="flex space-x-4">
          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {subscriptionPlans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Professionals Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Professional Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Subscription Plan</th>
              <th className="px-4 py-2 text-left">Projects Bid On</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessionals.map((professional) => (
              <tr key={professional.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{professional.name}</td>
                <td className="px-4 py-2">{professional.category}</td>
                <td className="px-4 py-2">{professional.subscriptionPlan}</td>
                <td className="px-4 py-2">{professional.projectsBidOn}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProfessional(professional)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleSuspend(professional.id)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => handleEdit(professional.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile View Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedProfessional.name}'s Profile</h2>
              <button
                onClick={() => setSelectedProfessional(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            {/* Bio Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Bio</h3>
              <p>{selectedProfessional.bio}</p>
            </div>

            {/* Portfolio Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProfessional.portfolio.map((item) => (
                  <div key={item.id} className="border p-4 rounded-md">
                    <h4 className="font-bold mb-2">{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Projects Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Active Projects</h3>
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Project Name</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProfessional.activeProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-4 py-2">{project.name}</td>
                      <td className="px-4 py-2">{project.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedProfessional(null)}
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

export default ProfessionalManagement;
