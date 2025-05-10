import { StudentSectionCards } from '@/components/common/student-section-card';
import { Card, CardFooter } from '@/components/ui/card';
import { MoveRight } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="h-full flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
      <StudentSectionCards />

      {/* push this without using flex btn  */}

      <Card className="@container/card bg-gray-100">
        <CardFooter className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">Not virified?</div>
          <div className="line-clamp-1 flex items-center underline gap-1 font-medium cursor-pointer">
            Verify <MoveRight className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentDashboard;
