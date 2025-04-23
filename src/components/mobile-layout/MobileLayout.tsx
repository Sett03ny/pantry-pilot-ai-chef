
import { ReactNode } from 'react';
import { MobileNavbar } from './MobileNavbar';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
}

export function MobileLayout({ children, title = 'SmartPantry' }: MobileLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b shadow-sm">
        <h1 className="text-xl font-semibold text-center text-primary">{title}</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      
      <MobileNavbar />
    </div>
  );
}
