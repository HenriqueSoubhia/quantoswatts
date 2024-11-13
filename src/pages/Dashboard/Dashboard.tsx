import { AppSidebar } from "@/pages/Dashboard/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />

        <Outlet />

      </main>
    </SidebarProvider>
  )
}

export default Dashboard