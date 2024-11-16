import { Button } from '@/components/ui/button'
import IUser from '@/interfaces/IUser'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import IHouse from '@/interfaces/IHouse'
import { Users } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'
import uniqid from 'uniqid'
import useMenageUser from '@/hooks/useMenageUser'

interface HouseProps {
  user: IUser
  handleCreateHouse: (house: IHouse) => void
}

const Houses = ({ user, handleCreateHouse }: HouseProps) => {
  const { getUserById } = useMenageUser()

  const [houseName, setHouseName] = useState('')

  const handleCreateHouseSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newHouse: IHouse = {
      id: uniqid(),
      name: houseName,
      members: [user.id],
      ownerId: user.id
    }

    handleCreateHouse(newHouse)
  }

  if (!user.houses) {
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
          <form
            className='flex flex-col gap-4'
            onSubmit={handleCreateHouseSubmit}
          >
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

  return (
    <div>
      <h2>Casas</h2>
      <ul>
        {user.houses.map(house => (
          <li key={house.id}>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>{house.name}</AccordionTrigger>
                <AccordionContent>
                  <h3>Membros</h3>
                  <ul>
                    {house.members.map(member => {
                      const user = getUserById(member)
                      return <li key={member}>{user?.name}</li>
                    })}
                  </ul>
                  
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Houses
