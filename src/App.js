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
import Footer from './components/Common/Footer';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { accessToken } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // return (
  //   <div className="flex flex-col h-screen">
  //   <Router>
  //     <Navbar toggleSidebar={toggleSidebar} />
  //     <div className="flex flex-1">
  //       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  //       <div className="flex-1">
  //         <Routes>
  //           <Route path="/" element={<LoginPage />} />
  //           <Route path="/dashboard" element={<DashboardPage />} />
  //           <Route path="/users" element={<UserPage />} />
  //           <Route path="/weddings" element={<WeddingPage />} />
  //           <Route path="/queries" element={<QueryPage />} />
  //           <Route path="/logout" element={<Logout />} />
  //         </Routes>
  //       </div>
  //     </div>
  //     <Footer />
  //   </Router>
  // </div>
  // );
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/weddings" element={<WeddingPage />} />
              <Route path="/queries" element={<QueryPage />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

const AppWithAuthProvider = () => ( 
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
