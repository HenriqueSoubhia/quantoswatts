import ListCard from '@/components/ListCard'
import useMenageUser from '@/hooks/useMenageUser'
import IUser from '@/interfaces/IUser'
import { useEffect, useState } from 'react'

const Alerts = () => {
  const { getCurrentUserData } = useMenageUser()

  const [user, setUser] = useState<IUser>()

  useEffect(()=>{
    const init = async () => {
      setUser( getCurrentUserData())
    }

    init()
  },[])

  if(!user) return <div>Carregando...</div>

  return (
    <div className='w-full p-4 md:p-8 flex flex-col items-center gap-4'>
      {user.alerts &&
        user.alerts.map(alert => (
          <ListCard
            title='Nova Casa!'
            content={alert.title}
            description={alert.description}
            key={alert.id}
            icon='microwave'
            itemId={alert.id}
            type='alert'
          />
        ))}

      {!user.alerts && (
        <div className='w-full flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Nenhum alerta cadastrado
          </h1>
        </div>
      )}
    </div>
  )
}

export default Alerts
