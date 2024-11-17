import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMenageUser from '@/hooks/useMenageUser'
import IRegistration from '@/interfaces/IRegistration'
import { useEffect, useState } from 'react'
import WattExpenditureGraph from './components/WattExpenditureGraph'
import DailyWattExpenditureGraph from './components/DailyWattExpenditureGraph'
import IDevice from '@/interfaces/IDevice'
import AverageDailyExpenditureGraph from './components/AverageDailyExpenditureGraph'

const DashboardHome = () => {
  const { getCurrentUserData } = useMenageUser()

  const [devices, setDevices] = useState<IDevice[]>([])
  const [registrations, setRegistrations] = useState<IRegistration[]>([])

  useEffect(() => {
    const user = getCurrentUserData()
    console.log(user)
    setDevices(user.devices || [])
    setRegistrations(user.registrations || [])
  }, [])

  return (
    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo, {getCurrentUserData().name}!</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length > 0 && devices.length > 0 && (
            <>
              <WattExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consumo Diário de Energia</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length > 0 && devices.length > 0 && (
            <>
              <DailyWattExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consumo medio por dia da semana</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length > 0 && devices.length > 0 && (
            <>
              <AverageDailyExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome
