const BASE_URL = 'https://api.krishnaphotography.net/v1';

const createFolder = async (formData, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/createFolder`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create folder');
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { createFolder };
