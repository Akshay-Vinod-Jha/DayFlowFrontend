import { Check, Pencil, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <article className={`rounded-2xl border border-adaptive bg-adaptive p-4 transition hover:shadow-md ${task.completed ? 'border-emerald-300' : 'border-adaptive'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className={`text-base font-semibold ${task.completed ? 'text-emerald-700 line-through' : 'text-slate-900'}`}>
            {task.title}
          </h4>
          {task.description ? <p className="mt-1 text-sm text-muted">{task.description}</p> : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              task.completed
                ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                : 'border-adaptive text-muted hover:border-emerald-300 hover:text-emerald-600'
            }`}
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-adaptive text-muted transition hover:border-cyan-300 hover:text-cyan-700 theme-transition"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-adaptive text-muted transition hover:border-rose-300 hover:text-rose-700 theme-transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskItem;
