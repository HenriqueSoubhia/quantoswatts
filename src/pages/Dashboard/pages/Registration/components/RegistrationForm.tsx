import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useMenageUser from '@/hooks/useMenageUser'
import IDevice from '@/interfaces/IDevice'
import IRegistration from '@/interfaces/IRegistration'
import IUser from '@/interfaces/IUser'
import { FormEvent, useState } from 'react'
import uniqid from 'uniqid'

interface RegistrationFormProps {
  registration?: IRegistration
  handleAdd?: (registration: IRegistration) => void
  handleEdit?: (registration: IRegistration) => void
}

const RegistrationForm = ({
  registration,
  handleEdit,
  handleAdd
}: RegistrationFormProps) => {
  const { getCurrentUserData } = useMenageUser()

  const [selectedDevice, setSelectedDevice] = useState('')
  const [timeUsed, setTimeUsed] = useState('00:15')

  const [user, setUser] = useState<IUser | undefined>(undefined)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const user = getCurrentUserData()
    setUser(user)

    if (handleEdit && registration) {
      //   const newDevice = {
      //     name,
      //     description,
      //     wattsPerHour,
      //     icon,
      //     id: device.id
      //   }
      //   handleEdit(newDevice)
    } else if (handleAdd) {
      const currentDevice = user.devices.find(
        device => device.id === selectedDevice
      )!

      const newRegistration: IRegistration = {
        date: new Date().toISOString(),
        deviceWattsPerHour: currentDevice.wattsPerHour,
        timeUsed: timeUsed,
        deviceName: currentDevice.name,
        deviceIcon: currentDevice.icon,
        deviceId: selectedDevice,
        id: uniqid()
      }

      handleAdd(newRegistration)
    }
  }

  if (!user) return <div>Carregando...</div>

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <Label htmlFor='timeUsed'>Por quanto tempo foi usado? (em minutos)</Label>
      <Input
        id='timeUsed'
        type='time'
        value={timeUsed}
        onChange={e => setTimeUsed(e.target.value)}
      />

      <Label htmlFor='device'>Dispositivo</Label>
      <Select
        onValueChange={value => setSelectedDevice(value)}
        value={selectedDevice}
      >
        <SelectTrigger id='device'>
          <SelectValue placeholder='Selecione um dispositivo' />
        </SelectTrigger>
        <SelectContent>
          {user.devices.map((device: IDevice) => (
            <SelectItem key={device.id} value={device.id}>
              {device.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DialogFooter>
        <DialogClose asChild>
          <Button type='submit'>Adicionar Registro</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  )
}

export default RegistrationForm
