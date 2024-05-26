import React from 'react';

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
        />
        <span className={`text-gray-700 ${task.completed ? 'line-through' : ''}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;