import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import IDevice from '@/interfaces/IDevice'

interface AddButtonProps {
  setTimeUsed: (time: string) => void
  timeUsed: string
  setSelectedDevice: (device: string) => void
  selectedDevice: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  deviceList: IDevice[]
}

const AddButton = ({
  setSelectedDevice,
  selectedDevice,
  setTimeUsed,
  timeUsed,
  handleSubmit,
  deviceList
}: AddButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='fixed bottom-4 right-4' variant='default' >
          <Plus />
          <span className='hidden md:block'>Adicionar Registro</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Registro de Consumo</DialogTitle>
          <DialogDescription>
            Adicionar um novo Registro para monitoramento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Label htmlFor='timeUsed'>
            Por quanto tempo foi usado? (em minutos)
          </Label>
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
              {deviceList.map((device: IDevice) => (
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
      </DialogContent>
    </Dialog>
  )
}

export default AddButton
