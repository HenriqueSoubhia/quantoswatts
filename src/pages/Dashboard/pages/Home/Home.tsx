import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useMenageUser from '@/hooks/useMenageUser'
import IRegistration from '@/interfaces/IRegistration'
import { useEffect, useState } from 'react'
import WattExpenditureGraph from './components/WattExpenditureGraph'
import DailyWattExpenditureGraph from './components/DailyWattExpenditureGraph'
import IDevice from '@/interfaces/IDevice'
import AverageDailyExpenditureGraph from './components/AverageDailyExpenditureGraph'
import DeviceConsumptionGraph from './components/DeviceConsumptionGraph'

const DashboardHome = () => {
  const { getCurrentUserData } = useMenageUser()

  const [devices, setDevices] = useState<IDevice[]>([])
  const [registrations, setRegistrations] = useState<IRegistration[]>([])

  const [user, setUser] = useState(getCurrentUserData())

  useEffect(() => {
    const user = getCurrentUserData()
    setUser(user)
    setDevices(user.devices || [])
    setRegistrations(user.registrations || [])
  }, [])

  return (
    <div className='p-4 md:p-8  grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo, {user.name}</CardTitle>
        </CardHeader>
      </Card>

      {registrations.length > 0 && devices.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Consumo Mensal de Energia</CardTitle>
            </CardHeader>
            <CardContent>
              <WattExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consumo Diário de Energia</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyWattExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consumo medio por dia da semana</CardTitle>
            </CardHeader>
            <CardContent>
              <AverageDailyExpenditureGraph
                devices={devices}
                registrations={registrations}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Consumo medio por aparelho</CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceConsumptionGraph
                devices={devices}
                registrations={registrations}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default DashboardHome
