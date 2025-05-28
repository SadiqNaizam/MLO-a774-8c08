import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // Title for the Header component
  activeSidebarItem?: string; // To control the active item in the Sidebar
  className?: string; // Optional className for the root div of the layout
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  title = "Leads Dashboard", // Default title from Project Info for the Header
  activeSidebarItem, // Let SidebarNav's default handle it if undefined
  className,
}) => {
  // Overall Layout Structure based on Layout Requirements:
  // - Sidebar: Fixed, w-64 (handled by Sidebar component using SidebarNav)
  // - Header: Fixed, h-[64px], offset left by sidebar width (handled by Header component)
  // - Main Content: Occupies remaining space, scrollable, with padding and top margin for fixed header.

  // The `bg-background` class will use `--prd-background-page` as defined in index.css and tailwind.config.ts.
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Sidebar activeItem={activeSidebarItem} />
      
      <Header title={title} />
      
      {/* Main Content Area */}
      {/* Requirements for mainContent: */}
      {/* - layout: "p-6 mt-[64px]" (mt-[64px] handled by fixed Header's height) */}
      {/* - sizing: "min-w-0 overflow-y-auto" */}
      {/* - container: "flex flex-col gap-6" (this is the direct child wrapper for content) */}
      {/* The 'ml-64' offsets content for the fixed 'w-64' Sidebar. */}
      {/* The 'mt-[64px]' offsets content for the fixed 'h-[64px]' Header. */}
      {/* 'h-[calc(100vh-64px)]' ensures the main area correctly fills the viewport height below the header, enabling 'overflow-y-auto'. */}
      <main 
        className={cn(
          'ml-64 mt-[64px] p-6 min-w-0 overflow-y-auto h-[calc(100vh-64px)]'
        )}
      >
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
