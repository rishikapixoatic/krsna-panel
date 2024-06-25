import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createFolder } from '../services/FolderService';
import { createHashtag } from '../services/WeddingService';
import FolderForm from '../components/Folders/FolderForm';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import { FaArrowLeft, FaFolder } from 'react-icons/fa';
import Footer from '../components/Common/Footer';
import ErrorMessage from '../components/Error/ErrorMessage';

const NavigationLabels = ({ steps, currentStep, handleBack }) => {
  return (
    <div className="flex justify-start space-x-4 mb-4">
      {currentStep > 1 && (
        <button onClick={handleBack} className="text-gray-400 hover:text-indigo-600 flex items-center">
          <FaArrowLeft className="mr-2" />
        </button>
      )}
      {steps.map((step, index) => (
        <div key={index} className={`text-lg ${index === currentStep - 1 ? 'font-semibold text-indigo-600' : 'text-gray-400'}`}>{step}</div>
      ))}
    </div>
  );
};

const WeddingPage = () => {
  const { accessToken } = useAuth();
  const [thumbnail, setThumbnail] = useState(null);
  const [hashtag, setHashtag] = useState('');
  const [password, setPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStep === 1) {
        setCurrentStep(2);
        setShowBackButton(true);
        await createHashtag(hashtag, password, thumbnail, accessToken);
        setSuccessMessage('Wedding created successfully.');
      } else if (currentStep === 2) {
        console.log("Creating folder:", newFolderName);
        const response = await createFolder(newFolderName, accessToken);
        console.log("Folder creation response:", response);
        if (response.success) {
          setSuccessMessage('Folder created successfully.');
          setFolders([...folders, newFolderName]);
          setNewFolderName('');
        } else {
          setErrorMessage(response.error || 'Failed to create folder. Please try again.');
        }
    }    
    } catch (error) {
      console.error("Error creating folder:", error);
      setErrorMessage('Failed to create folder. Please try again.');
    }
  };
  

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    if (currentStep === 2) {
      setShowBackButton(false);
    }
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    setCurrentStep(3);
  };

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="min-h-screen pt-36 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <NavigationLabels steps={steps} currentStep={currentStep} handleBack={handleBack} />
                {currentStep === 1 && (
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">
                      <div className="flex flex-col gap-y-4 items-center">
                        <div>
                          <label htmlFor="thumbnail" className="sr-only">Thumbnail</label>
                          <input id="thumbnail" name="thumbnail" type="file" accept="image/*" required onChange={(e) => setThumbnail(e.target.files[0])}/>
                        </div>
                        <div>
                          <label htmlFor="hashtag" className="sr-only">Hashtag</label>
                          <input id="hashtag" name="hashtag" type="text" autoComplete="hashtag" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Hashtag" value={hashtag} onChange={(e) => setHashtag(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">Create Password</label>
                          <input id="password" name="password" type="text" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <div className="flex justify-center">
                      <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Next
                      </button>
                    </div>
                  </form>
                )}
                {currentStep === 2 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Folder Creation</h2>
                    <div className="mb-4">
                      <FolderForm setFolderName={setNewFolderName} />
                      {folders.map(folder => (
                        <div key={folder} className="flex items-center mt-2">
                          <FaFolder className="mr-2" />
                          <span>{folder}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <button className="text-gray-500 hover:text-gray-800" onClick={handleBack}>
                        Back
                      </button>
                      <button className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setCurrentStep(3)}>
                        Next
                      </button>
                    </div>
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Folder Selection</h2>
                    <div className="mb-4">
                      {folders.map(folder => (
                        <div key={folder} className="flex items-center mt-2">
                          <FaFolder className="mr-2 cursor-pointer" onClick={() => handleFolderSelect(folder)} />
                          <span className="cursor-pointer" onClick={() => handleFolderSelect(folder)}>{folder}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {currentStep === 3 && selectedFolder && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Upload Images and Videos to {selectedFolder}</h2>
                    <ImageUpload  folder={selectedFolder} />
                    <button className="mt-4 text-gray-500 hover:text-gray-800" onClick={() => setSelectedFolder('')}>
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default WeddingPage;
