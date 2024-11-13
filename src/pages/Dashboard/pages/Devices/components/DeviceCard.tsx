import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Edit, LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeviceCardProps {
    device: {
        icon: React.ComponentType<LucideProps>;
        name: string;
        description: string;
        wattsPerHour: number;
    };
}

const DeviceCard = ({ device }: DeviceCardProps) => {
    return (
        <Card className="w-full flex flex-col md:flex-row mb-4 shadow-sm">
            <CardHeader className="w-32 flex justify-center items-center">
                <device.icon size={64}/>
            </CardHeader>
            <CardContent className="flex flex-col justify-center p-0 gap-1">
                <CardTitle className="text-xl font-semibold">{device.name}</CardTitle>
                <CardDescription className="text-gray-500">{device.description}</CardDescription>
                <p className="text-lg font-medium">{device.wattsPerHour}Wh</p>
            </CardContent>
            <CardFooter className="flex justify-end flex-1 p-4">
                <Button variant="outline" size="icon">
                    <Edit />
                    <span className="sr-only">Editar</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DeviceCard;