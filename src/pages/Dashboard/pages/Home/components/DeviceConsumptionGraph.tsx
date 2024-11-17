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



interface IDeviceConsumptionGraph {
  devices: IDevice[]
  registrations: IRegistration[]
}

const DeviceConsumptionGraph = ({
  devices,
  registrations
}: IDeviceConsumptionGraph) => {
  const [deviceConsumption, setDeviceConsumption] = useState<any[]>([])

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours + minutes / 60
  }

  const calculateDeviceConsumption = () => {
    const consumptionMap: { [key: string]: number } = {}

    devices.forEach(device => {
      consumptionMap[device.id] = 0
    })

    registrations.forEach(registration => {
      const device = devices.find(d => d.id === registration.deviceId)
      const wattsPerHour = device
        ? device.wattsPerHour
        : registration.deviceWattsPerHour
      const timeUsed = convertTimeToFloat(registration.timeUsed)
      const consumption = wattsPerHour * timeUsed

      if (consumptionMap[registration.deviceId] !== undefined) {
        consumptionMap[registration.deviceId] += consumption
      } else {
        consumptionMap[registration.deviceId] = consumption
      }
    })

    const data = devices.map(device => ({
      name: device.name,
      consumption: consumptionMap[device.id] || 0
    }))

    setDeviceConsumption(data)
  }

  useEffect(() => {
    calculateDeviceConsumption()
  }, [registrations, devices])

  return (
    <div>
      <Label>Consumo de Energia por Aparelho</Label>
      <ChartContainer config={chartConfig} className='w-full h-32'>
        <BarChart data={deviceConsumption}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='name' />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='consumption' fill='#2563eb' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default DeviceConsumptionGraph
