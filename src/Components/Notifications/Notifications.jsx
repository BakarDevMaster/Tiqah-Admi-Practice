import React, { useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight at 2 AM EST",
      type: "system",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      title: "New Feature Available",
      message: "Check out our new dashboard analytics tool",
      type: "update",
      time: "5 hours ago",
      isRead: false
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Please update your password for enhanced security",
      type: "system",
      time: "1 day ago",
      isRead: true
    },
    {
      id: 4,
      title: "Welcome to the Platform",
      message: "Get started with our quick tutorial",
      type: "update",
      time: "2 days ago",
      isRead: true
    }
  ]);

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, isRead: !notification.isRead }
        : notification
    ));
  };

  const getTypeStyles = (type) => {
    return type === 'system' 
      ? 'bg-yellow-500 text-black'
      : 'bg-green-500 text-black';
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <button
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-gray-800 rounded-lg p-4 transition-all duration-200 hover:transform hover:scale-[1.01] ${
                notification.isRead ? 'opacity-75' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeStyles(notification.type)}`}>
                      {notification.type}
                    </span>
                    <span className="text-gray-400 text-sm">{notification.time}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{notification.title}</h2>
                  <p className="text-gray-300">{notification.message}</p>
                </div>
                <button
                  onClick={() => toggleReadStatus(notification.id)}
                  className="ml-4 px-3 py-1 bg-white text-black text-sm rounded-md hover:bg-gray-200 transition-colors"
                >
                  {notification.isRead ? 'Mark unread' : 'Mark read'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;