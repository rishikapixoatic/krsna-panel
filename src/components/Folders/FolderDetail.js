import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFolder } from '../../services/FolderService';
import FolderForm from './FolderForm';
import ImageUpload from './ImageUpload';

const FolderDetail = () => {
  const { folderId } = useParams();
  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const folderData = await getFolder(folderId);
        setFolder(folderData);
      } catch (error) {
        console.error('Error fetching folder:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolder();
  }, [folderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!folder) {
    return <div>Folder not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{folder.name}</h2>
      <FolderForm initialValues={folder} />
      <ImageUpload folderId={folderId} />
    </div>
  );
};

export default FolderDetail;
