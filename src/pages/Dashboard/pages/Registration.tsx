import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useMenageStorage from "@/hooks/useMenageStorage"
import IDevice from "@/interfaces/IDevice"
import { IRegistration } from "@/interfaces/IRegistration"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import uniqid from "uniqid"


const Registration = () => {

  const { getDevices, getUser, addRegistration, getRegistrations } = useMenageStorage();

  const [timeUsed, setTimeUsed] = useState("00:15")
  const [selected, setSelected] = useState("")

  const [registrations, setRegistrations] = useState<IRegistration[]>([]);

  const [deviceList, setDeviceList] = useState<IDevice[]>([]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setDeviceList(getDevices(user.id));
      setRegistrations(getRegistrations(user.id))
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registration = {
      timeUsed,
      date: new Date().toISOString(),
      deviceId: selected,
      id: uniqid()
    }

    addRegistration(getUser().id, registration);


  }

  const convertTimeToFloat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };




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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="timeUsed">Por quanto tempo foi usado? (em minutos)</Label>
            <Input id="timeUsed" type="time" value={timeUsed} onChange={(e) => setTimeUsed(e.target.value)} />

            <Label htmlFor="device">Dispositivo</Label>
            <Select onValueChange={(value) => setSelected(value)} value={selected}>
              <SelectTrigger id="device">
                <SelectValue placeholder="Selecione um dispositivo" />
              </SelectTrigger>
              <SelectContent>
                {deviceList.map((device: IDevice) => (
                  <SelectItem key={device.id} value={device.id}>{device.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Adicionar Registro</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {registrations.map((registration: IRegistration) => {
        const device = deviceList.find((device: IDevice) => device.id === registration.deviceId);

        const timeUsedInHours = convertTimeToFloat(registration.timeUsed);
        if (!device) return null;
        return (
          <Card key={registration.id} className="w-full p-4 bg-gray-100 shadow-md flex items-center rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{device.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">{new Date(registration.date).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Tempo usado: {registration.timeUsed}</p>
              <p className="text-sm text-gray-600">Gasto de Watts: {timeUsedInHours * device.wattsPerHour}</p>
            </CardContent>
          </Card>
        )
      })}

    </div>
  )
}

export default Registration
