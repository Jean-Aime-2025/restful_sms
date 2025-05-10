import { AdminSectionCards } from '@/components/common/admin-section-card';
import { BarChartComponent } from '@/components/common/BarChartComponent';
import { PieChartComponent } from '@/components/common/PieChartComponent';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <AdminSectionCards />
      <div className="grid grid-cols-2 gap-5 max-2xl:grid-cols-1">
        <BarChartComponent />
        <PieChartComponent />
      </div>
    </div>
  );
}
