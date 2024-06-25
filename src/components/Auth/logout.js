import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/AuthService';

const Logout = () => {
  const { logout } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      console.log("User logged out.");
      history.push('/');
    };
  
    handleLogout();
  }, [logout, history]);
  

  return null;
};

export default Logout;
