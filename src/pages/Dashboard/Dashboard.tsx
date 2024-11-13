import { AppSidebar } from "@/pages/Dashboard/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />

        <Outlet />

      </main>
    </SidebarProvider>
  )
}

export default Dashboard