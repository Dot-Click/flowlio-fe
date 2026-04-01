import React from "react";
import FinancialOverview from "@/components/admin/reports/FinancialOverview";
import { useTranslation } from "react-i18next";

const ReportsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('appSidebar.reports')}</h2>
        <p className="text-muted-foreground">
          Detailed financial and performance metrics for your organization.
        </p>
      </div>

      <FinancialOverview />
    </div>
  );
};

export default ReportsPage;
