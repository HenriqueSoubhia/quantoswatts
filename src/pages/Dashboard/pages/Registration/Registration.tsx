import useMenageStorage from '@/hooks/useMenageStorage'
import IDevice from '@/interfaces/IDevice'
import { IRegistration } from '@/interfaces/IRegistration'
import { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import AddButton from './components/AddButton'
import RegistrationCard from './components/RegistrationCard'

const Registration = () => {
  const { getCurrentUserData, addRegistration } = useMenageStorage()

  const [timeUsed, setTimeUsed] = useState('00:15')
  const [selected, setSelected] = useState('')

  const [registrations, setRegistrations] = useState<IRegistration[]>([])

  const [deviceList, setDeviceList] = useState<IDevice[]>([])

  const [update, setUpdate] = useState<number>(0)


  const updateData = () => {
    const user = getCurrentUserData()
    if (user) {
      setDeviceList(user.devices)
      setRegistrations(user.registrations)
    }
  }

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const registration = {
      timeUsed,
      date: new Date().toISOString(),
      deviceId: selected,
      id: uniqid()
    }

    addRegistration(getCurrentUserData().id, registration)

    setUpdate(prev => prev + 1)
  }

  useEffect(() => {
    updateData()
  }, [update])

  return (
    <div className='w-full p-8 flex flex-col items-center gap-4'>
      {deviceList.length === 0 ? (
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
          <AddButton
            setSelectedDevice={setSelected}
            selectedDevice={selected}
            setTimeUsed={setTimeUsed}
            timeUsed={timeUsed}
            handleSubmit={handleAddSubmit}
            
            deviceList={deviceList}
          />

          {registrations.map((registration: IRegistration, index: number) => {
            const device = deviceList.find(
              (device: IDevice) => device.id === registration.deviceId
            )!

            return (
              <RegistrationCard
                key={index}
                device={device}
                registration={registration}
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
