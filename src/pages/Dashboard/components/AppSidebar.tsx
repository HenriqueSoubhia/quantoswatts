import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import {
    ChartNoAxesColumnDecreasing,
    CircleAlert,
    FileStack,
    Home,
    Settings,
    Smartphone
} from "lucide-react"
import { Link } from "react-router-dom"


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
    {
        title: "Relatórios e Gráficos",
        url: "/dashboard/relatorios",
        icon: ChartNoAxesColumnDecreasing,
    },
    {
        title: "Configurações",
        url: "/dashboard/configuracoes",
        icon: Settings,
    },
    {
        title: "Alertas e Recomendações",
        url: "/dashboard/alertas",
        icon: CircleAlert,
    },

]
export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Quantos Watts?</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="py-6 text-md font-bold" asChild>
                                        <Link to={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
