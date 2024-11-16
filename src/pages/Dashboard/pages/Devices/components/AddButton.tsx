import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'
import DeviceForm from './DeviceForm'
import IDevice from '@/interfaces/IDevice'

interface AddButtonProps {
  handleAdd: (device: IDevice) => void
}

const AddButton = ({ handleAdd }: AddButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='fixed bottom-4 right-4' variant='default'>
          <Plus />
          <span className='hidden md:block'>Adicionar Dispositivos</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo dispositivo</DialogTitle>
          <DialogDescription>
            Aqui você pode adicionar um novo dispositivo à lista.
          </DialogDescription>
        </DialogHeader>
        <DeviceForm handleAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  )
}

export default AddButton
