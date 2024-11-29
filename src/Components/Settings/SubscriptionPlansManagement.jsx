import React from 'react';
import ProfessionalPlans from './ProfessionalPlans';
import VendorPlans from './VendorPlans';

const SubscriptionPlansManagement = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Subscription Plans Management</h2>
      <ProfessionalPlans />
      <VendorPlans />
    </section>
  );
};

export default SubscriptionPlansManagement;
