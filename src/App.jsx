import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Sidebar/Layout';
import Dashboard from './Components/Dashboared/Dashboared';
import LoginForm from './Components/Login/Login';
import VendorManagement from './Components/VendorManagement/VendorManagement';
import UserManagement from './Components/UserManagement/UserManagement';
import ProfessionalManagement from './Components/ProfessionalManagement/ProfessionalManagement';
import OrderManagement from './Components/OrderManagement/OrderManagement';
import ServiceManagement from './Components/Service Management/Service Management';
import SubscriptionPlanManager from './Components/Subscription/Subscription';
import AnalyticsDashboard from './Components/Analytics/Analytics';
import CustomerSupportTools from './Components/CustomerSupport/CustomerSupport';
import NotificationsPage from './Components/Notifications/Notifications';
import ProductCategories from './Components/ProductCategories/ProductCategories';
import Settings from './Components/Settings/Settings';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout><Dashboard/></Layout>} />
          <Route path="/home" element={<Layout><LoginForm/></Layout>} />
          <Route path="/vendors-management" element={<Layout><VendorManagement/></Layout>} />
          <Route path="/users-management" element={<Layout><UserManagement/></Layout>} />
          <Route path="/professional-management" element={<Layout><ProfessionalManagement/></Layout>} />
          <Route path="/orders-management" element={<Layout><OrderManagement/></Layout>} />
          <Route path="/service-orders" element={<Layout><ServiceManagement/></Layout>} />
          <Route path="/subscription" element={<Layout><SubscriptionPlanManager/></Layout>} />
          <Route path="/analytics-reports" element={<Layout><AnalyticsDashboard/></Layout>} />
          <Route path="/product-categories" element={<Layout><ProductCategories/></Layout>} />
          <Route path="/settings" element={<Layout><Settings/></Layout>} />
          {/* <Route path="/customer-support" element={<Layout><CustomerSupportTools/></Layout>} />
          <Route path="/notifications" element={<Layout><NotificationsPage/></Layout>} /> */}
        </Routes>
    </Router>
  );
}

export default App;
