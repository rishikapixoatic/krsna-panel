import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFolders } from '../../services/FolderService';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const foldersData = await getFolders();
        setFolders(foldersData);
      } catch (error) {
        console.error('Error fetching folders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Folders</h2>
      <ul>
        {folders.map(folder => (
          <li key={folder.id} className="mb-2">
            <Link to={`/folders/${folder.id}`} className="text-blue-500 hover:underline">{folder.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
