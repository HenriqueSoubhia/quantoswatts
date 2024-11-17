import useMenageUser from '@/hooks/useMenageUser'
import IUser from '@/interfaces/IUser'
import { useEffect, useState } from 'react'
import Houses from './components/Houses'
import IHouse from '@/interfaces/IHouse'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

const Settings = () => {
  const { createHouse, getCurrentUserData } = useMenageUser()

  const [user, setUser] = useState<IUser>(getCurrentUserData())

  const [update, setUpdate] = useState(0)

  const { toast } = useToast()

  const handleCreateHouse = (house: IHouse) => {
    createHouse(house)
    toast({
      title: 'Casa criada',
      description: 'Sua casa foi criada com sucesso'
    })
    setUpdate(prev => prev + 1)
  }

  useEffect(() => {
    setUser(getCurrentUserData())
  }, [update])

  return (
    <div className='p-4 md:p-8 '>
      <h1>Configurações</h1>

      {user && (
        <Houses
          setUpdate={setUpdate}
          onCreateHouse={handleCreateHouse}
          user={user}
        />
      )}

      <Toaster />
    </div>
  )
}

export default Settings
