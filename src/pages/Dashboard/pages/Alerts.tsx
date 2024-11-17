import ListCard from '@/components/ListCard'
import useMenageUser from '@/hooks/useMenageUser'
import { useState } from 'react'

const Alerts = () => {
  const { getCurrentUserData } = useMenageUser()

  const [user, setUser] = useState(getCurrentUserData())

  return (
    <div className='w-full p-8 flex flex-col items-center gap-4'>

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
    </div>
  )
}

export default Alerts
