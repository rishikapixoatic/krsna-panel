import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserPage from './pages/UserPage';
import WeddingPage from './pages/WeddingPage';
import QueryPage from './pages/QueryPage';
import Logout from './components/Auth/logout';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Common/Layout';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Layout Component={LoginPage} />} />
        {/* <Route path="/"  element={<LoginPage/>} /> */}
        <Route path="/dashboard" element={<Layout Component={DashboardPage} />} />
        <Route path="/users" element={<Layout Component={UserPage} />} />
        <Route path="/weddings" element={<Layout Component={WeddingPage} />} />
        <Route path="/queries" element={<Layout Component={QueryPage} />} />
        <Route path="/logout" element={<Layout Component={Logout} />} />
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
