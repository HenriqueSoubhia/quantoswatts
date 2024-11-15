import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { Ban, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeviceForm, { devices } from './DeviceForm'
import IDevice from '@/interfaces/IDevice'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useMenageStorage from '@/hooks/useMenageStorage'

interface DeviceCardProps {
  device: IDevice
  setUpdate?: () => void
  editAndDelete?: boolean
}

const DeviceCard = ({ device, setUpdate, editAndDelete }: DeviceCardProps) => {
  const Icon = devices.filter(item => item.value === device.icon)[0].icon

  const { deleteDevice, getCurrentUserData } = useMenageStorage()

  const handleDelete = () => {
    const user = getCurrentUserData()
    if (user) {
      deleteDevice(user.id, device.id)
      if (setUpdate) setUpdate()
    }
  }

  return (
    <Card className='w-full flex items-center md:flex-row shadow-sm'>
      <CardHeader className=' flex justify-center items-center'>
        <Icon className='w-12 h-12 md:w-16 md:h-16' />
      </CardHeader>
      <CardContent className='flex flex-col justify-center p-0 gap-1'>
        <CardTitle className='text-xl font-semibold'>{device.name}</CardTitle>
        <CardDescription className='text-gray-500'>
          {device.description}
        </CardDescription>
        <p className='text-lg font-medium'>{device.wattsPerHour}Wh</p>
      </CardContent>
      {editAndDelete && (
        <CardFooter className='flex justify-end flex-1 p-4 gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' size='icon'>
                <Edit />
                <span className='sr-only'>Editar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar dispositivo</DialogTitle>
                <DialogDescription>
                  Aqui você pode editar um dispositivo da lista.
                </DialogDescription>
              </DialogHeader>
              <DeviceForm
                setUpdate={() => setUpdate && setUpdate()}
                device={device}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' size='icon'>
                <Ban />
                <span className='sr-only'>Deletar</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Isso é irreversível e deletará todos os dados relacionados a
                  <span className='font-bold'> {device.name}</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button asChild variant="destructive">
                  <AlertDialogAction onClick={handleDelete}>
                    Continuar
                  </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  )
}

export default DeviceCard
