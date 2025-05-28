import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsSummary from '../components/Dashboard/StatsSummary';
import LeadsTracking from '../components/Dashboard/LeadsTracking';
import ReasonsAndStatsGrid from '../components/Dashboard/ReasonsAndStatsGrid';

// This page corresponds to the "DashboardPage" in the component hierarchy.
// It assembles various dashboard-specific organisms within the AdminLayout (provided by MainAppLayout).
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout title="Leads Dashboard" activeSidebarItem="dashboard">
      {/* PageHeader: Visual separation for top section. Contains tabs 'Sales' and 'Leads'. */}
      <PageHeader />
      
      {/* StatsSummary: First section of dashboard. Contains funnel stats and sources breakdown. */}
      <StatsSummary />
      
      {/* LeadsTracking: Section with line chart visualizing closed/won leads over time. */}
      <LeadsTracking />
      
      {/* ReasonsAndStatsGrid: Grid displaying reasons for lost leads and general stats. */}
      <ReasonsAndStatsGrid />
    </MainAppLayout>
  );
};

export default DashboardPage;
