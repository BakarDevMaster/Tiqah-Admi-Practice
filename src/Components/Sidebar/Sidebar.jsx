import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  ShoppingCart,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  Package,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed sidebar state
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      route: "/",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Vendors Management",
      route: "/vendors-management",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Users Management",
      route: "/users-management",
    },
    {
      icon: <UserCog className="w-5 h-5" />,
      label: "Professional Management",
      route: "/professional-management",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Product Categories",
      route: "/product-categories",
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      label: "Orders Management",
      route: "/orders-management",
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: "Service Orders",
      route: "/service-orders",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics & Reports",
      route: "/analytics-reports",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      route: "/settings",
    },
  ];

  return (
    <div className="relative">
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white ${
          isCollapsed ? "w-20" : "w-64"
        } transform transition-transform duration-200 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo Placeholder */}
            <div className="bg-gray-700 w-8 h-8 rounded-full"></div>
            {!isCollapsed && (
              <span className="text-xl font-bold ml-3">Admin Dashboard</span>
            )}
          </div>
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-300 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="mt-6 overflow-y-auto h-[calc(100vh-13rem)] hide-scrollbar">
          <div className="px-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.route}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : ""
                } px-4 py-3 rounded-lg transition-colors mb-1 group ${
                  location.pathname === item.route
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button (Fixed at the Bottom) */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            className={`flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
