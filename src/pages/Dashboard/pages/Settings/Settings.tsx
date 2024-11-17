import useMenageUser from '@/hooks/useMenageUser'
import IUser from '@/interfaces/IUser'
import { useEffect, useState } from 'react'
import Houses from './components/Houses'
import IHouse from '@/interfaces/IHouse'

const Settings = () => {
  const { createHouse, getCurrentUserData } = useMenageUser()

  const [user, setUser] = useState<IUser>(getCurrentUserData())

  const [update, setUpdate] = useState(0)

  const handleCreateHouse = (house: IHouse) => {
    createHouse(house)
    setUpdate(prev => prev + 1)
  }

  useEffect(() => {
    setUser(getCurrentUserData())
  }, [update])

  return (
    <div className='p-8'>
      <h1>Configurações</h1>

      {user && <Houses handleCreateHouse={handleCreateHouse} user={user} />}
    </div>
  )
}

export default Settings
