import { useState } from 'react';
import { ArrowUpDown, Edit2, CheckCircle } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onComplete: (task: Task) => void;
}

export function TaskTable({ tasks, onEdit, onComplete }: TaskTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedTasks = [...tasks].sort((a, b) => {
    const comparison = a.priority - b.priority;
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={toggleSort}
                className="flex items-center space-x-1 hover:text-gray-700"
              >
                <span>Priority</span>
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTasks.map(task => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(task.start_time).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(task.end_time).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  task.status === 'finished' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  {task.status === 'pending' && (
                    <button
                      onClick={() => onComplete(task)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}