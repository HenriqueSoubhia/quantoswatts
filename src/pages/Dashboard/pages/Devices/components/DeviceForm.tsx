import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useLocalStorage from "@/hooks/useLocalStorage"
import { AirVent, Fan, LampCeiling, LaptopMinimal, Microwave, Refrigerator, Tv, WashingMachine } from "lucide-react"
import { FormEvent, useState } from "react"
import uniqid from "uniqid"

export const devices = [
    { value: "microwave", name: "Microondas", icon: Microwave },
    { value: "television", name: "Televisão", icon: Tv },
    { value: "refrigerator", name: "Geladeira", icon: Refrigerator },
    { value: "washing_machine", name: "Máquina de lavar", icon: WashingMachine },
    { value: "air_conditioner", name: "Ar condicionado", icon: AirVent },
    { value: "fan", name: "Ventilador", icon: Fan },
    { value: "computer", name: "Computador", icon: LaptopMinimal },
    { value: "lamp", name: "Lâmpada", icon: LampCeiling },
]

interface DeviceFormProps {
    setUpdate: () => void;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeviceForm = ({ setUpdate, setDialogOpen }: DeviceFormProps) => {


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [wattsPerHour, setWattsPerHour] = useState(0)
    const [icon, setIcon] = useState("")

    const { addData } = useLocalStorage("deviceList");


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const newDevice = {
            name,
            description,
            wattsPerHour,
            icon,
            id:uniqid()
        }

        addData(newDevice)
        setUpdate()
        setDialogOpen(false)
    }



    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input required onChange={(e) => setName(e.target.value)} placeholder="Nome do dispositivo" />

            <Input required onChange={(e) => setDescription(e.target.value)} placeholder="Descrição do dispositivo" />

            <Input required onChange={(e) => setWattsPerHour(Number(e.target.value))} type="number" placeholder="Consumo em watts por hora" />

            <Select required onValueChange={(value) => setIcon(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Icone" />
                </SelectTrigger>
                <SelectContent>
                    {devices.map((device, index) => (
                        <SelectItem className="flex flex-row" key={index} value={device.value}>
                            <div className="flex items-center gap-2">
                                <device.icon />
                                <span className="font-bold">{device.name}</span>
                            </div>

                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>

            <Button type="submit">Adicionar dispositivo</Button>


        </form>
    )
}

export default DeviceForm
