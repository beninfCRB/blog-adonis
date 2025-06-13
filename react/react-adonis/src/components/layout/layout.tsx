import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'
import { AppSidebar } from './sidebar/app-sidebar'
import InterceptorProvider from '@/pages/interceptorProvider'

export default function Layout() {
  return (
    <InterceptorProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex items-start justify-around h-[100vh] lg:w-[930px]">
          <div className="container mx-2 my-8 p-2 bg-lime-50 flex-1 rounded-2xl">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </InterceptorProvider>
  )
}
