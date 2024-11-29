import React from 'react';
import AccountSettings from './AccountSettings';
import PlatformSettings from './PlatformSettings';
import SubscriptionPlansManagement from './SubscriptionPlansManagement';
import NotificationPreferences from './NotificationPreferences';

const Settings = () => {
  return (
    <div className="bg-white text-black min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <AccountSettings />
      <PlatformSettings />
      <SubscriptionPlansManagement />
      <NotificationPreferences />
    </div>
  );
};

export default Settings;
