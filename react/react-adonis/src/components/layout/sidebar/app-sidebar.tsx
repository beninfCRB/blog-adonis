import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { items } from './items'
import axiosDynamic from '@/utils/axios'
import { useEffect, useState } from 'react'

export function AppSidebar() {
  const [data, setData] = useState<any>({})
  const roleId = JSON.parse(String(localStorage.getItem('user'))).roleId

  const fetchRole = async (id: string) => {
    try {
      await axiosDynamic.get(`/api/admin/roles/${id}`).then((response) => {
        setData(response.data.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRole(roleId)
  }, [roleId])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => item.role.includes(data.name))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
