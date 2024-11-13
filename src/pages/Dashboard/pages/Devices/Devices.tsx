
import { useState } from "react";
import DeviceCard from "./components/DeviceCard";
import { Button } from "@/components/ui/button";
import { Lamp, Microwave, Plus, Tv } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DeviceForm from "./components/DeviceForm";

const deviceListinit = [
  {
    icon: Microwave,
    name: "Microwave",
    wattsPerHour: 100,
    description: "Brief description of Device 1"
  },
  {
    icon: Tv,
    name: "Tv",
    wattsPerHour: 150,
    description: "Brief description of Device 2"
  },
  {
    icon: Lamp,
    name: "Lamp",
    wattsPerHour: 200,
    description: "Brief description of Device 3"
  }
];


const Devices = () => {

  const [deviceList, setDeviceList] = useState(deviceListinit);

  return (
    <div className="w-full p-8 flex flex-col items-center">
      {deviceList.map((device, index) => (
        <DeviceCard device={device} key={index} />
      ))}

      <Dialog>
        <DialogTrigger>
          <Button variant="outline" size="lg">
            <Plus />
            <span>Adicionar Dispositivos</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo dispositivo ?</DialogTitle>
          </DialogHeader>

          <DeviceForm />

          <DialogFooter>
            <Button>Adicionar dispositivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Devices
