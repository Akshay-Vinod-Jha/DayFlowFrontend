import httpClient from './httpClient';

export const registerUser = async (payload) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await httpClient.get('/auth/me');
  return data;
};
