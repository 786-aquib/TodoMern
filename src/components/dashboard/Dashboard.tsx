import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { TaskSummary } from './TaskSummary';
import { PendingTasksSummary } from './PendingTasksSummary';
import { TaskList } from '../tasks/TaskList';
import { TaskForm } from '../tasks/TaskForm';
import { calculateAverageCompletionTime, calculatePriorityStats } from '../../utils/taskStats';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedPercentage: 0,
    averageTime: 0,
    pendingTasks: 0,
    priorityStats: [],
  });

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalTasks = data.length;
      const completedTasks = data.filter(t => t.status === 'finished').length;
      const pendingTasks = data.filter(t => t.status === 'pending').length;
      
      setStats({
        totalTasks,
        completedPercentage: totalTasks ? (completedTasks / totalTasks) * 100 : 0,
        averageTime: calculateAverageCompletionTime(data),
        pendingTasks,
        priorityStats: calculatePriorityStats(data, new Date()),
      });
    };

    fetchStats();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <TaskSummary
          totalTasks={stats.totalTasks}
          completedPercentage={stats.completedPercentage}
          averageTime={stats.averageTime}
          pendingTasks={stats.pendingTasks}
        />
        <PendingTasksSummary stats={stats.priorityStats} />
      </div>
    </div>
  );
}