import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AirVent, Fan, LampCeiling, LaptopMinimal, Microwave, Plus, Refrigerator, Tv, WashingMachine } from "lucide-react"

const deviceList = [
    { value: "microwave", name: "Microondas", icon: Microwave },
    { value: "television", name: "Televisão", icon: Tv },
    { value: "refrigerator", name: "Geladeira", icon: Refrigerator },
    { value: "washing_machine", name: "Máquina de lavar", icon: WashingMachine },
    { value: "air_conditioner", name: "Ar condicionado", icon: AirVent },
    { value: "fan", name: "Ventilador", icon: Fan },
    { value: "computer", name: "Computador", icon: LaptopMinimal },
    { value: "lamp", name: "Lâmpada", icon: LampCeiling },
]

const DeviceForm = () => {



    return (
        <form className="flex flex-col gap-4">

            <Input placeholder="Nome do dispositivo" />

            <Input placeholder="Descrição do dispositivo" />

            <Input placeholder="Consumo em watts por hora" />

            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Icone" />
                </SelectTrigger>
                <SelectContent>
                    {deviceList.map((device, index) => (
                        <SelectItem className="flex flex-row" key={index} value={device.name}>
                            <div className="flex items-center gap-2">
                                <device.icon size={20} />
                                <span className="font-bold">{device.name}</span>
                            </div>

                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>



        </form>
    )
}

export default DeviceForm
