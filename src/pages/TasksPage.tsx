import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskList } from '../components/tasks/TaskList';
import { TaskModal } from '../components/tasks/TaskModal';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];

export function TasksPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleCreateTask = async (data: any) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('tasks').insert({
        ...data,
        user_id: user.id,
        status: 'pending'
      });

      if (error) throw error;
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (data: any) => {
    if (!selectedTask) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', selectedTask.id);

      if (error) throw error;
      setIsModalOpen(false);
      setSelectedTask(undefined);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => {
            setSelectedTask(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Task
        </button>
      </div>

      <TaskList
        onEdit={(task) => {
          setSelectedTask(task);
          setIsModalOpen(true);
        }}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(undefined);
        }}
        onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        task={selectedTask}
      />
    </div>
  );
}