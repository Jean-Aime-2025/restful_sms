"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { type ReactNode } from "react"

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>
}