import { Home, Settings, LogOut, Building2, Trash2, User2 } from "lucide-react"
import { type AppRole } from "@/features/auth/types/auth.types"

export const MENU_ITEMS = {
  DASHBOARD: { label: "Dashboard", path: "/dashboard", icon: Home },
  GYMS: { label: "Gimnasios", path:"/gyms", icon: Building2 },
  INACTIVE_GYMS: { label: "Gimnasios inactivos", path: "/inactive-gyms", icon: Trash2 },
  USERS: { label: "Usuarios", path: "/users", icon: User2 },
  SETTINGS: { label: "Configuración", path: "/settings", icon: Settings },
  LOGOUT: { label: "Cerrar Sesión", path: "/logout", icon: LogOut },
}

export type MenuItemKey = keyof typeof MENU_ITEMS

export interface NavGroup {
  label: string
  items: MenuItemKey[]
}

const COMMON_ITEMS: MenuItemKey[] = ["SETTINGS", "LOGOUT"]

export const ROLE_NAVIGATION: Partial<Record<AppRole, NavGroup[]>> = {
  superadmin: [
    {
      label: "Catálogos Globales",
      items: ["DASHBOARD"],
    },
    {
      label: "Gestión de gimnasios",
      items: ["GYMS", "INACTIVE_GYMS"],
    },
    {
      label: "Gestion de usuarios",
      items: ["USERS"],
    },
    {
      label: "Cuenta",
      items: COMMON_ITEMS,
    },
  ],
  admin: [
    {
      label: "General",
      items: ["DASHBOARD"],
    },
    {
      label: "Gestión de Usuarios",
      items: ["USERS"],
    },
    {
      label: "Cuenta",
      items: COMMON_ITEMS,
    },
  ],
  trainer: [
    {
      label: "Entrenador",
      items: [],
    },
    {
      label: "Cuenta",
      items: COMMON_ITEMS,
    },
  ],
  member: [
    {
      label: "Principal",
      items: [],
    },
    {
      label: "Cuenta",
      items: COMMON_ITEMS,
    },
  ],
  various: [
    {
      label: "Otros",
      items: ["DASHBOARD"],
    },
    {
      label: "Cuenta",
      items: COMMON_ITEMS,
    },
  ],
}

export const DEFAULT_DASHBOARD_PATHS: Record<AppRole, string> = {
  superadmin: "/dashboard",
  admin: "/dashboard",
  trainer: "/dashboard", 
  member: "/dashboard",  
  various: "/dashboard",
}

export const ROLE_PRIORITY: AppRole[] = [
  "superadmin",
  "admin",
  "trainer",
  "member",
  "various",
]

