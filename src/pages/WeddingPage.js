import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createFolder } from '../services/FolderService';
import { createHashtag, uploadAssests } from '../services/WeddingService';
import FolderForm from '../components/Folders/FolderForm';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import { FaArrowLeft, FaFolder } from 'react-icons/fa';
import ErrorMessage from '../components/Error/ErrorMessage';

const NavigationLabels = ({ steps, currentStep, handleBack }) => {
  return (
    <div className="flex justify-start space-x-4 mb-4">
      {currentStep > 1 && (
        <button onClick={handleBack} className="text-gray-400 hover:text-gray-800 flex items-center">
          <FaArrowLeft className="mr-2" />
        </button>
      )}
      {steps.map((step, index) => (
        <div key={index} className={`text-lg ${index === currentStep - 1 ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>{step}</div>
      ))}
    </div>
  );
};

const WeddingPage = () => {
  const { accessToken } = useAuth();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailStep3, setThumbnailStep3] = useState(null);
  const [hashtag, setHashtag] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [formIsValidStep3, setFormIsValidStep3] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageOfStep3, setErrorMessageStep3] = useState('');
  const [errorMessageOfStep4, setErrorMessageStep4] = useState('');
  const [successMessageofStep4, setSuccessMessageStep4] = useState('');
  const [changeAtBack, setChangeAtBack] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [subEventFolder, setSubEventFolder] = useState();
  const [successMessageofStep3, setSuccessMessageStep3] = useState('');
  const [changeAtBackStep3, setChangeAtBackStep3] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hashTag', hashtag);
    formData.append('password', password);
    formData.append('thumbnail', thumbnail);
    try {
      if (currentStep === 1) {
        if (!changeAtBack) {
          const response = await createHashtag(formData, accessToken);
          if (response.success) {
            setSuccessMessage('Wedding created successfully.');
            setCurrentStep(2);
            setShowBackButton(true);
            setErrorMessage('');
          } else {
            setErrorMessage(response.error.message);
            setFormIsValid(false);
            setSuccessMessage('');
          }
        } else {
          setCurrentStep(2);
        }
      } else if (currentStep === 2) {
        const response = await createFolder(newFolderName, accessToken);
        if (response.success) {
          setSuccessMessage('Folder created successfully.');
          setFolders([...folders, newFolderName]);
          setNewFolderName('');
        } else {
          setErrorMessage(response.error || 'Failed to create folder. Please try again.');
        }
      }
    } catch (error) {
      setErrorMessage('Failed to create folder. Please try again.');
    }
  };

  useEffect(() => {
    validateForm();
    changeAtBack && setChangeAtBack(false);
  }, [thumbnail, hashtag, password]);

  const validateForm = () => {
    setFormIsValid(thumbnail && hashtag && password);
  };

  useEffect(() => {
    validateFormStep3();
    changeAtBackStep3 && setChangeAtBackStep3(false);
  }, [thumbnailStep3, subEventFolder]);

  const validateFormStep3 = () => {
    setFormIsValidStep3(thumbnailStep3 && subEventFolder)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setChangeAtBack(true);
    if (currentStep === 4) {
      setChangeAtBackStep3(true);
    }
    if (currentStep === 2) {
      setShowBackButton(false);
    }
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    setCurrentStep(3);
  };

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hashTag', hashtag);
    formData.append('folderName', subEventFolder);
    formData.append('thumbnail', thumbnailStep3);
    console.log("handleSubmitStep3");
    try {
      if (currentStep === 3) {
        if (!changeAtBackStep3) {
          const response = await createFolder(formData, accessToken);
          if (response.success) {
            setSuccessMessageStep3('Folder created successfully.');
            setCurrentStep(4);
            setShowBackButton(true);
            setErrorMessageStep3('');
          } else {
            setErrorMessageStep3(response.error.message);
            setFormIsValidStep3(false);
            setSuccessMessageStep3('');
          }
        }
        else {
          setCurrentStep(4);
        }
      }
    } catch (error) {
      setErrorMessageStep3('Failed to create folder. Please try again.');
    }
  }

  const handleSubmitStep4 = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hashTag', hashtag);
    formData.append('folderName', subEventFolder);
    files.forEach((file, index) => {
      formData.append(`assets`, file);
    });
    console.log("step 4");
    try {
      if (currentStep === 4) {
        if (!changeAtBackStep3) {
          const response = await uploadAssests(formData, accessToken);
          if (response.success) {
            setSuccessMessageStep4('Folder created successfully.');
            setCurrentStep(4);
            setShowBackButton(true);
            setErrorMessageStep4('');
          } else {
            setErrorMessageStep4(response.error.message);
            setFormIsValidStep3(false);
            setSuccessMessageStep4('');
          }
        }
        else {
          setCurrentStep(4);
        }
      }
    } catch (error) {
      setErrorMessageStep3('Failed to create folder. Please try again.');
    }
  }
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  return (
    <div className="flex h-full w-full bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="min-h-full pt-36 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <NavigationLabels steps={steps} currentStep={currentStep} handleBack={handleBack} />
                {currentStep === 1 && (
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">
                      <div className="flex flex-col gap-y-4 items-center">
                        {!thumbnail ? <div>
                          <label htmlFor="thumbnail" className="sr-only">Thumbnail</label>
                          <input id="thumbnail" name="thumbnail" type="file" accept="image/*" aria-describedby="validFileFormats" required onChange={(e) => setThumbnail(e.target.files[0])} />
                        </div> : (
                          <div className="flex items-center space-x-2">
                            <p>{thumbnail.name}</p>
                            <button
                              type="button"
                              className="text-sm text-gray-900 bg-[#DDE4F7] w-16 h-8"
                              onClick={() => setThumbnail(null)}
                            >
                              Change
                            </button>
                          </div>
                        )}
                        <div>
                          <label htmlFor="hashtag" className="sr-only">Hashtag</label>
                          <input id="hashtag" name="hashtag" type="text" autoComplete="hashtag" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" placeholder="Hashtag" value={hashtag} onChange={(e) => setHashtag(e.target.value)} />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">Create Password</label>
                          <input id="password" name="password" type="text" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    {errorMessage ? <ErrorMessage message={errorMessage} /> : <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
                    <div className="flex justify-center">
                      <button type="submit" disabled={!formIsValid} className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!formIsValid ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`}>
                        Next
                      </button>
                    </div>
                  </form>
                )}
                {currentStep === 2 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Folder Creation for {hashtag} Events</h2>
                    <div className="mb-4">
                      <FolderForm setFolderName={setNewFolderName} name={name} setName={setName} />
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
                      <button disabled={!name} className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!name ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`} onClick={() => setCurrentStep(3)}>
                        Next
                      </button>
                    </div>
                  </>
                )}
                {/* {currentStep === 3 && (
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
                )} */}
                {/* {currentStep === 3 && selectedFolder && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Upload Images and Videos to {selectedFolder}</h2>
                    <ImageUpload folder={selectedFolder} />
                    <button className="mt-4 text-gray-500 hover:text-gray-800" onClick={() => setSelectedFolder('')}>
                      Done
                    </button>
                  </div>
                )} */}
                {currentStep === 3 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Folder Selection</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmitStep3}>
                      <div className="rounded-md -space-y-px">
                        <div className="flex flex-col gap-y-4 items-center">
                          {!thumbnailStep3 ? <div>
                            <label htmlFor="thumbnailStep3" className="sr-only">Thumbnail</label>
                            <input id="thumbnailStep3" name="thumbnailStep3" type="file" accept="image/*" aria-describedby="validFileFormats" required onChange={(e) => setThumbnailStep3(e.target.files[0])} />
                          </div> : (
                            <div className="flex items-center space-x-2">
                              <p>{thumbnail.name}</p>
                              <button
                                type="button"
                                className="text-sm text-gray-900 bg-[#DDE4F7] w-16 h-8"
                                onClick={() => setThumbnailStep3(null)}
                              >
                                Change
                              </button>
                            </div>
                          )}
                          <div>
                            <label htmlFor="subEventFolder" className="sr-only">Sub Folder</label>
                            <input id="subEventFolder"
                              name="subEventFolder"
                              type="text" autoComplete="subEventFolder"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                              placeholder="Sub Folder Name" value={subEventFolder} onChange={(e) => setSubEventFolder(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      {errorMessageOfStep3 ? <ErrorMessage message={errorMessageOfStep3} /> : <p className="mt-2 text-sm text-green-600">{successMessageofStep3}</p>}
                      <div className="flex justify-between">
                        <button className="text-gray-500 hover:text-gray-800" onClick={handleBack}>
                          Back
                        </button>
                        <button type="submit" disabled={!formIsValidStep3} className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!formIsValidStep3 ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`}>
                          Next
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Upload Images and Videos to {selectedFolder}</h2>
                    <form className="mt-5 space-y-6" onSubmit={handleSubmitStep4}>
                      <input
                        id="files"
                        name="files"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => {
                          setFiles([...files, ...Array.from(e.target.files)]);
                        }}
                      />
                      <div className={`mt-2 max-h-24 overflow-y-scroll ${files.length > 0 && 'border-gray-300 border-2'}`}>
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <p className="text-gray-500 mr-4">{file.name}</p>
                            <button
                              type="button"
                              className="text-gray-700 hover:text-gray-500"
                              onClick={() => {
                                setFiles(files.filter((_, i) => i !== index));
                              }}
                            >
                              remove
                            </button>
                          </div>
                        ))}
                      </div>
                      {errorMessageOfStep4 ? <ErrorMessage message={errorMessageOfStep4} /> : <p className="mt-2 text-sm text-green-600">{successMessageofStep4}</p>}
                        <div className="flex justify-between">
                          <button className="text-gray-500 hover:text-gray-800" onClick={handleBack}>
                            Back
                          </button>
                          <button type="submit" disabled={files.length <= 0} className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${files.length <= 0 ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`}>
                            Done
                          </button>
                        </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeddingPage;
