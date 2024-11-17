import IUser from '@/interfaces/IUser'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import IHouse from '@/interfaces/IHouse'

import { FormEvent, useState } from 'react'
import uniqid from 'uniqid'
import useMenageUser from '@/hooks/useMenageUser'
import AddHouseMember from './AddHouseMember'
import CreateHouse from './CreateHouse'
import { useToast } from '@/hooks/use-toast'

interface HouseProps {
  user: IUser
  handleCreateHouse: (house: IHouse) => void
  setUpdate?: React.Dispatch<React.SetStateAction<number>>
}

const Houses = ({ user, handleCreateHouse, setUpdate }: HouseProps) => {
  const {
    getUserById,
    getUserByEmail,
    createAlert,
    addHouseMember,
    getCurrentUserData
  } = useMenageUser()

  const [houseName, setHouseName] = useState('')

  const { toast } = useToast()

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

  const handleAddHouseMember = (
    event: FormEvent,
    email: string,
    houseId: string
  ) => {
    event.preventDefault()

    const user = getUserByEmail(email)

    const currentUser = getCurrentUserData()

    if (!user) {
      toast({
        title: 'Usuario não encontrado',
        description: 'Por favor, insira um email valido',
        variant: 'destructive'
      })
      return
    }

    if (currentUser.houses?.find(house => house.members.includes(user.id))) {
      toast({
        title: 'Usuario já adicionado',
        description: 'O usuario já foi adicionado a essa casa',
        variant: 'destructive'
      })
      return
    }

    addHouseMember(houseId, user.id)

    createAlert(email, {
      id: uniqid(),
      date: new Date().toISOString(),
      description: `Você foi adicionado a casa de ${currentUser.name}`,
      title: 'Usuario Adicionado'
    })

    toast({
      title: 'Usuario Adicionado',
      description: `O usuario ${user.name} foi adicionado a casa`
    })

    if (setUpdate) setUpdate(prev => prev + 1)
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
                  <AddHouseMember
                    houseId={house.id}
                    handleAddmenber={handleAddHouseMember}
                  />
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
