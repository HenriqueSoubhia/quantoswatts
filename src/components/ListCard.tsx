import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { devices } from '@/pages/Dashboard/pages/Devices/components/DeviceForm'

interface ListCardProps {
  title: string
  description: string
  content: React.ReactNode
  icon: React.ReactNode
  handleDelete?: () => void
  handleEdit?: () => void
}

// nome / nome
// descricao / timeUsed
// wattsPerHour / watts total
// icon / icon

const ListCard = ({ title, description, content, icon }: ListCardProps) => {

  const Icon = devices.filter(item => item.value === icon)[0].icon

  return (
    <Card className='w-full flex items-center md:flex-row shadow-sm'>
      <CardHeader className=' flex justify-center items-center'>
        <Icon className='w-12 h-12 md:w-16 md:h-16' />
      </CardHeader>
      <CardContent className='flex flex-col justify-center p-0 gap-1'>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
        <CardDescription className='text-gray-500'>
          {description}
        </CardDescription>
        <p className='text-lg font-medium'>{content}Wh</p>
      </CardContent>
      {/* {editAndDelete && (
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
                <Button asChild variant='destructive'>
                  <AlertDialogAction onClick={handleDelete}>
                    Continuar
                  </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )} */}
    </Card>
  )
}

export default ListCard
