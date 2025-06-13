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
} from '@/components/ui/sidebar'
import { items } from './items'
import axiosDynamic from '@/utils/axios'
import { useEffect, useState } from 'react'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export function AppSidebar() {
  const navigate = useNavigate()
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
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

  const handleLogout = async () => {
    setLoading(true)
    await axiosDynamic
      .post('/api/admin/logout')
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
        toast.success('Logout successful')
        setLoading(false)
      })
      .catch((error) => {
        toast.error('Logout failed')
        setLoading(false)
      })
  }

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
      <SidebarFooter>
        <Button onClick={handleLogout} className="w-full text-blue-300">
          <LogOutIcon /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
