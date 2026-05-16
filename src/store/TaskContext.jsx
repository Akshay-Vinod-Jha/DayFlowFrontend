import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  createTask,
  deleteTask,
  fetchHeatmap,
  fetchStats,
  fetchTasksByDate,
  toggleTask,
  updateTask,
} from '../services/taskService';
import { formatIsoDate, getIsoMonth } from '../utils/date';
import { useAuthContext } from './AuthContext';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(formatIsoDate(new Date()));
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    completedCount: 0,
    pendingCount: 0,
    totalCount: 0,
    completionRate: 0,
    recentActivity: [],
  });
  const [heatmap, setHeatmap] = useState({ month: '', maxCount: 0, days: [] });
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const monthKey = getIsoMonth(selectedDate);

  const loadTasks = async (date = selectedDate) => {
    setIsLoadingTasks(true);
    try {
      const response = await fetchTasksByDate(date);
      setTasks(response.data.tasks);
      return response.data.tasks;
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to load tasks.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const loadStats = async (date = selectedDate) => {
    try {
      const response = await fetchStats(date);
      setStats(response.data);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to load stats.';
      toast.error(message);
      throw error;
    }
  };

  const loadHeatmap = async (month = monthKey) => {
    try {
      const response = await fetchHeatmap(month);
      setHeatmap(response.data);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || 'Unable to load heatmap.';
      toast.error(message);
      throw error;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setTasks([]);
      setStats({
        completedCount: 0,
        pendingCount: 0,
        totalCount: 0,
        completionRate: 0,
        recentActivity: [],
      });
      setHeatmap({ month: '', maxCount: 0, days: [] });
      return;
    }

    Promise.all([loadTasks(selectedDate), loadStats(selectedDate), loadHeatmap(monthKey)]).catch(() => null);
  }, [isAuthenticated, selectedDate, monthKey]);

  const refreshAll = async (date = selectedDate) => {
    await Promise.all([loadTasks(date), loadStats(date), loadHeatmap(getIsoMonth(date))]);
  };

  const addTask = async (payload) => {
    await createTask(payload);
    toast.success('Task added.');
    await refreshAll(payload.taskDate || selectedDate);
  };

  const editTask = async (taskId, payload) => {
    await updateTask(taskId, payload);
    toast.success('Task updated.');
    await refreshAll(payload.taskDate || selectedDate);
  };

  const removeTask = async (taskId) => {
    await deleteTask(taskId);
    toast.success('Task deleted.');
    await refreshAll(selectedDate);
  };

  const toggleTaskStatus = async (taskId) => {
    await toggleTask(taskId);
    await refreshAll(selectedDate);
  };

  const value = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      tasks,
      stats,
      heatmap,
      isLoadingTasks,
      loadHeatmap,
      addTask,
      editTask,
      removeTask,
      toggleTaskStatus,
    }),
    [selectedDate, tasks, stats, heatmap, isLoadingTasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used inside TaskProvider.');
  }
  return context;
};
