import { useState } from 'react';
import { uploadImage } from '../../services/ImageService';

const ImageUpload = ({ weddingId }) => {
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        await uploadImage(weddingId, image);
        setSuccessMessage('Image uploaded successfully.');
      } else {
        setErrorMessage('Please select an image to upload.');
      }
    } catch (error) {
      setErrorMessage('Failed to upload image. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="flex flex-col gap-y-4 items-center">
          <div>
            <label htmlFor="image" className="sr-only">Select Image</label>
            <input id="image" name="image" type="file" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" onChange={handleImageChange} />
          </div>
        </div>
      </div>
      {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      <div className="flex justify-center">
        <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload Image
        </button>
      </div>
    </form>
  );
};

export default ImageUpload;
