import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard', className }) => {
  // This Header component implements the layout requirements directly.
  // Layout Requirements for Header:
  // - layout: "flex items-center justify-between px-6 bg-surface"
  // - height: "h-[64px]"
  // - position: "fixed top-0 left-64 right-0 z-10"
  // Note: 'bg-surface' is used as per TopHeader.tsx context. If not defined in Tailwind, 
  // it might need to be 'bg-prd-surface' or 'bg-card' based on tailwind.config.ts.
  // Assuming 'bg-surface' is a valid class in the project setup as seen in TopHeader.tsx.

  return (
    <header 
      className={cn(
        'flex items-center justify-between px-6 h-[64px]',
        'fixed top-0 left-64 right-0 z-10',
        'bg-surface border-b border-border',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-prd-primary-text">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-prd-accent-blue hover:bg-prd-accent-blue/90 text-primary-foreground">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>New Lead</DropdownMenuItem>
          <DropdownMenuItem>New Contact</DropdownMenuItem>
          <DropdownMenuItem>New Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
