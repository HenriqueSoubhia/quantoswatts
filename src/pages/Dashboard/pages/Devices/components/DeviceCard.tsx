import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Ban, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { devices } from './DeviceForm';

interface DeviceCardProps {
    device: {
        icon: string;
        name: string;
        description: string;
        wattsPerHour: number;
    };
}


const DeviceCard = ({ device }: DeviceCardProps) => {

    const Icon = devices.filter(item => item.value === device.icon)[0].icon

    const handleDelete = () => {
        console.log('Deletar dispositivo')
    }

    const handleEdit = () => {
        console.log('Editar dispositivo')
    }

    return (
        <Card className="w-full flex items-center md:flex-row mb-4 shadow-sm">
            <CardHeader className=" flex justify-center items-center">
                <Icon className='w-12 h-12 md:w-16 md:h-16' />
            </CardHeader>
            <CardContent className="flex flex-col justify-center p-0 gap-1">
                <CardTitle className="text-xl font-semibold">{device.name}</CardTitle>
                <CardDescription className="text-gray-500">{device.description}</CardDescription>
                <p className="text-lg font-medium">{device.wattsPerHour}Wh</p>
            </CardContent>
            <CardFooter className="flex justify-end flex-1 p-4 gap-2">
                <Button onClick={handleEdit} variant="outline" size="icon">
                    <Edit />
                    <span className="sr-only">Editar</span>
                </Button>
                <Button onClick={handleDelete} variant="destructive" size="icon">
                    <Ban />
                    <span className="sr-only">Deletar</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DeviceCard;