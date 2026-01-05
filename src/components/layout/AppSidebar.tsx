import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MENU_ITEMS, ROLE_NAVIGATION, type MenuItemKey } from "@/config/navConfiguration"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function AppSidebar() {
  const { user } = useAuth()
  
  if (!user) return null

  let navigationGroups = []

  if (user.roles.includes('superadmin')) {
    navigationGroups = ROLE_NAVIGATION["superadmin"] || []
  } else {
    const combinedGroupsMap = new Map()
    user.roles.forEach(role => {
      const groups = ROLE_NAVIGATION[role] || []
      groups.forEach(group => {
        combinedGroupsMap.set(group.label, group)
      })
    })
    navigationGroups = Array.from(combinedGroupsMap.values())
  }

  return (
    <Sidebar>
      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((itemKey: MenuItemKey) => {
                  const item = MENU_ITEMS[itemKey]
                  return (
                    <SidebarMenuItem key={itemKey}>
                      <SidebarMenuButton asChild>
                        <a href={item.path}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
