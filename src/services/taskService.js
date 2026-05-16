import httpClient from './httpClient';

export const fetchTasksByDate = async (date) => {
  const { data } = await httpClient.get('/tasks', { params: { date } });
  return data;
};

export const createTask = async (payload) => {
  const { data } = await httpClient.post('/tasks', payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await httpClient.put(`/tasks/${taskId}`, payload);
  return data;
};

export const toggleTask = async (taskId) => {
  const { data } = await httpClient.patch(`/tasks/${taskId}/toggle`);
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await httpClient.delete(`/tasks/${taskId}`);
  return data;
};

export const fetchHeatmap = async (month) => {
  const { data } = await httpClient.get('/tasks/heatmap', { params: { month } });
  return data;
};

export const fetchStats = async (date) => {
  const { data } = await httpClient.get('/tasks/stats', { params: { date } });
  return data;
};
