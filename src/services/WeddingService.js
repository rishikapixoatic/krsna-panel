const BASE_URL = 'https://api.krishnaphotography.net/v1';

const createHashtag = async (formData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/createHashtag`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return error
  }
};

const uploadAssests = async (formData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/uploadAssets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return error
  }
};

export { createHashtag, uploadAssests };
