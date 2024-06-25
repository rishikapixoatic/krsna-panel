import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import WeddingPage from './pages/WeddingPage';
import QueryPage from './pages/QueryPage';
import Logout from './components/Auth/logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { accessToken } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* {!accessToken && <Navigate to="/" />} Redirect to login if not authenticated */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/weddings" element={<WeddingPage />} />
        <Route path="/queries" element={<QueryPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

const AppWithAuthProvider = () => ( 
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
