import { Link } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import applogo  from '../../assests/applogo.png';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
  }, [user]);

  return (
    <div className={`bg-gray-800 text-white h-full w-56 top-0 left-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="p-4 flex justify-center bg-white items-center h-20">
        <h1 className="text-xl text-black font-semibold">Krsna</h1>
      </div>
      <nav className="px-5">
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className={`block py-2 px-4 hover:bg-gray-700`}>Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/weddings" className={`block py-2 px-4 hover:bg-gray-700`}>Weddings</Link>
          </li>
          <li className="mb-2">
            <Link to="/users" className={`block py-2 px-4 hover:bg-gray-700`}>Users</Link>
          </li>
          <li className="mb-2">
            <Link to="/queries" className={`block py-2 px-4 hover:bg-gray-700`}>Queries</Link>
          </li>
          {user && (
            <li className="mb-2">
              <button onClick={logout} className="block py-2 px-4 hover:bg-gray-700">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
