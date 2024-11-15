import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useMenageStorage from '@/hooks/useMenageStorage';
import IDevice from '@/interfaces/IDevice';
import { IRegistration } from '@/interfaces/IRegistration';
import { useEffect, useState } from 'react';


const DashboardHome = () => {

  const { getUser } = useMenageStorage()
  const [totalWatts, setTotalWatts] = useState(0)

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };


  const getTotalWatts = () => {
    let total = 0
    const registrations = getUser().registrations
    const devices = getUser().devices


    registrations.forEach((registration: IRegistration) => {
      const thisDevice = devices.find((device: any) => device.id === registration.deviceId)
      if (!thisDevice) return
      total += thisDevice.wattsPerHour * convertTimeToFloat(registration.timeUsed)
    })

    setTotalWatts(total)
  }

  const getMonthRegistration = () => {
    const wattsPerMonth: { month: number, watts: number }[] = []
    const registrations = getUser().registrations
    const devices = getUser().devices

    registrations.forEach((registration: IRegistration) => {
      const registrationDate = new Date(registration.date)
      const month = registrationDate.getMonth() + 1


      if (!wattsPerMonth.find(monthPerMonth => monthPerMonth.month === month)) {
        wattsPerMonth.push({ month, watts: 0 })
      }

      const device = devices.find((device: IDevice) => device.id === registration.deviceId);
      if (device) {
        wattsPerMonth.find(wattsPerMonth => wattsPerMonth.month === month)!.watts += device.wattsPerHour
      }

    });

  }

  useEffect(() => {
    getTotalWatts()
    getMonthRegistration()
  }, [])



  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardTitle>Bem vindo, {getUser().name}!</CardTitle>
        </CardHeader>

        <CardContent >
          <p>Seu gasto total é: {totalWatts}Wh</p>
        </CardContent>

      </Card>
    </div>
  );
};

export default DashboardHome;