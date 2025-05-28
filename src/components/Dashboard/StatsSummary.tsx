import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string; // Tailwind color class e.g. 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-rose-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-amber-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 0, color: 'bg-slate-700' }, // average time on this stage text implies it is on this one.
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-emerald-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-fuchsia-600' },
];

interface SourceData {
  name: string;
  value: number; // This is the $ value
  percentage: number;
  color: string; // Hex color for recharts
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F43F5E' }, // rose-500
  { name: 'Behance', value: 1000, percentage: 40, color: '#FBBF24' }, // amber-400
  { name: 'Instagram', value: 1000, percentage: 10, color: '#0D9488' }, // teal-600
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#34D399' }, // emerald-400
];

const totalActiveLeads = 600;

interface StatsSummaryProps {
  className?: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ className }) => {
  const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-6', className)}>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-prd-primary-text">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold text-prd-primary-text">{totalActiveLeads}</span>
            <span className="ml-2 text-prd-secondary-text">active leads</span>
          </div>
          <div className="h-3 w-full bg-muted rounded-full flex overflow-hidden mb-6">
            {funnelData.map(stage => (
              <div 
                key={stage.id}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
              />
            ))}
          </div>
          <div className="space-y-3">
            {funnelData.map((stage, index) => (
              <div key={stage.id} className="grid grid-cols-4 items-center text-sm">
                <div className="flex items-center col-span-2 sm:col-span-1">
                  <span className={cn('w-3 h-3 rounded-sm mr-2 shrink-0', stage.color)} />
                  <span className="text-prd-primary-text truncate">{stage.name}</span>
                </div>
                <span className="text-prd-secondary-text text-right sm:text-left">{stage.count}</span>
                <span className="text-prd-secondary-text text-right sm:text-left">$ {stage.value}</span>
                <div className="text-prd-secondary-text text-right sm:text-left relative">
                  <span>{stage.days} days</span>
                  {stage.name === 'In conversation' && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="absolute -top-6 -right-4 sm:-right-8 md:-right-12 lg:-right-24 xl:-right-32 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            average time on this stage
                          </span>
                        </TooltipTrigger>
                        {/* <TooltipContent side="top" className="bg-gray-800 text-white text-xs">
                          <p>average time on this stage</p>
                        </TooltipContent> */}
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-prd-primary-text">Sources</CardTitle>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                 <span className="text-xs text-prd-secondary-text bg-muted px-2 py-1 rounded cursor-default">from leads total</span>
              </TooltipTrigger>
             {/* <TooltipContent side="bottom" className="text-xs">
                <p>Data based on total leads</p>
              </TooltipContent> */}
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                    formatter={(value: number, name: string, props) => [`$${value}`, props.payload.name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {sourcesData.map(source => (
              <div key={source.name} className="grid grid-cols-3 items-center text-sm">
                <div className="flex items-center col-span-1">
                  <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2 shrink-0" />
                  <span className="text-prd-primary-text truncate">{source.name}</span>
                </div>
                <span className="text-prd-secondary-text text-right">$ {source.value.toLocaleString()}</span>
                <span className="text-prd-secondary-text text-right">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;
