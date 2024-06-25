import axios from 'axios';

const baseURL = 'https://api.krishnaphotography.net/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const remove = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;
