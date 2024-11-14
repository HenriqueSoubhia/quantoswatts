import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"


const Registration = () => {

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

          

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Registration
