import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useMenageStorage from "@/hooks/useMenageStorage"
import IDevice from "@/interfaces/IDevice"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"


const Registration = () => {

  const { getDevices, getUser } = useMenageStorage();

  const [deviceList, setDeviceList] = useState<IDevice[]>([]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setDeviceList(getDevices(user.id));
    }
  }, []);

  const [timeUsed, setTimeUsed] = useState("00:15")

  return (
    <div className="w-full p-8 flex flex-col items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
          >
            <Plus />
            <span>Adicionar Registro</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Registro de Consumo</DialogTitle>
            <DialogDescription>
              Adicionar um novo Registro para monitoramento.
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="timeUsed">Por quanto tempo foi usado? (em minutos)</Label>
              <Input id="timeUsed" type="time" value={timeUsed} onChange={(e) => setTimeUsed(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="device">Dispositivo</Label>
              <Select>
                <SelectTrigger id="device">
                  <SelectValue placeholder="Selecione um dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  {deviceList.map((device: IDevice) => (
                    <SelectItem key={device.id} value={device.id}>{device.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Adicionar Registro</Button>
              </DialogClose>
            </DialogFooter>
          </form>


        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Registration
