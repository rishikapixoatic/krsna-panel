import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const { accessToken, logout } = useAuth();

  useEffect(() => {
  }, [accessToken]);

  return (
    <nav className="bg-gray-800 p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex item-center">
              <button onClick={toggleSidebar} className="text-white">
                <HiMenu className="h-6 w-6" />
              </button>
              <Link to="/dashboard" className={`hidden lg:block text-white ml-4 ${accessToken ? '' : 'pointer-events-none opacity-50'}`}>
                Krsna
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {accessToken ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
