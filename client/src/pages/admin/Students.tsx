import { DataTable } from '@/components/common/data-table';
import data from '@/data/data.json';

const Students = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <DataTable data={data} tableTitle="Students" />
    </div>
  );
};

export default Students;
