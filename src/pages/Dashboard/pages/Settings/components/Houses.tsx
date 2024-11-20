import IUser from '@/interfaces/IUser'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import IHouse from '@/interfaces/IHouse'
import { FormEvent, useState } from 'react'
import uniqid from 'uniqid'
import useMenageUser from '@/hooks/useMenageUser'
import AddHouseMember from './AddHouseMember'
import CreateHouse from './CreateHouse'
import { useToast } from '@/hooks/use-toast'

interface HouseProps {
  user: IUser
  onCreateHouse: (house: IHouse) => void
  setUpdate?: React.Dispatch<React.SetStateAction<number>>
}

const Houses = ({ user, onCreateHouse, setUpdate }: HouseProps) => {
  const { getUserById, getUserByEmail, addHouseMember, getCurrentUserData, createAlert } = useMenageUser()
  const [houseName, setHouseName] = useState('')
  const { toast } = useToast()

  const handleCreateHouseSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!houseName.trim()) {
      toast({ title: 'Nome inválido', description: 'Por favor, insira um nome para a casa', variant: 'destructive' })
      return
    }
    const newHouse: IHouse = {
      id: uniqid(),
      name: houseName,
      members: [user.id],
      ownerId: user.id
    }
    onCreateHouse(newHouse)
  }

  const handleAddHouseMember = async(event: FormEvent, email: string, houseId: string) => {
    event.preventDefault()
    const user = getUserByEmail(email)
    const currentUser = getCurrentUserData()

    if (!user) {
      toast({ title: 'Usuário não encontrado', description: 'Email inválido', variant: 'destructive' })
      return
    }

    const isAlreadyMember = currentUser.houses?.some(house => house.members.includes(user.id))
    if (isAlreadyMember) {
      toast({ title: 'Membro já adicionado', description: 'Este usuário já faz parte da casa', variant: 'destructive' })
      return
    }

    addHouseMember(houseId, user.id)
    createAlert(email, {
      id: uniqid(),
      date: new Date().toISOString(),
      description: `Você foi adicionado à casa de ${currentUser.name}`,
      title: 'Novo membro'
    })
    toast({ title: 'Membro Adicionado', description: `Usuário ${user.name} foi adicionado` })
    setUpdate && setUpdate(prev => prev + 1)
  }

  return (
    <div>
      <h2 className='text-4xl mb-4'>Casas</h2>
      <CreateHouse handleCreateHouse={handleCreateHouseSubmit} houseName={houseName} setHouseName={setHouseName} />
      <ul className='mt-4'>
        {user.houses?.map(house => (
          <li key={house.id}>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-lg font-semibold'>{house.name}</AccordionTrigger>
                <AccordionContent>
                  <h3 className='text-lg font-semibold mb-2'>Membros</h3>
                  <ul className='list-disc pl-6 mb-4'>
                    {house.members.map(memberId => {
                      const member = getUserById(memberId)
                      return <li key={memberId}>{member?.name || 'Desconhecido'}</li>
                    })}
                  </ul>
                  <AddHouseMember houseId={house.id} handleAddmenber={handleAddHouseMember} />
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
