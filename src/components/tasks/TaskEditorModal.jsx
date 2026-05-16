import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../feedback/Modal';

const TaskEditorModal = ({ isOpen, initialTask, selectedDate, onClose, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      taskDate: selectedDate,
    },
  });

  useEffect(() => {
    reset({
      title: initialTask?.title || '',
      description: initialTask?.description || '',
      taskDate: initialTask?.taskDate || selectedDate,
    });
  }, [initialTask, selectedDate, reset]);

  return (
    <Modal
      isOpen={isOpen}
      title={initialTask ? 'Edit task' : 'Add new task'}
      onClose={onClose}
      actions={
        <>
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="task-editor-form"
            disabled={isSubmitting}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </>
      }
    >
      <form id="task-editor-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Title</label>
          <input
            type="text"
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            placeholder="What do you want to finish?"
            {...register('title', { required: 'Title is required.' })}
          />
          {errors.title ? <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Description</label>
          <textarea
            rows={3}
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            placeholder="Optional details"
            {...register('description')}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted">Date</label>
          <input
            type="date"
            className="w-full rounded-xl border-adaptive input-adaptive text-sm outline-none ring-cyan-500 theme-transition focus:ring-2"
            {...register('taskDate', { required: 'Date is required.' })}
          />
          {errors.taskDate ? <p className="mt-1 text-xs text-rose-600">{errors.taskDate.message}</p> : null}
        </div>
      </form>
    </Modal>
  );
};

export default TaskEditorModal;
