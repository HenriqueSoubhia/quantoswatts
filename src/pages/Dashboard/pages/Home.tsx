import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useMenageStorage from '@/hooks/useMenageStorage';
import IDevice from '@/interfaces/IDevice';
import { IRegistration } from '@/interfaces/IRegistration';
import { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Label } from '@/components/ui/label';



const DashboardHome = () => {

  const { getCurrentUserData } = useMenageStorage()
  const [totalWatts, setTotalWatts] = useState(0)
  const [monthWatts, setMonthWatts] = useState<any[]>([])

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };


  const getTotalWatts = () => {
    let total = 0
    const registrations = getCurrentUserData().registrations
    const devices = getCurrentUserData().devices


    registrations.forEach((registration: IRegistration) => {
      const thisDevice = devices.find((device: any) => device.id === registration.deviceId)
      if (!thisDevice) return
      total += thisDevice.wattsPerHour * convertTimeToFloat(registration.timeUsed)
    })

    setTotalWatts(total)
  }


  const getMonthRegistration = () => {
    const wattsPerMonth: { month: string, watts: number }[] = []
    const registrations = getCurrentUserData().registrations
    const devices = getCurrentUserData().devices

    registrations.forEach((registration: IRegistration) => {
      const registrationDate = new Date(registration.date)
      const month = registrationDate.toLocaleDateString('default', { month: 'long' });


      if (!wattsPerMonth.find(monthPerMonth => monthPerMonth.month === month)) {
        wattsPerMonth.push({ month, watts: 0 })
      }

      const device = devices.find((device: IDevice) => device.id === registration.deviceId);
      if (device) {
        wattsPerMonth.find(wattsPerMonth => wattsPerMonth.month === month)!.watts += device.wattsPerHour * convertTimeToFloat(registration.timeUsed)
      }

    });

    setMonthWatts(wattsPerMonth)

  }


  const chartConfig = {
    watts: {
      label: "Watts",
      color: "#2563eb",
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
          <CardTitle>Bem vindo, {getCurrentUserData().name}!</CardTitle>
        </CardHeader>

        <CardContent >
          <div>
            <Label> Gasto de watts mensais</Label>
            <ChartContainer config={chartConfig} className="max-w-96">
              <BarChart accessibilityLayer data={monthWatts}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="watts" fill="var(--color-watts)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>

      </Card>
    </div>
  );
};

export default DashboardHome;