import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  title?: string;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ title = 'Dashboard', className }) => {
  return (
    <header 
      className={cn(
        'flex items-center justify-between px-6 bg-surface h-[64px] fixed top-0 left-0 md:left-64 right-0 z-10 border-b',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-prd-primary-text">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-prd-accent-blue hover:bg-prd-accent-blue/90 text-white">
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

export default TopHeader;
