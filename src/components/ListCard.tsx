import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import DeviceForm, {
  devices
} from '@/pages/Dashboard/pages/Devices/components/DeviceForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Button } from './ui/button'
import { Ban, Edit } from 'lucide-react'
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
} from './ui/alert-dialog'

interface ListCardProps {
  type: 'device' | 'registration' | 'alert'
  title: string
  description: string
  content: string | number
  icon: string
  itemId: string
  handleDelete?: (item: any) => void
  handleEdit?: (item: any) => void
}

const ListCard = ({
  type,
  title,
  description,
  content,
  icon,
  itemId,
  handleDelete,
  handleEdit
}: ListCardProps) => {
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
        <p className='text-lg font-medium'>{content}</p>
      </CardContent>

      <CardFooter className='flex justify-end flex-1 p-4 gap-2'>
        {handleEdit && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' size='icon'>
                <Edit />
                <span className='sr-only'>Editar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar item</DialogTitle>
                <DialogDescription>
                  Aqui você pode editar um item da lista.
                </DialogDescription>
              </DialogHeader>
              {type === 'device' && (
                <DeviceForm
                  handleEdit={handleEdit}
                  device={{
                    description: description,
                    icon: icon,
                    id: itemId,
                    name: title,
                    wattsPerHour: Number(content)
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        )}

        {handleDelete && (
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
                  <span className='font-bold'> {title}</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button asChild variant='destructive'>
                  <AlertDialogAction onClick={() => handleDelete(itemId)}>
                    Continuar
                  </AlertDialogAction>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  )
}

export default ListCard
