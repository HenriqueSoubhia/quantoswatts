import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface AddHouseMemberProps {
  handleAddmenber: (event: FormEvent, email: string, houseId: string) => void
  houseId: string
}

const AddHouseMember = ({ handleAddmenber, houseId }: AddHouseMemberProps) => {
  const [email, setEmail] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Membro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Membro</DialogTitle>
          <DialogDescription>Insira o email do novo membro</DialogDescription>
        </DialogHeader>
        <form
          className='flex flex-col gap-4'
          onSubmit={e => handleAddmenber(e, email, houseId)}
        >
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email do Membro'
            type='email'
            required
          />
          <DialogFooter>
            <Button type='submit'>Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddHouseMember
