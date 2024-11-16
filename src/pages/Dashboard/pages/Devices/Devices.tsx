import { useEffect, useState } from 'react'
import IDevice from '@/interfaces/IDevice'
import useMenageUser from '@/hooks/useMenageUser'
import AddButton from './components/AddButton'
import ListCard from '@/components/ListCard'
import useMenageDevices from '@/hooks/useMenageDevices'

const Devices = () => {
  const [update, setUpdate] = useState<number>(0)

  const { getCurrentUserData } = useMenageUser()

  const { editDevice, addDevice, deleteDevice } = useMenageDevices()

  const [deviceList, setDeviceList] = useState<IDevice[]>([])

  useEffect(() => {
    const user = getCurrentUserData()
    if (user) {
      setDeviceList(user.devices)
    }
  }, [update])

  const handleSubmitDevice = (device: IDevice) => {
    addDevice(getCurrentUserData().id, device)
    setUpdate(prev => prev + 1)
  }

  const handleEditDevice = (device: IDevice) => {
    editDevice(getCurrentUserData().id, device)
    setUpdate(prev => prev + 1)
  }
  const handleDeleteDevice = (deviceId: string) => {
    deleteDevice(getCurrentUserData().id, deviceId)
    setUpdate(prev => prev + 1)
  }

  return (
    <div className='w-full p-8 flex flex-col items-center gap-4'>
      <AddButton handleAdd={handleSubmitDevice} />

      {deviceList.map((device: IDevice, index: number) => (
        <ListCard
          type='device'
          key={index}
          title={device.name}
          description={device.description}
          content={device.wattsPerHour}
          icon={device.icon}
          itemId={device.id}
          handleEdit={handleEditDevice}
          handleDelete={handleDeleteDevice}
        />
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
