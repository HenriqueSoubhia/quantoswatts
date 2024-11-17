import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import IDevice from "@/interfaces/IDevice"
import IRegistration  from "@/interfaces/IRegistration"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
    watts: {
      label: "Watts",
      color: "#2563eb",
    },
  } satisfies ChartConfig


interface IWattExpenditureGraph {
    devices: IDevice[],
    registrations: IRegistration[]
}

const WattExpenditureGraph = ({registrations,devices}:IWattExpenditureGraph) => {

  const [monthWatts, setMonthWatts] = useState<any[]>([])

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const getMonthRegistration = () => {
    const wattsPerMonth: { month: string, watts: number }[] = []

    registrations.forEach((registration: IRegistration) => {
      const registrationDate = new Date(registration.date)
      const month = registrationDate.toLocaleDateString('default', { month: 'long' });

      if (!wattsPerMonth.find(monthPerMonth => monthPerMonth.month === month)) {
        wattsPerMonth.push({ month, watts: 0 })
      }

      const device = devices.find((device: IDevice) => device.id === registration.deviceId);
      if (device) {
        wattsPerMonth.find(wattsPerMonth => wattsPerMonth.month === month)!.watts += device.wattsPerHour * convertTimeToFloat(registration.timeUsed)
      }else{
        wattsPerMonth.find(wattsPerMonth => wattsPerMonth.month === month)!.watts += registration.deviceWattsPerHour * convertTimeToFloat(registration.timeUsed)
      }

    });

    setMonthWatts(wattsPerMonth)

  }

  
  useEffect(() => {
    getMonthRegistration()
  }, [])


  return (
    <div>
      <Label> Gasto de watts mensais</Label>
      <ChartContainer config={chartConfig} className='w-full'>
        <BarChart accessibilityLayer data={monthWatts}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='watts' fill='var(--color-watts)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default WattExpenditureGraph
