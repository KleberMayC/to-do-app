'use client'
import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import axios from 'axios';

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Carregar as tarefas do backend quando o componente for montado
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const response = await axios.post('/tasks', { title: newTask, completed: false });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    }
  };

  const toggleComplete = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        const response = await axios.patch(`/tasks/${id}`, { completed: !task.completed });
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, completed: response.data.completed } : t
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-md">
      {/* Resto do código */}
    </div>
  );
};

export default TodoApp;