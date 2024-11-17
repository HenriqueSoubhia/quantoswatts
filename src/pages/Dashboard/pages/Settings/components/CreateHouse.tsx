import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Users } from 'lucide-react'
import { FormEvent } from 'react'

interface CreateHouseProps {
  handleCreateHouse: (e: FormEvent) => void
  houseName: string
  setHouseName: (houseName: string) => void
}

const CreateHouse = ({
  handleCreateHouse,
  houseName,
  setHouseName
}: CreateHouseProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Users />
          Criar Casa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar Casa</DialogHeader>
        <DialogDescription>Escolha um nome para sua casa</DialogDescription>
        <form className='flex flex-col gap-4' onSubmit={handleCreateHouse}>
          <Input
            placeholder='Nome da Casa'
            value={houseName}
            onChange={e => setHouseName(e.target.value)}
          />

          <DialogFooter>
            <Button type='submit'>Criar Casa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateHouse
