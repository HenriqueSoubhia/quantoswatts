import useMenageUser from '@/hooks/useMenageUser'
import IDevice from '@/interfaces/IDevice'
import { IRegistration } from '@/interfaces/IRegistration'
import { useEffect, useState } from 'react'
import AddButton from './components/AddButton'
import ListCard from '@/components/ListCard'
import useMenageRegistration from '@/hooks/useMenageRegistration'

const Registration = () => {
  const { getCurrentUserData } = useMenageUser()

  const [registrations, setRegistrations] = useState<IRegistration[]>([])

  const [deviceList, setDeviceList] = useState<IDevice[]>([])

  const [update, setUpdate] = useState<number>(0)

  const { addRegistration } = useMenageRegistration()

  const updateData = () => {
    const user = getCurrentUserData()
    if (user) {
      setDeviceList(user.devices)
      setRegistrations(user.registrations)
    }
  }

  const handleSubmitRegistration = (registration: IRegistration) => {
    addRegistration(getCurrentUserData().id, registration)
    setUpdate(prev => prev + 1)
  }

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours + minutes / 60
  }

  useEffect(() => {
    updateData()
  }, [update])

  return (
    <div className='w-full p-8 flex flex-col items-center gap-4'>
      {deviceList.length === 0 && registrations.length === 0 ? (
        <div className='text-center flex flex-col gap-4'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Nenhum dispositivo cadastrado
          </h1>
          <p className='text-gray-500'>
            Va para a aba de dispositivos e adicione um novo dispositivo.
          </p>
        </div>
      ) : (
        <>
          {deviceList.length != 0 && (
            <AddButton handleAdd={handleSubmitRegistration} />
          )}

          {registrations.map((registration: IRegistration, index: number) => {
            return (
              <ListCard
                type='registration'
                key={index}
                title={registration.deviceName}
                description={new Date(registration.date).toLocaleString()}
                content={
                  registration.deviceWattsPerHour *
                  convertTimeToFloat(registration.timeUsed)
                }
                icon={registration.deviceIcon}
                itemId={registration.id}
                // handleEdit={handleEditDevice}
                // handleDelete={handleDeleteDevice}
              />
            )
          })}

          {registrations.length === 0 && (
            <div className='text-center flex flex-col gap-4'>
              <h1 className='text-2xl font-bold text-gray-800'>
                Nenhuma registro cadastrado
              </h1>
              <p className='text-gray-500'>
                Clique no botão acima para adicionar um novo registro.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Registration
