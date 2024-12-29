import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface SummaryProps {
  totalTasks: number;
  completedPercentage: number;
  averageTime: number;
  pendingTasks: number;
}

export function TaskSummary({ totalTasks, completedPercentage, averageTime, pendingTasks }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold">{completedPercentage}%</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average Time</p>
            <p className="text-2xl font-bold">{averageTime}h</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Tasks</p>
            <p className="text-2xl font-bold">{pendingTasks}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}