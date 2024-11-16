import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMenageUser from '@/hooks/useMenageUser'
import { IRegistration } from '@/interfaces/IRegistration'
import { useEffect, useState } from 'react'
import WattExpenditureGraph from './components/WattExpenditureGraph'
import IDevice from '@/interfaces/IDevice'

const DashboardHome = () => {
  const { getCurrentUserData } = useMenageUser()

  const [devices, setDevices] = useState<IDevice[]>([])
  const [registrations, setRegistrations] = useState<IRegistration[]>([])

  useEffect(() => {
    const user = getCurrentUserData()
    setDevices(user.devices)
    setRegistrations(user.registrations)
  }, [])

  return (
    <div className='p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Bem vindo, {getCurrentUserData().name}!</CardTitle>
        </CardHeader>

        <CardContent>
          {registrations.length > 0 && (
            <WattExpenditureGraph
              devices={devices}
              registrations={registrations}
            />
          )}

          
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome
