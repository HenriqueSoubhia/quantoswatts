import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useMenageStorage from '@/hooks/useMenageStorage';
import IDevice from '@/interfaces/IDevice';
import { IRegistration } from '@/interfaces/IRegistration';
import { useEffect, useState } from 'react';
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart } from 'recharts';



const DashboardHome = () => {

  const { getUser } = useMenageStorage()
  const [totalWatts, setTotalWatts] = useState(0)
  const [monthWatts, setMonthWatts] = useState<any[]>([])

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
    const wattsPerMonth: { month: string, watts: number }[] = []
    const registrations = getUser().registrations
    const devices = getUser().devices

    registrations.forEach((registration: IRegistration) => {
      const registrationDate = new Date(registration.date)
      const month = registrationDate.toLocaleDateString('default', { month: 'long' });


      if (!wattsPerMonth.find(monthPerMonth => monthPerMonth.month === month)) {
        wattsPerMonth.push({ month, watts: 0 })
      }

      const device = devices.find((device: IDevice) => device.id === registration.deviceId);
      if (device) {
        wattsPerMonth.find(wattsPerMonth => wattsPerMonth.month === month)!.watts += device.wattsPerHour
      }

    });

    setMonthWatts(wattsPerMonth)

  }


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig


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
          {/* <p>Seu gasto total é: {totalWatts}Wh</p> */}
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={monthWatts}>
              <Bar dataKey="watts" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>

      </Card>
    </div>
  );
};

export default DashboardHome;