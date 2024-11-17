import { Button } from '@/components/ui/button'
import IUser from '@/interfaces/IUser'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import IHouse from '@/interfaces/IHouse'
import { Plus, Users } from 'lucide-react'

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
import AddHouseMember from './AddHouseMember'
import CreateHouse from './CreateHouse'

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
      <CreateHouse
        handleCreateHouse={handleCreateHouseSubmit}
        houseName={houseName}
        setHouseName={setHouseName}
      />
    )
  }

  return (
    <div>
      <h2 className='text-4xl'>Casas</h2>
      <ul>
        {user.houses.map(house => (
          <li key={house.id}>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-lg font-semibold'>
                  {house.name}
                </AccordionTrigger>
                <AccordionContent className=''>
                  <h3 className='text-lg font-semibold'>Membros</h3>
                  <ul className='list-disc pl-6'>
                    {house.members.map(member => {
                      const user = getUserById(member)
                      return (
                        <li key={member} className='text-lg'>
                          {user?.name}
                        </li>
                      )
                    })}
                  </ul>
                  <AddHouseMember />
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
