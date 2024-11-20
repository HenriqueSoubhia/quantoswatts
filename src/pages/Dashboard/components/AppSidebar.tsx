import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useMenageUser from "@/hooks/useMenageUser";
import {
  ChevronUp,
  CircleAlert,
  FileStack,
  Home,
  Smartphone,
  User2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import IUser from "@/interfaces/IUser";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Dispositivos",
    url: "/dashboard/dispositivos",
    icon: Smartphone,
  },
  {
    title: "Registro de Consumo",
    url: "/dashboard/registro",
    icon: FileStack,
  },
  // {
  //     title: "Relatórios e Gráficos",
  //     url: "/dashboard/relatorios",
  //     icon: ChartNoAxesColumnDecreasing,
  // },
  // {
  //     title: "Configurações",
  //     url: "/dashboard/configuracoes",
  //     icon: Settings,
  // },
  {
    title: "Alertas e Recomendações",
    url: "/dashboard/alertas",
    icon: CircleAlert,
    alert: true,
  },
];
export function AppSidebar() {
  const { logoff, getCurrentUserData } = useMenageUser();

  const [user, setUser] = useState<IUser>(getCurrentUserData());

  useEffect(() => {
    const init = async () => {
      const user = getCurrentUserData();
      setUser(user);
    };

    init();
  }, []);

  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Quantos Watts?</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-6 text-md font-bold" asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.alert && user.alerts && (
                        <Badge>{user.alerts.length}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={logoff}>
                  <span>Sair</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/configuracoes")}
                >
                  <span>Configurações</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
