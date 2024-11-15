import { useEffect, useState } from 'react'
import DeviceCard from './components/DeviceCard'
import IDevice from '@/interfaces/IDevice'
import useMenageStorage from '@/hooks/useMenageStorage'
import AddButton from './components/AddButton'
import ListCard from '@/components/ListCard'

const Devices = () => {
  const [update, setUpdate] = useState<number>(0)

  const { getCurrentUserData } = useMenageStorage()

  const [deviceList, setDeviceList] = useState<IDevice[]>([])

  useEffect(() => {
    const user = getCurrentUserData()
    if (user) {
      setDeviceList(user.devices)
    }
  }, [update])

  return (
    <div className='w-full p-8 flex flex-col items-center gap-4'>
      <AddButton setUpdate={setUpdate} />
      
      {deviceList.map((device: IDevice, index: number) => (

        <ListCard 
          title={device.name}
          description={device.description}
          content={device.wattsPerHour}
          icon={device.icon}
        />

        // <DeviceCard
        //   editAndDelete
        //   setUpdate={() => setUpdate(prev => prev + 1)}
        //   device={device}
        //   key={index}
        // />
      ))}

      {deviceList.length === 0 && (
        <div className='text-center flex flex-col gap-4'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Nenhum dispositivo cadastrado
          </h1>
          <p className='text-gray-500'>
            Clique no botão abaixo para adicionar um novo dispositivo.
          </p>
        </div>
      )}

    </div>
  )
}

export default Devices
