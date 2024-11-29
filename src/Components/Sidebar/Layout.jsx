import React from 'react';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100"> {/* Background color for layout */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:ml-64"> {/* Add padding and adjust margin for responsive design */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
