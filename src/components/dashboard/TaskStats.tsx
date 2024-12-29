import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  averageCompletionTime: number;
  priorityStats: {
    priority: number;
    timeElapsed: number;
    timeLeft: number;
  }[];
}

export function TaskStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const now = new Date();
      const stats: TaskStats = {
        totalTasks: data.length,
        completedTasks: data.filter(t => t.status === 'finished').length,
        pendingTasks: data.filter(t => t.status === 'pending').length,
        averageCompletionTime: calculateAverageCompletionTime(data),
        priorityStats: calculatePriorityStats(data, now),
      };

      setStats(stats);
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (loading) return <div>Loading stats...</div>;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Task Overview</h3>
        <div className="space-y-2">
          <p>Total Tasks: {stats.totalTasks}</p>
          <p>Completed: {((stats.completedTasks / stats.totalTasks) * 100).toFixed(1)}%</p>
          <p>Pending: {((stats.pendingTasks / stats.totalTasks) * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Time Statistics</h3>
        <p>Average Completion Time: {stats.averageCompletionTime.toFixed(1)} hours</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Priority Statistics</h3>
        <div className="space-y-2">
          {stats.priorityStats.map(({ priority, timeElapsed, timeLeft }) => (
            <div key={priority} className="flex justify-between">
              <span>Priority {priority}:</span>
              <span>
                Elapsed: {timeElapsed.toFixed(1)}h | 
                Remaining: {timeLeft.toFixed(1)}h
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}