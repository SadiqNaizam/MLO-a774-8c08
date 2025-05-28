import React from 'react';
import SidebarNavOrganism from '../Dashboard/SidebarNav'; // Path to the provided organism
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  activeItem?: string; // Prop to pass to SidebarNavOrganism
}

const Sidebar: React.FC<SidebarProps> = ({ className, activeItem }) => {
  // The SidebarNavOrganism component already handles its own fixed positioning (w-64, h-screen, fixed, etc.)
  // and styling as per the provided context code and PRD requirements.
  // This Sidebar layout component primarily acts as a direct renderer for SidebarNavOrganism,
  // passing through relevant props like activeItem and className.
  return <SidebarNavOrganism className={cn(className)} activeItem={activeItem} />;
};

export default Sidebar;
