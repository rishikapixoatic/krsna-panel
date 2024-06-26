import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createFolder } from '../../services/FolderService';

const FolderForm = ({ weddingId, setFolderCreated, setFolderName, name, setName }) => {
  const { accessToken } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   console.log("Creating folder:", name);
    //   const response = await createFolder(weddingId, name, accessToken);
    //   console.log("Folder creation response:", response);
    //   if (response.success) {
    //     setSuccessMessage('Folder created successfully.');
    //     setFolderName(name);
    //     setFolderCreated(true);
    //   } else {
    //     setErrorMessage(response.error || 'Failed to create folder. Please try again.');
    //   }
    // } catch (error) {
    //   console.error("Error creating folder:", error);
    //   setErrorMessage('Failed to create folder. Please try again.');
    // }
  };

 console.log("name", !name);
  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="flex flex-col gap-y-4 items-center">
          <div>
            <label htmlFor="folder-name" className="sr-only">Folder Name</label>
            <input id="folder-name" name="folder-name" type="text" autoComplete="folder-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" placeholder="Folder Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
      </div>
      {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      <div className="flex justify-center">
        <button type="submit"  disabled={!name} className={`${!name ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'} group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white `}>
          Create Folders
        </button>
      </div>
    </form>
  );
};

export default FolderForm;
