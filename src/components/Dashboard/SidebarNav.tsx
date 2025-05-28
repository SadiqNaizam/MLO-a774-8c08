import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, UserCircle, FileText, FileSpreadsheet, Package, Mail, Inbox, CalendarDays, HelpCircle, Settings, Menu } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  subItems?: NavItem[];
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#' },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: UserCircle, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, href: '#' },
  { id: 'items', label: 'Items', icon: Package, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Inbox, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const helpNavItems: NavItem[] = [
  { id: 'helpMain', label: 'Help', icon: HelpCircle, href: '#' }, // Changed from 'Help' to 'HelpMain' to avoid id conflict if used in same list
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'helpSub', label: 'Help', icon: HelpCircle, href: '#' }, // As per image, there's a second Help link at the bottom
];

interface SidebarNavProps {
  className?: string;
  activeItem?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className, activeItem = 'dashboard' }) => {
  const renderNavItem = (item: NavItem, index: number, isHelpItem: boolean = false) => {
    const IconComponent = item.icon;
    const isActive = item.id === activeItem;
    return (
      <a
        key={item.id}
        href={item.href}
        className={cn(
          'flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring',
          isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground',
          item.disabled && 'opacity-50 cursor-not-allowed',
          {'mt-auto': isHelpItem && index === 0 && navItems.length > 0} // Pushes first help item down if other items exist
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <IconComponent className="mr-3 h-5 w-5" />
        {item.label}
      </a>
    );
  };

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground flex flex-col p-4 space-y-1 fixed top-0 left-0 h-screen', className)}>
      <div className="flex items-center justify-between h-16 px-2 mb-4">
        <div className="flex items-center">
          <div className="bg-prd-accent-blue rounded-full p-2 w-10 h-10 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-lg">DO</span>
          </div>
          {/* The hamburger menu is typically outside the sidebar itself for mobile, part of TopHeader or AdminLayout */}
          {/* For now, let's assume this is part of a desktop layout fixed sidebar */}
        </div>
      </div>
      <nav className="flex-grow flex flex-col space-y-1">
        {navItems.map((item, index) => renderNavItem(item, index))}
        
        {/* Help Section - starts after a visual gap or pushed to bottom */} 
        <div className="mt-auto pt-4 border-t border-sidebar-border space-y-1">
          {helpNavItems.map((item, index) => renderNavItem(item, index, true))}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;
