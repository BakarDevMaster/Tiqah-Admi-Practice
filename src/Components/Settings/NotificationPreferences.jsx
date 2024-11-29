import React, { useState } from 'react';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    subscriptionRenewalAlerts: true,
    vendorRegistrationApprovals: false,
    serviceOrderUpdates: true,
  });

  const handleToggle = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg">Subscription Renewal Alerts</label>
          <input
            type="checkbox"
            checked={preferences.subscriptionRenewalAlerts}
            onChange={() => handleToggle('subscriptionRenewalAlerts')}
            className="h-5 w-5 text-black"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-lg">Vendor Registration Approvals</label>
          <input
            type="checkbox"
            checked={preferences.vendorRegistrationApprovals}
            onChange={() => handleToggle('vendorRegistrationApprovals')}
            className="h-5 w-5 text-black"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-lg">Service Order Updates</label>
          <input
            type="checkbox"
            checked={preferences.serviceOrderUpdates}
            onChange={() => handleToggle('serviceOrderUpdates')}
            className="h-5 w-5 text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default NotificationPreferences;
