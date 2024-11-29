import React, { useState } from 'react';

const SubscriptionPlanManager = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'monthly',
      features: ['1 User', '5GB Storage', 'Basic Support'],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$29.99',
      period: 'monthly',
      features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99.99',
      period: 'monthly',
      features: ['Unlimited Users', '500GB Storage', '24/7 Support', 'Custom Solutions'],
      recommended: false
    }
  ];

  const PlanCard = ({ plan }) => (
    <div 
      className={`bg-black p-4 rounded-lg relative transition-all duration-300 hover:transform hover:scale-105 ${
        selectedPlan === plan.id ? 'border-2 border-white' : 'border border-gray-800'
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
          Recommended
        </div>
      )}
      
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold text-white">{plan.price}</span>
        <span className="text-gray-400 ml-2">/{plan.period}</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-gray-300 flex items-center">
            <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        {selectedPlan === plan.id ? (
          <button 
            className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
            onClick={() => setShowUpgradeModal(true)}
          >
            Current Plan
          </button>
        ) : (
          <button 
            className="w-full bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
            onClick={() => setShowUpgradeModal(true)}
          >
            {selectedPlan === plan.id ? 'Current Plan' : 'Switch Plan'}
          </button>
        )}
      </div>
    </div>
  );

  const Modal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-black border border-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Confirm Plan Change</h3>
        <p className="text-gray-300 mb-6">
          Are you sure you want to change your subscription plan? This will take effect on your next billing cycle.
        </p>
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
            onClick={() => {
              setSelectedPlan('pro');
              onClose();
            }}
          >
            Confirm
          </button>
          <button 
            className="flex-1 bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-400">Select the perfect plan for your needs</p>
        </div>

        {/* Renewal Notice */}
        <div className="bg-gray-900 bg-opacity-40 border border-white border-opacity-20 rounded-lg p-4 mb-8 text-white">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Your current plan will renew on <span className="font-bold">December 1, 2024</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {showUpgradeModal && (
          <Modal onClose={() => setShowUpgradeModal(false)} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlanManager;