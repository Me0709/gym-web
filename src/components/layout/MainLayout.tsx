import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export function MainLayout({ children, title = "Gym App" }: { children: React.ReactNode, title?: string }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center p-4 border-b">
           <SidebarTrigger />
           <h1 className="ml-4 text-xl font-semibold">{title}</h1>
        </div>
        <div className="p-6">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
