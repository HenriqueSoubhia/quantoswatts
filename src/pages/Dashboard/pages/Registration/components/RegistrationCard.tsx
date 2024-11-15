import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import IDevice from '@/interfaces/IDevice'
import { IRegistration } from '@/interfaces/IRegistration'

interface RegistrationCardProps {
  registration: IRegistration
  device: IDevice
}

const convertTimeToFloat = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours + minutes / 60
}

const RegistrationCard = ({ registration, device }: RegistrationCardProps) => {
  return (
    <Card
      key={registration.id}
      className='w-full p-4 bg-gray-100 shadow-md flex items-center rounded-lg'
    >
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>{device.name}</CardTitle>
        <CardDescription className='text-sm text-gray-600'>
          {new Date(registration.date).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-600'>
          Tempo usado: {registration.timeUsed}
        </p>
        <p className='text-sm text-gray-600'>
          Gasto de Watts:
          {convertTimeToFloat(registration.timeUsed) * device.wattsPerHour}
        </p>
      </CardContent>
    </Card>
  )
}

export default RegistrationCard
