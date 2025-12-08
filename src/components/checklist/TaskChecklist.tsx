import {playChime, playFancyChime} from "../../utils/sound";

interface Task {
  id: number;
  label: string;
}

interface TaskChecklistProps {
  tasks: Task[];
  checkedTasks: number[];
  onTaskToggle: (taskId: number) => void;
  onAllComplete: () => void;
}

export const TaskChecklist = ({
  tasks,
  checkedTasks,
  onTaskToggle,
  onAllComplete,
}: TaskChecklistProps) => {
  const handleToggle = (taskId: number) => {
    const isCurrentlyChecked = checkedTasks.includes(taskId);

    if (!isCurrentlyChecked) {
      playChime();
      const newCheckedCount = checkedTasks.length + 1;
      if (newCheckedCount === tasks.length) {
        setTimeout(() => {
          playFancyChime();
          onAllComplete();
        }, 300);
      }
    }

    onTaskToggle(taskId);
  };

  const allTasksComplete = checkedTasks.length === tasks.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 md:sticky md:top-8">
      <h3 className="font-semibold text-gray-800 mb-3">Task Checklist</h3>
      <div className="space-y-1">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={checkedTasks.includes(task.id)}
              onChange={() => handleToggle(task.id)}
              className="w-4 h-4"
            />
            <span
              className={
                checkedTasks.includes(task.id)
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }
            >
              {task.label}
            </span>
          </label>
        ))}
      </div>
      {allTasksComplete && (
        <p className="mt-3 text-green-600 font-medium text-sm">
          All tasks complete!
        </p>
      )}
    </div>
  );
};
