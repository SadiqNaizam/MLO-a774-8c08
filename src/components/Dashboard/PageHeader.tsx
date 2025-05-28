import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last-6-months');

  return (
    <div className={cn('flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 pb-4 border-b border-border', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex bg-muted p-1 rounded-md">
          <TabsTrigger 
            value="sales" 
            className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-6 py-1.5 text-sm font-medium"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="leads" 
            className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-6 py-1.5 text-sm font-medium"
          >
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4 sm:mt-0">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-full sm:w-[180px] text-prd-secondary-text">
            <CalendarDays className="mr-2 h-4 w-4 text-prd-secondary-text" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Dummy TabsContent to satisfy Tabs structure if needed, or remove if not using TabsContent here */}
      {/* <TabsContent value="sales"></TabsContent> */}
      {/* <TabsContent value="leads"></TabsContent> */}
    </div>
  );
};

export default PageHeader;
