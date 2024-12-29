import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface TaskFormData {
  title: string;
  priority: number;
  start_time: string;
  end_time: string;
}

export function TaskForm() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<TaskFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TaskFormData) => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('tasks').insert({
        ...data,
        user_id: user.id,
        status: 'pending'
      });

      if (error) throw error;
      reset();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          {...register('title', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium">
          Priority
        </label>
        <select
          id="priority"
          {...register('priority', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {[1, 2, 3, 4, 5].map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="start_time" className="block text-sm font-medium">
          Start Time
        </label>
        <input
          id="start_time"
          type="datetime-local"
          {...register('start_time', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="end_time" className="block text-sm font-medium">
          End Time
        </label>
        <input
          id="end_time"
          type="datetime-local"
          {...register('end_time', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}