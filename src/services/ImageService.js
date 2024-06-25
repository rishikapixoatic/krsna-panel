import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

const s3 = new AWS.S3();

const uploadImage = async (weddingId, folderName, file) => {
  try {
    const params = {
      Bucket: 'YOUR_BUCKET_NAME',
      Key: `${weddingId}/${folderName}/${file.name}`,
      Body: file,
      ACL: 'public-read'
    };

    const response = await s3.upload(params).promise();
    return { success: true, imageUrl: response.Location };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
};

export { uploadImage };
