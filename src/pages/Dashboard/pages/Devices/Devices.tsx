import { useEffect, useState } from "react";
import DeviceCard from "./components/DeviceCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DeviceForm from "./components/DeviceForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import IDevice from "@/interfaces/IDevice";

const Devices = () => {
  const [update, setUpdate] = useState<number>(0);

  const { getData } = useLocalStorage("deviceList");

  const [deviceList, setDeviceList] = useState<IDevice[]>(getData());

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDeviceList(getData());
  }, [update]);


  return (
    <div className="w-full p-8 flex flex-col items-center">
      {deviceList.map((device: IDevice, index: number) => (
        <DeviceCard device={device} key={index} />
      ))}

      <Dialog open={dialogOpen}>
        <DialogTrigger>
          <Button variant="outline" size="lg" onClick={() => setDialogOpen(true)}>
            <Plus />
            <span>Adicionar Dispositivos</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo dispositivo ?</DialogTitle>
          </DialogHeader>

          <DeviceForm setDialogOpen={setDialogOpen} setUpdate={() => setUpdate(prev => prev + 1)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Devices;
