import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 h-16">
          <Link
            to="/dashboard"
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
              location.pathname === '/dashboard'
                ? 'border-blue-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          
          <Link
            to="/tasks"
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
              location.pathname === '/tasks'
                ? 'border-blue-500 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <ListTodo className="w-5 h-5 mr-2" />
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}