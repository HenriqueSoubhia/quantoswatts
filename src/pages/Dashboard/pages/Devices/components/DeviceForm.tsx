import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLocalStorage from "@/hooks/useLocalStorage";
import IDevice from "@/interfaces/IDevice";
import {
  AirVent,
  Fan,
  LampCeiling,
  LaptopMinimal,
  Microwave,
  Refrigerator,
  Tv,
  WashingMachine,
} from "lucide-react";
import { FormEvent, useState } from "react";
import uniqid from "uniqid";

export const devices = [
  { value: "microwave", name: "Microondas", icon: Microwave },
  { value: "television", name: "Televisão", icon: Tv },
  { value: "refrigerator", name: "Geladeira", icon: Refrigerator },
  { value: "washing_machine", name: "Máquina de lavar", icon: WashingMachine },
  { value: "air_conditioner", name: "Ar condicionado", icon: AirVent },
  { value: "fan", name: "Ventilador", icon: Fan },
  { value: "computer", name: "Computador", icon: LaptopMinimal },
  { value: "lamp", name: "Lâmpada", icon: LampCeiling },
];

interface DeviceFormProps {
  setUpdate: () => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  device?: IDevice;
}

const DeviceForm = ({ setUpdate, setDialogOpen, device }: DeviceFormProps) => {
  const [name, setName] = useState(device ? device.name : "");
  const [description, setDescription] = useState(
    device ? device.description : ""
  );
  const [wattsPerHour, setWattsPerHour] = useState(
    device ? device.wattsPerHour : 0
  );
  const [icon, setIcon] = useState(device ? device.icon : "");

  const { addData, updateItem } = useLocalStorage("deviceList");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (device) {
      const newDevice = {
        name,
        description,
        wattsPerHour,
        icon,
        id: device.id,
      };
      updateItem(newDevice);
    } else {
      const newDevice = {
        name,
        description,
        wattsPerHour,
        icon,
        id: uniqid(),
      };
      addData(newDevice);
    }

    setDialogOpen(false);
    setUpdate();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do dispositivo"
        value={name}
      />

      <Input
        required
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do dispositivo"
        value={description}
      />

      <Input
        required
        onChange={(e) => setWattsPerHour(Number(e.target.value))}
        type="number"
        placeholder="Consumo em watts por hora"
        value={wattsPerHour}
      />

      <Select required onValueChange={(value) => setIcon(value)} value={icon}>
        <SelectTrigger>
          <SelectValue placeholder="Icone" />
        </SelectTrigger>
        <SelectContent>
          {devices.map((device, index) => (
            <SelectItem
              className="flex flex-row"
              key={index}
              value={device.value}
            >
              <div className="flex items-center gap-2">
                <device.icon />
                <span className="font-bold">{device.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit">Editar dispositivo</Button>
    </form>
  );
};

export default DeviceForm;
