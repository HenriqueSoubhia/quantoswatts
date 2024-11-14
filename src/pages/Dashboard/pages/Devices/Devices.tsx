import { useEffect, useState } from "react";
import DeviceCard from "./components/DeviceCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeviceForm from "./components/DeviceForm";
import IDevice from "@/interfaces/IDevice";
import useMenageStorage from "@/hooks/useMenageStorage";

const Devices = () => {
  const [update, setUpdate] = useState<number>(0);

  const { getDevices, getUser } = useMenageStorage();

  const [deviceList, setDeviceList] = useState<IDevice[]>([]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setDeviceList(getDevices(user.id));
    }
  }, [update]);

  return (
    <div className="w-full p-8 flex flex-col items-center gap-4">
      {deviceList.map((device: IDevice, index: number) => (
        <DeviceCard
          editAndDelete
          setUpdate={() => setUpdate((prev) => prev + 1)}
          device={device}
          key={index}
        />
      ))}

      {deviceList.length === 0 && (
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Nenhum dispositivo cadastrado
          </h1>
          <p className="text-gray-500">
            Clique no botão abaixo para adicionar um novo dispositivo.
          </p>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
          >
            <Plus />
            <span>Adicionar Dispositivos</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo dispositivo</DialogTitle>
            <DialogDescription>
              Aqui você pode adicionar um novo dispositivo à lista.
            </DialogDescription>
          </DialogHeader>
          <DeviceForm
            setUpdate={() => setUpdate((prev) => prev + 1)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Devices;
