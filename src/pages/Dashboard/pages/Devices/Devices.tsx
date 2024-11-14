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

  {
    /* erro do botao aqui */
  }
  return (
    <div className="w-full p-8 flex flex-col items-center gap-4">
      {deviceList.map((device: IDevice, index: number) => (
        <DeviceCard
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

      <Dialog open={dialogOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setDialogOpen(true)}
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
            setDialogOpen={setDialogOpen}
            setUpdate={() => setUpdate((prev) => prev + 1)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Devices;
