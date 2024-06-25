const BASE_URL = 'https://api.krishnaphotography.net/v1';

const createHashtag = async (hashtag, password, thumbnail, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/createHashtag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({hashtag, password, thumbnail }),
    });

    if (!response.ok) {
      throw new Error('Failed to create hashtag');
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export { createHashtag };
