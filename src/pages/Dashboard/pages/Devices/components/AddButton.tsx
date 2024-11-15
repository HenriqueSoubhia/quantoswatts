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

interface AddButtonProps {
  setUpdate: React.Dispatch<React.SetStateAction<number>>
}

const AddButton = ({ setUpdate }: AddButtonProps) => {
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
        <DeviceForm setUpdate={() => setUpdate(prev => prev + 1)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddButton
