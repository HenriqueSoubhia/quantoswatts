import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import useMenageStorage from '@/hooks/useMenageStorage';


const DashboardHome = () => {

  const { getUser } = useMenageStorage()

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle>Bem vindo, {getUser().name}!</CardTitle>
        </CardHeader>

      </Card>
    </div>
  );
};

export default DashboardHome;