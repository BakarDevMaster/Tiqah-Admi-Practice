import React, { useState } from 'react';

const PlatformSettings = () => {
  const [gateways, setGateways] = useState([
    { name: 'KNET', status: true },
    { name: 'My Fatoorah', status: false },
  ]);

  const [commission, setCommission] = useState({
    defaultPercentage: 10,
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    subscriptionRenewals: false,
  });

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Platform Settings</h2>

      {/* Payment Gateway Setup */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Payment Gateway Setup</h3>
        <div className="space-y-4">
          {gateways.map((gateway, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-lg">{gateway.name}</span>
              <input
                type="checkbox"
                checked={gateway.status}
                onChange={() => {
                  const updatedGateways = [...gateways];
                  updatedGateways[index].status = !updatedGateways[index].status;
                  setGateways(updatedGateways);
                }}
                className="h-5 w-5 text-black"
              />
            </div>
          ))}
          {/* Add functionality for Add/Edit/Delete gateways */}
        </div>
      </div>

      {/* Commission Settings */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">Commission Settings</h3>
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">
            Default Commission Percentage
          </label>
          <input
            type="number"
            value={commission.defaultPercentage}
            onChange={(e) =>
              setCommission({ ...commission, defaultPercentage: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Add functionality for individual vendor/category adjustments */}
      </div>

      {/* Notification Preferences */}
      <div>
        <h3 className="text-xl font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg">Low Stock Alerts</label>
            <input
              type="checkbox"
              checked={notifications.lowStock}
              onChange={() =>
                setNotifications({ ...notifications, lowStock: !notifications.lowStock })
              }
              className="h-5 w-5 text-black"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-lg">Subscription Renewals</label>
            <input
              type="checkbox"
              checked={notifications.subscriptionRenewals}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  subscriptionRenewals: !notifications.subscriptionRenewals,
                })
              }
              className="h-5 w-5 text-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSettings;
