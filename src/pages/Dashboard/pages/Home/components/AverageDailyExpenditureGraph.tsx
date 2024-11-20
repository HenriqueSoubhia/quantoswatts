import { useEffect, useState } from 'react'
import {
    ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Label } from '@/components/ui/label'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import IDevice from '@/interfaces/IDevice'
import IRegistration from '@/interfaces/IRegistration'

const chartConfig = {
    watts: {
      label: "Watts",
      color: "#2563eb",
    },
} satisfies ChartConfig



interface IAverageDailyExpenditureGraph {
  devices: IDevice[]
  registrations: IRegistration[]
}

const AverageDailyExpenditureGraph = ({
  devices,
  registrations
}: IAverageDailyExpenditureGraph) => {
  const [dailyAverage, setDailyAverage] = useState<any[]>([])

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours + minutes / 60
  }

  const calculateDailyAverage = () => {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const wattsPerDay = Array(7).fill(0)
    const countPerDay = Array(7).fill(0)

    registrations.forEach(registration => {
      const date = new Date(registration.date)
      const day = date.getDay()

      const device = devices.find(d => d.id === registration.deviceId)
      const wattsPerHour = device
        ? device.wattsPerHour
        : registration.deviceWattsPerHour
      const timeUsed = convertTimeToFloat(registration.timeUsed)

      wattsPerDay[day] += wattsPerHour * timeUsed
      countPerDay[day] += 1
    })

    const averageData = daysOfWeek.map((day, index) => ({
      day,
      average:
        countPerDay[index] > 0 ? wattsPerDay[index] / countPerDay[index] : 0
    }))

    setDailyAverage(averageData)
  }

  useEffect(() => {
    calculateDailyAverage()
  }, [registrations, devices])

  return (
    <div>
      <Label>Gasto Médio Diário (Watts)</Label>
      <ChartContainer config={chartConfig} className='w-full h-full'>
        <BarChart data={dailyAverage}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='day' />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='average' fill='#2563eb' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default AverageDailyExpenditureGraph
