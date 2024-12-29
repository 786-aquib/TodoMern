import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { TaskTable } from './TaskTable';
import type { Database } from '../../lib/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];

export function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, [user]);

  const handleEdit = (task: Task) => {
    // Implement edit functionality
    console.log('Edit task:', task);
  };

  const handleComplete = async (task: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: 'finished',
          actual_completion_time: new Date().toISOString(),
        })
        .eq('id', task.id);

      if (error) throw error;

      // Refresh tasks
      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user!.id);

      if (fetchError) throw fetchError;
      setTasks(data);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <TaskTable
      tasks={tasks}
      onEdit={handleEdit}
      onComplete={handleComplete}
    />
  );
}