import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Outlet } from "react-router-dom"

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center p-4 border-b">
           <SidebarTrigger />
        </div>
        <div className="p-6">
            <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
