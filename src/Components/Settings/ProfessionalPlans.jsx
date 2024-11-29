import React, { useState } from 'react';

const ProfessionalPlans = () => {
  const [plans, setPlans] = useState([
    // Sample data
    {
      name: 'Pro Plan',
      features: 'Feature 1, Feature 2',
      price: '$100',
      duration: 'Monthly',
      status: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    features: '',
    price: '',
    duration: 'Monthly',
    status: true,
  });

  const handleAddPlan = (e) => {
    e.preventDefault();
    setPlans([...plans, newPlan]);
    setNewPlan({
      name: '',
      features: '',
      price: '',
      duration: 'Monthly',
      status: true,
    });
    setShowAddForm(false);
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-4">Professional Plans</h3>
      <table className="min-w-full bg-white border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Plan Name</th>
            <th className="py-2 px-4 border-b">Features Included</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Duration</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{plan.name}</td>
              <td className="py-2 px-4 border-b">{plan.features}</td>
              <td className="py-2 px-4 border-b">{plan.price}</td>
              <td className="py-2 px-4 border-b">{plan.duration}</td>
              <td className="py-2 px-4 border-b">
                {plan.status ? 'Active' : 'Inactive'}
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                {/* Add Edit/Delete functionality */}
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        Add New Plan
      </button>

      {showAddForm && (
        <form onSubmit={handleAddPlan} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Plan Name</label>
              <input
                type="text"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Features</label>
            <textarea
              value={newPlan.features}
              onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <select
                value={newPlan.duration}
                onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={newPlan.status}
                onChange={() => setNewPlan({ ...newPlan, status: !newPlan.status })}
                className="h-5 w-5 text-black"
              />
              <label className="ml-2 text-sm font-medium">Active</label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Save Plan
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfessionalPlans;
