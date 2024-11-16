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
import { IRegistration } from '@/interfaces/IRegistration'

import RegistrationForm from './RegistrationForm'

interface AddButtonProps {

  handleAdd: (registration: IRegistration) => void
}

const AddButton = ({
  handleAdd,
}: AddButtonProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='fixed bottom-4 right-4' variant='default'>
          <Plus />
          <span className='hidden md:block'>Adicionar Registro</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Registro de Consumo</DialogTitle>
          <DialogDescription>
            Adicionar um novo Registro para monitoramento.
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm handleAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  )
}

export default AddButton
