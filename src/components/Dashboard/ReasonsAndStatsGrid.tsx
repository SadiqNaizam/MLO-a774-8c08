import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

const reasonsForLostLeads: ReasonStat[] = [
  { id: 'reason1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'reason2', percentage: 20, description: 'However venture pursuit' },
  { id: 'reason3', percentage: 10, description: 'Other' },
  { id: 'reason4', percentage: 30, description: 'The proposal is unclear' }, // Duplicate description as per image
];

interface GeneralStat {
  id: string;
  value: string | number;
  label: string;
  icon?: React.ElementType;
  tooltip?: string;
}

const otherDataStats: GeneralStat[] = [
  { id: 'stat1', value: 900, label: 'total leads count' },
  { id: 'stat2', value: 12, label: 'days in average to convert lead' },
  { id: 'stat3', value: 30, label: 'inactive leads', icon: Info, tooltip: 'Leads with no activity in the last 30 days' },
];

interface ReasonsAndStatsGridProps {
  className?: string;
}

const ReasonsAndStatsGrid: React.FC<ReasonsAndStatsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-prd-primary-text">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsForLostLeads.map(reason => (
            <div key={reason.id}>
              <p className="text-3xl font-semibold text-prd-primary-text">{reason.percentage}%</p>
              <p className="text-sm text-prd-secondary-text mt-1">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-prd-primary-text">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          {otherDataStats.map(stat => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id}>
                <p className="text-3xl font-semibold text-prd-primary-text">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-prd-secondary-text">{stat.label}</p>
                  {IconComponent && stat.tooltip && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <IconComponent className="h-4 w-4 ml-1.5 text-prd-secondary-text cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasonsAndStatsGrid;
