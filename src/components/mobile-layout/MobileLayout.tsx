
import { ReactNode } from 'react';
import { MobileNavbar } from './MobileNavbar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export function MobileLayout({ 
  children, 
  title = 'SmartPantry', 
  showBackButton 
}: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auto-show back button if not on homepage
  const shouldShowBackButton = showBackButton !== undefined 
    ? showBackButton 
    : location.pathname !== '/';
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-white border-b shadow-sm flex items-center">
        {shouldShowBackButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack} 
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold text-center flex-1 text-primary">{title}</h1>
        {/* Placeholder element to balance the header */}
        {shouldShowBackButton && <div className="w-9" />}
      </header>
      
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      
      <MobileNavbar />
    </div>
  );
}
