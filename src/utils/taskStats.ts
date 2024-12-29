export function calculateAverageCompletionTime(tasks: any[]) {
  const completedTasks = tasks.filter(t => t.status === 'finished' && t.actual_completion_time);
  if (completedTasks.length === 0) return 0;

  const totalHours = completedTasks.reduce((sum, task) => {
    const start = new Date(task.start_time);
    const end = new Date(task.actual_completion_time);
    return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  return totalHours / completedTasks.length;
}

export function calculatePriorityStats(tasks: any[], now: Date) {
  const priorities = [1, 2, 3, 4, 5];
  return priorities.map(priority => {
    const priorityTasks = tasks.filter(t => 
      t.status === 'pending' && t.priority === priority
    );

    const pendingCount = priorityTasks.length;

    const timeElapsed = priorityTasks.reduce((sum, task) => {
      const start = new Date(task.start_time);
      return sum + (now.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);

    const timeLeft = priorityTasks.reduce((sum, task) => {
      const end = new Date(task.end_time);
      return sum + Math.max(0, (end.getTime() - now.getTime()) / (1000 * 60 * 60));
    }, 0);

    return { priority, pendingCount, timeElapsed, timeLeft };
  });
}