import { useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, CircleDashed, Plus } from 'lucide-react';
import MonthNavigator from '../components/calendar/MonthNavigator';
import HeatmapCalendar from '../components/calendar/HeatmapCalendar';
import Modal from '../components/feedback/Modal';
import EmptyState from '../components/feedback/EmptyState';
import Loader from '../components/feedback/Loader';
import TaskEditorModal from '../components/tasks/TaskEditorModal';
import TaskList from '../components/tasks/TaskList';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { formatIsoDate, getIsoMonth, getMonthName } from '../utils/date';

const StatCard = ({ icon: Icon, label, value, tone }) => {
  return (
    <article className={`rounded-2xl border p-4 theme-transition ${tone}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-adaptive">{value}</p>
    </article>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { selectedDate, setSelectedDate, tasks, stats, heatmap, isLoadingTasks, loadHeatmap, addTask, editTask, removeTask, toggleTaskStatus } =
    useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [statusModal, setStatusModal] = useState({ isOpen: false, title: '', message: '' });

  const monthKey = useMemo(() => getIsoMonth(selectedDate), [selectedDate]);

  const handleMonthChange = async (nextMonth) => {
    await loadHeatmap(nextMonth);
    setSelectedDate(`${nextMonth}-01`);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSubmitTask = async (values) => {
    setIsSubmittingTask(true);
    try {
      if (editingTask) {
        await editTask(editingTask.id, values);
        setStatusModal({ isOpen: true, title: 'Task updated', message: 'Your task changes were saved successfully.' });
      } else {
        await addTask(values);
        setStatusModal({ isOpen: true, title: 'Task created', message: 'New task added to your daily log.' });
      }
      setIsTaskModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      setStatusModal({
        isOpen: true,
        title: 'Action failed',
        message: error?.response?.data?.message || 'Something went wrong while saving the task.',
      });
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteTask) return;

    try {
      await removeTask(confirmDeleteTask.id);
      setStatusModal({ isOpen: true, title: 'Task deleted', message: 'The task was removed from this date.' });
    } catch (error) {
      setStatusModal({
        isOpen: true,
        title: 'Delete failed',
        message: error?.response?.data?.message || 'Could not delete this task right now.',
      });
    } finally {
      setConfirmDeleteTask(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border p-6 shadow-[0_30px_70px_-50px_rgba(3,105,161,0.8)] backdrop-blur-xl panel-adaptive">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-adaptive">Hi {user?.name}, keep the momentum.</h1>
        <p className="mt-2 text-sm text-muted">Selected date: {formatIsoDate(selectedDate)}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.completedCount}
            tone="border-[var(--stat-completed-border)] bg-[var(--stat-completed-bg)] text-[var(--stat-completed-text)]"
          />
          <StatCard
            icon={CircleDashed}
            label="Pending"
            value={stats.pendingCount}
            tone="border-[var(--stat-pending-border)] bg-[var(--stat-pending-bg)] text-[var(--stat-pending-text)]"
          />
          <StatCard
            icon={CalendarClock}
            label="Completion"
            value={`${stats.completionRate}%`}
            tone="border-[var(--stat-completion-border)] bg-[var(--stat-completion-bg)] text-[var(--stat-completion-text)]"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <article className="rounded-3xl border p-5 shadow-sm backdrop-blur-xl panel-adaptive">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-adaptive">Tasks</h2>
            <button type="button" onClick={handleCreate} className="btn-primary theme-transition inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add task
            </button>
          </div>

          <div className="mt-4">
            {isLoadingTasks ? <Loader label="Loading tasks" /> : null}
            {!isLoadingTasks && tasks.length === 0 ? (
              <EmptyState title="No tasks for this day" subtitle="Create one and begin your streak." />
            ) : null}
            {!isLoadingTasks && tasks.length > 0 ? (
              <TaskList tasks={tasks} onToggle={toggleTaskStatus} onEdit={handleEdit} onDelete={setConfirmDeleteTask} />
            ) : null}
          </div>
        </article>

        <article className="rounded-3xl border p-5 shadow-sm backdrop-blur-xl panel-adaptive">
          <MonthNavigator monthKey={monthKey} onMonthChange={handleMonthChange} />
          <div className="mt-4">
            <HeatmapCalendar
              monthKey={monthKey}
              heatmap={heatmap}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
          <div className="mt-4 rounded-2xl bg-adaptive p-4 text-sm text-muted panel-adaptive">
            <p className="font-medium text-adaptive">{getMonthName(monthKey)} highlights</p>
            <p className="mt-1">Max completed tasks in a day: {heatmap.maxCount || 0}</p>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border p-5 shadow-sm backdrop-blur-xl panel-adaptive">
        <h3 className="text-lg font-semibold text-adaptive">Recent activity</h3>
        {stats.recentActivity?.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.recentActivity.map((item) => (
              <div key={item.id} className="rounded-2xl border border-adaptive bg-adaptive p-4 text-sm">
                <p className="font-medium text-adaptive">{item.title}</p>
                <p className="mt-1 text-muted">{item.taskDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-sm text-muted">No recent activity yet.</div>
        )}
      </section>

      <TaskEditorModal
        isOpen={isTaskModalOpen}
        initialTask={editingTask}
        selectedDate={selectedDate}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleSubmitTask}
        isSubmitting={isSubmittingTask}
      />

      <Modal
        isOpen={Boolean(confirmDeleteTask)}
        title="Delete task"
        onClose={() => setConfirmDeleteTask(null)}
        actions={
          <>
            <button type="button" className="btn-ghost" onClick={() => setConfirmDeleteTask(null)}>
              Cancel
            </button>
            <button type="button" className="btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </>
        }
      >
        This action will permanently remove this task from your selected day.
      </Modal>

      <Modal
        isOpen={statusModal.isOpen}
        title={statusModal.title}
        onClose={() => setStatusModal({ isOpen: false, title: '', message: '' })}
        actions={
          <button type="button" className="btn-primary" onClick={() => setStatusModal({ isOpen: false, title: '', message: '' })}>
            Okay
          </button>
        }
      >
        {statusModal.message}
      </Modal>
    </div>
  );
};

export default DashboardPage;
