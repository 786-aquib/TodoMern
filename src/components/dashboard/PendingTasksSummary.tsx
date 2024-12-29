import { Clock, Timer } from 'lucide-react';

interface PriorityStats {
  priority: number;
  pendingCount: number;
  timeElapsed: number;
  timeLeft: number;
}

export function PendingTasksSummary({ stats }: { stats: PriorityStats[] }) {
  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Tasks by Priority</h3>
        <div className="space-y-4">
          {stats.map(({ priority, pendingCount, timeElapsed, timeLeft }) => (
            <div key={priority} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Priority {priority}</span>
                  <span className="text-sm text-gray-500">
                    {pendingCount} {pendingCount === 1 ? 'task' : 'tasks'} pending
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">
                    {timeElapsed.toFixed(1)}h elapsed
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    {timeLeft.toFixed(1)}h estimated
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}