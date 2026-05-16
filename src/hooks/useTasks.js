import { useTaskContext } from '../store/TaskContext';

export const useTasks = () => {
  return useTaskContext();
};
