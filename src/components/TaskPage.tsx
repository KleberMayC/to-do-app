'use client'

import React, { useState, useEffect } from 'react';
import Task from '../components/Task';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Carregar as tarefas do localStorage quando o componente for montado
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Salvar as tarefas no localStorage sempre que o estado 'tasks' for atualizado
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = { id: Date.now(), title: newTask, completed: false };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto my-8 max-w-md p-3">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border border-gray-300 rounded-l-md py-2 px-3 flex-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoApp;