import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'; // TabsContent not used directly for chart visibility
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { CalendarDays } from 'lucide-react';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
  leadsCame?: number;
  totalDealsSize?: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 90, closedLost: 65, leadsCame: 150, totalDealsSize: 120000 },
  { month: 'April', closedWon: 30, closedLost: 40, leadsCame: 120, totalDealsSize: 90000 },
  { month: 'May', closedWon: 70, closedLost: 60, leadsCame: 180, totalDealsSize: 150000 },
  { month: 'June', closedWon: 85, closedLost: 10, leadsCame: 100, totalDealsSize: 70000 },
  { month: 'July', closedWon: 40, closedLost: 50, leadsCame: 160, totalDealsSize: 130000 },
  { month: 'August', closedWon: 60, closedLost: 95, leadsCame: 140, totalDealsSize: 110000 },
];

type ChartView = 'leadsConverted' | 'leadsCame' | 'totalDealsSize';

interface LeadsTrackingProps {
  className?: string;
}

const LeadsTracking: React.FC<LeadsTrackingProps> = ({ className }) => {
  const [activeChartView, setActiveChartView] = React.useState<ChartView>('leadsConverted');
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string>('last-6-months');

  const totalClosed = 680;
  const totalLost = 70;

  const renderChart = () => {
    let dataKey1: keyof LeadsTrackingDataPoint | undefined = 'closedWon';
    let dataKey2: keyof LeadsTrackingDataPoint | undefined = 'closedLost';
    let color1 = '#0D9488'; // teal-600 for Closed Won
    let color2 = '#DC2626'; // red-600 for Closed Lost
    let yAxisLabel = 'Number of Leads';

    if (activeChartView === 'leadsCame') {
      dataKey1 = 'leadsCame';
      dataKey2 = undefined;
      color1 = '#2563EB'; // primary blue
      yAxisLabel = 'Leads Came';
    } else if (activeChartView === 'totalDealsSize') {
      dataKey1 = 'totalDealsSize';
      dataKey2 = undefined;
      color1 = '#10B981'; // accent green
      yAxisLabel = 'Deal Size ($)';
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} tick={{ fill: 'hsl(var(--prd-secondary-text))', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} dx={-10} tick={{ fill: 'hsl(var(--prd-secondary-text))', fontSize: 12 }} />
          <RechartsTooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }}
            labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            formatter={(value: number, name: string) => {
              const formattedName = name === 'closedWon' ? 'Closed Won' : name === 'closedLost' ? 'Closed Lost' : name === 'leadsCame' ? 'Leads Came' : 'Total Deal Size';
              return [activeChartView === 'totalDealsSize' ? `$${value.toLocaleString()}` : value, formattedName];
            }}
          />
          {dataKey1 && (
            <Area type="monotone" dataKey={dataKey1} stroke={color1} fillOpacity={0.3} fill={`url(#color${dataKey1})`} strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: color1 }} activeDot={{ r: 6, strokeWidth: 2, fill: color1 }} />
          )}
          {dataKey2 && (
            <Area type="monotone" dataKey={dataKey2} stroke={color2} fillOpacity={0.3} fill={`url(#color${dataKey2})`} strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: color2 }} activeDot={{ r: 6, strokeWidth: 2, fill: color2 }} />
          )}
          <defs>
            {dataKey1 && <linearGradient id={`color${dataKey1}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color1} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color1} stopOpacity={0.05}/>
            </linearGradient>}
            {dataKey2 && <linearGradient id={`color${dataKey2}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color2} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color2} stopOpacity={0.05}/>
            </linearGradient>}
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-prd-primary-text mb-1">Leads tracking</CardTitle>
            <div className="text-sm text-prd-secondary-text">
              <span className="text-2xl font-semibold text-prd-primary-text">{totalClosed}</span> total closed
              <span className="text-2xl font-semibold text-prd-primary-text ml-4">{totalLost}</span> total lost
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            <Tabs value={activeChartView} onValueChange={(value) => setActiveChartView(value as ChartView)} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex bg-muted p-1 rounded-md text-xs">
                <TabsTrigger value="leadsCame" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1">Leads came</TabsTrigger>
                <TabsTrigger value="leadsConverted" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1">Leads Converted</TabsTrigger>
                <TabsTrigger value="totalDealsSize" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1">Total deals size</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-full sm:w-[180px] text-prd-secondary-text text-xs">
                <CalendarDays className="mr-2 h-3.5 w-3.5 text-prd-secondary-text" />
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
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        {activeChartView === 'leadsConverted' && (
           <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-prd-secondary-text">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-sm mr-1.5 bg-teal-600"></span>
              <span>Closed won</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-sm mr-1.5 bg-red-600"></span>
              <span>Closed lost</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsTracking;
