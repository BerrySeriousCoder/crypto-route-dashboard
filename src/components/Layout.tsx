
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import Logo from './Logo';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <Sidebar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar isCollapsed={false} isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex w-full flex-col">
        <header className="glass sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    {user?.name?.[0] || user?.email?.[0] || 'U'}
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
