
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Settings, Clock, FileBarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar, isMobile = false }) => {
  return (
    <div
      className={cn(
        "relative h-full flex flex-col border-r bg-sidebar text-sidebar-foreground",
        isCollapsed && !isMobile ? "items-center" : "w-64",
        isMobile && "w-full"
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        {!isCollapsed && <Logo />}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-7 h-8 w-8 rounded-full border bg-background"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div>

      <nav className="flex-1 py-4">
        <ul className="grid gap-1 px-2">
          {[
            { to: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
            { to: "/config", icon: <Settings className="h-5 w-5" />, label: "Configuration" },
            { to: "/transactions", icon: <Clock className="h-5 w-5" />, label: "Transaction Log" },
            { to: "/analytics", icon: <FileBarChart className="h-5 w-5" />, label: "Analytics" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive ? "bg-sidebar-accent/50 text-sidebar-accent-foreground" : "transparent",
                    isCollapsed && !isMobile && "justify-center px-2"
                  )
                }
              >
                {icon}
                {(!isCollapsed || isMobile) && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto border-t border-sidebar-border py-4">
        <div className="px-4">
          <div className={cn(
            "flex items-center justify-between rounded-lg bg-sidebar-accent/50 p-2",
            isCollapsed && !isMobile && "justify-center"
          )}>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
              {(!isCollapsed || isMobile) && (
                <span className="text-xs">System Online</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
