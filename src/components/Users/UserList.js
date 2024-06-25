import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">
            <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
