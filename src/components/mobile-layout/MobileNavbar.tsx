
import { Link, useLocation } from 'react-router-dom';
import { Camera, Utensils, Home, BookOpen, ChartBar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNavbar() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Camera, path: '/scan', label: 'Scan' },
    { icon: BookOpen, path: '/inventory', label: 'Inventory' },
    { icon: Utensils, path: '/recipes', label: 'Recipes' },
    { icon: ChartBar, path: '/analytics', label: 'Analytics' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs",
              location.pathname === item.path 
                ? "text-primary font-medium" 
                : "text-gray-500"
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
